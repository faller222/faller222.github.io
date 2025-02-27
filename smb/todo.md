# SMB Project Tasks

## To-Do List
- [x] Add a `.gitignore` file for a Node.js project
- [x] Implement a login API with NodeJS
- [x] Implement a token validation API
- [x] Use Express, Axios, JWT
- [x] Create 3 tables, Users, Images & Logins: where an User can have multiples images
  - [x] Table Users has, id, email(unique), hash
  - [x] Table Logins has, id, userId, timestamp
  - [x] Table Images has, id, userId, url, isActivePost (boolean)
- [x] Use a Postgres container.
  -  docker-compose up -d
  -  Data is persisted using a named volume: smb_postgres_data
- [ ] Connect the dots
  - [ ] apiLogin must: 
    - autenticate in SMB, 
    - if OK, check if user exists
    - If NOT create one
    - both cases, add a login for that user
    - If not OK login respond 401 or whatever
    - if ok create JWT an return it
- [x] Las unicas rutas que den existir son:
 - POST host:port/login --> recibe email y password, retorna el token
 - GET host:port/api/user --> recibe el token en el header y retorna la info del user, con las imagenes y logins asciados
 - PUT host:port/api/user/image/id, que recibe la URL y ActivePost y actualiza el estado para esa Image, el user lo tiene en el header, no puede actualizar una imagen que no sea de ese user
- [ ] Quiero que las Rutas solo sean manejadoras de parametros y respuestas HTTP, una vez parseen el parametro y se sepa esta autorizaro, se llama a otro archivo.js que tenga la logica de negocio, llamemosle services. LoginService, UserService.



## Login Function Details
The login function should bypass the SMB login and:
- Generate a JWT token if authentication is successful
- Return an authentication error if unsuccessful

### Current Login Function
```javascript
async function loginSMB(email, password) {
    try {
        // Hash the password with MD5
        const hashedPassword = CryptoJS.MD5(password).toString();

        // Prepare form data for login request
        const formData = {
            vb_login_username: email,
            vb_login_password: '',
            s: '',
            securitytoken: 'guest',
            do: 'login',
            vb_login_md5password: hashedPassword,
            vb_login_md5password_utf: hashedPassword
        };

        // Send login request to SMB
        const response = await postRequest('https://www.sexomercadobcn.com/login.php?do=login', formData)

        // Extract cookies from response
        let setCookieHeader;
        for (let key in response.headers) {
            if (key.toLowerCase() === 'set-cookie') {
                setCookieHeader = cleanCookies(response.headers[key]);
                break;
            }
        }

        // Check login status
        let loginStatus = {
            success: false,
            message: ''
        };
        
        if (response.data.includes("Gracias por iniciar sesión")) {
            loginStatus.success = true;
            loginStatus.message = "Login successful";
        } else if (response.data.includes("Has ingresado un nombre de usuario o contraseña no válido")) {
            loginStatus.message = "Invalid username or password";
        }

        // Return login result
        return {
            success: loginStatus.success,
            message: loginStatus.message,
            status: response.status,
            cookies: setCookieHeader || '',
            email
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login',
            error: error.message
        };
    }
}
```

## Test Data
- Email: user@example.com 
- Password: yourpassword


## method to get URLS
la idea ahora seria tener una api: api/user/cpanel y logre obtener del cpanel la url del blog y del album
para eso tengo este metodo.
la idea seria, el usuario invoca el endpoint, sabemos que usario es, vamos a nuestra base de datos, traemos el hash, usamos el login de SMB, nos quedamos con las cookies, y luego invocamos con axios y las cookies la URL  

```
async function cPanel(cookies) {

    const response = await getRequest('https://www.sexomercadobcn.com/usercp.php', cookies)

    // Mi Álbum de Fotos
    let match = response.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Álbum de Fotos<\/a>/i);
    const album = match ? 'https://www.sexomercadobcn.com/' + match[1] : null;
    // Mi Blog
    match = response.data.match(/<a\s+href="([^"]+)"[^>]*>Mi Blog<\/a>/i);
    const blog = match ? match[1] : null;

    return { status: response.status, album, blog};
}
```

/Users/faller222/projects/smb/src/smb.js