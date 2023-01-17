# PseudoJSON - REST API

[PseudoJSON]() is a simple and basic REST API that you can use when need dummy JSON data for your FrontEnd applications. This API is easy to use and beginner-friendly. No authentication is needed to request for data. 

## Why?
If you're a developer, you know that creating a backend server to host fake json data can be a time-consuming and a brain-cell-burning task to do when your primary focus is your frontend app/project. To reserve my stress-responses and anger for the inevitable bugs I will face in the future, I decided to make REST API that can send JSON data straight away whenever I need some to test my apps. 

I hope you find PseudoJSON helpful and useful! If you don't, make a pull request or team-up with me so we can make awesome improvements! :)

Have fun!!!

## Features
- Simple and straightforward.
- GET, POST, PATCH, PUT, and DELETE methods are supported.
- Both HTTP and HTTPS are supported.
- No sign-up/registration.
- Pagination 
- Can be used with Fetch API, AJAX, AXIOS, etc. for requests.

*Keep in mind that PseudoJSON is still in its first stages. Minor errors or bugs are normal. No need to worry! The API is still useful. If you encounter any major bugs/errors, feel free to make a pull request stating the issue.*

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

