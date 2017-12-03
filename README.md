[![Build Status](https://travis-ci.org/albertaw/social-network-template.svg?branch=master)](https://travis-ci.org/albertaw/social-network-template)

The Network
-----------------------------

A Node.js template for creating a social application. 

Getting started
-----------------------------

### Installation
```bash
git clone https://github.com/albertaw/social-network-template.git
cd social-network-template
npm install
```
### Setup database
In another window start MongoDB server
```bash
mongod
```
Seed the database 
```bash
make db
```

### Launch app
```bash
make start
```
or
```bash
node app
```

### Testing
```bash
make test
```
or
```bash
mocha test
```

API
---------------------------- 

### Users

- get /users
- get /:user
- post /signup
- post /:user'
- delete /:user

### Posts

- get /api/posts
- put /api/posts
- delete /api/posts
- post /api/posts
- get /api/posts/:id
- put /api/posts/:id
- delete /api/posts/:id

