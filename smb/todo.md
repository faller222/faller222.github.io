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
- [x] Quiero que las Rutas solo sean manejadoras de parametros y respuestas HTTP, una vez parseen el parametro y se sepa esta autorizaro, se llama a otro archivo.js que tenga la logica de negocio, llamemosle services. LoginService, UserService.
- [ ] quiero que este index renderice un login, que le va a pegar al login de nuestro server y guardar la cookie de token, si la cookie de token no esta muestra el login y si la cookie de token esta, llama aget user y mostrara los datos del usuario, solo email, y 2 tablas, una con los login y otra con las imagenes 
- usar  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
- ahora quiero que retires los styles uses bootstap como te indique en el todo. si podes descargarlos y servirlos desde Static, mejor. 
la fecha de los logins se me muestra formato yankee, quiero que sea yyyy/MM/dd HH:mm:ss
y que las imagenes se muestren en una grilla de 6 imagenes para una pantalla normal

quiero que seae responsive para mobile, la grilla de imagenes podria ser de 1 foto para mobile 3 para pantallas pequeñas y 6 para pantallas grandes




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