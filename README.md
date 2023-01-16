# PseudoJSON - REST API

[PseudoJSON]() is a simple and basic REST API that provides placeholder data to help you with developing your front-end application. No authentication is needed to request for data. This project is made with Node.js, Express.js, and MongoDB. 

## Features
- Simple and straightforward.
- GET, POST, PATCH, PUT, and DELETE methods are supported.
- Both HTTP and HTTPS are supported.
- No sign-up/registration.
- Pagination 
- Can be used with Fetch API, AJAX, AXIOS, etc. for requests.

## Resources
- 100 quotes: [<insert url once deployed>]()
- 100 posts: [<insert url once deployed>]()
- 20 users: [<insert url once deployed>]()

## Usage

Request for json data:

```javascript
fetch("<insert url once deployed>")
.then(res => res.json())
.then(json => console.log(json))
```
*You can check out its [documentation]() for usage examples.*

## Tech Stack

**Client:** HTML, CSS, EJS, JS

**Server:** Node, Express

**Database:** MongoDB

**Dependencies:** CORS, dotenv, env-cmd, Mongoose, Nodemon, Highlight.js

## Installation

Clone the repository

```bash
  git clone https://github.com/jazellecruz/weather-labs-web-app.git
```

Go to the project directory

```bash
  cd PseudoJSON-rest-api
```

Install dependencies

```bash
  npm install
```

Start App

```bash
  npm start
``` 

## Contributing 
Any contribution is welcome. Just kindly make a pull request. For major changes, please open an issue first to discuss what you would like to change.

