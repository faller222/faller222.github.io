# SMB Project Tasks

## To-Do List
- [ ] Add a `.gitignore` file for a Node.js project
- [ ] Implement a login API with NodeJS
- [ ] Implement a token validation API
- [ ] Use Express, Axios, JWT

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