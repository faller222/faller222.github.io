
# Dog API Project

This project demonstrates a simple implementation of an API server using Node.js (v20.18.2). It provides endpoints to fetch random dog images from an external API. The server is implemented in **Express**, with a structured architecture, and includes testing and documentation with Swagger.

---

## Getting Started

### Requirements
- **Node.js**: v20.18.2 or higher.
- **npm**: Included with Node.js.

### Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install dependencies:
    ```bash
    npm install
    ```

### Start the Server
To start the server, use the following command:
   ```bash
      npm start
   ```
   
This will start the server on port **3000**.


---

## Project Structure
The project is structured by **domain** and **layers**, even though it has only one domain (`dog`) in this case. The main components include:

- `dogApi.js`: Acts as a repository, responsible for fetching data from the external API (https://dog.ceo).
- `dogController.js`: Manages the routes and all HTTP-related logic.
- `dogService.js`: Typically, this layer handles business logic and calculations. However, it was unnecessary here as this project is a simple "pass-through".

---
## Features
### API Endpoints
**Fetch Random Dog (JSON Response)**

**Route:** `/dog/random-dog`

Fetches a random dog image and returns it in JSON format.

**Fetch Random Dog (Stream)** _Deprecated_

**Route:** `/dog/pipe-dog`

Fetches a random dog image and pipes the response directly to the client without waiting for the entire response to arrive.

**Note:** _Node.js_ had issues closing the connection properly, both in Koa and Express. Due to time constraints, this issue was not further investigated.

---

## Swagger API Documentation
Swagger was configured with **OpenAPI** and is available at the following route:

```bash
   GET http://localhost:3000/api-docs
```
---
## Testing
The project uses **Jest**, **Supertest**, and **Nock** for testing and mocking API calls.

### Running Tests
To execute the tests, use:

```bash
   npm test
```

---

## Koa vs Express Performance Comparison
Both **Koa** and **Express** were evaluated for this project. 
While the final implementation uses **Express**, a performance test on the PIPE endpoint 
showed that **Koa** was approximately **10% faster** than Express.

- Test file for Koa: `testKoaPipe.js`

  - Run the test with:
    ```bash
    node testKoaPipe.js
    ```

  - Test the endpoint:
     ```http request
     GET http://localhost:4000/random-dog
     ```
- Test file for Express: `testExpressPipe.js`

  - Run the test with:
    ```bash
    node testExpressPipe.js
    ```
  - Test the endpoint:
     ```http request
     GET http://localhost:3500/random-dog
     ```
    
--- 

## Conclusion
This project highlights:

- A layered architecture with clear separation of concerns.
- External API integration and streaming response handling.
- API documentation using Swagger.
- Comprehensive testing with Jest, Supertest, and Nock.
- Performance insights comparing Express and Koa.
- Feel free to explore the implementation and extend it as needed!