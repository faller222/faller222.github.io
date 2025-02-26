const axios = require('axios');
const CryptoJS = require('crypto-js');

/**
 * Clean cookies from response headers
 * @param {Array|String} cookies - Cookies from response headers
 * @returns {String} - Cleaned cookies string
 */
function cleanCookies(cookies) {
    if (!cookies) return '';
    
    if (Array.isArray(cookies)) {
        return cookies.map(cookie => cookie.split(';')[0]).join('; ');
    }
    
    return cookies.split(';')[0];
}

/**
 * Make a POST request to the specified URL with form data
 * @param {String} url - URL to make the request to
 * @param {Object} formData - Form data to send
 * @returns {Promise} - Axios response
 */
async function postRequest(url, formData) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    // Convert form data to URL encoded format
    const formBody = Object.keys(formData)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');

    return axios.post(url, formBody, { headers });
}

/**
 * Login to SMB with email and password
 * @param {String} email - User email
 * @param {String} password - User password (plain text)
 * @returns {Promise} - Login result
 */
async function loginSMB(email, password) {
    try {
        const hashedPassword = CryptoJS.MD5(password).toString();
        console.log(`Attempting login for ${email} with hashed password`);

        const formData = {
            vb_login_username: email,
            vb_login_password: '',
            s: '',
            securitytoken: 'guest',
            do: 'login',
            vb_login_md5password: hashedPassword,
            vb_login_md5password_utf: hashedPassword
        };

        console.log('Sending request to SMB login endpoint');
        const response = await postRequest('https://www.sexomercadobcn.com/login.php?do=login', formData);
        console.log(`Received response with status: ${response.status}`);

        let setCookieHeader;

        for (let key in response.headers) {
            if (key.toLowerCase() === 'set-cookie') {
                setCookieHeader = cleanCookies(response.headers[key]);
                console.log('Found cookies in response:', setCookieHeader);
                break;
            }
        }


        let usuarioInvalido = undefined;
        if (response.data.includes("Has ingresado un nombre de usuario o contraseña no válido")) {
            usuarioInvalido = true;
            console.log('Invalid credentials message detected in response');
        }

        let usuarioCorrecto = undefined;
        if (response.data.includes("Gracias por iniciar sesión")) {
            usuarioCorrecto = true;
            console.log('Successful login message detected in response');
        }

        console.log('Login result flags:', { usuarioInvalido, usuarioCorrecto });

        return {
            data: response.data,
            status: response.status,
            cookies: setCookieHeader || '',
            usuarioInvalido,
            usuarioCorrecto,
            email,
            hashedPassword
        };
    } catch (error) {
        console.error('Ocurrió un error en loginSMB:', error);
        throw error;
    }
}

module.exports = {
    loginSMB,
    postRequest,
    cleanCookies
}; 