# CRUD API

A simple CRUD application with authentication

### Prerequisites

```
Node >= v10.0.0
Mongodb - 4.0.0
Mocha - Testing framework
Express - Node.js Framework
Express Validator - Validation Library
Eslint - Linting tool
```

### Installing

```
clone repo
cd && npm install
npm install mocha eslint -g
```

### Start

**Note**: Rename `.env.sample` file to `.env` and include relevant env variables

```
$ npm start
```

## Running the tests

```
$ npm test
```

### Members

- API

  - POST `/auth/register`

    ```
    {
     “email”,
     "password",
     "name"
    }
    ```

    - POST `/auth/login`

    ```
    {
        “email”,
        "password",
    }
    ```

  - PUT `/users/:id`

    ```
    {
     “email”,
     "password",
     "name"
    }
    ```

    - GET `/users`

## Author

- **Shailesh Shekhawat** - _Initial work_ - [Github](https://github.com/thatshailesh)

## License

This project is licensed under the MIT License
