<h1 align="center">
Hyatk Applicationπ±π
</h1>

<p align="center">

![localhost_4200_(Nest Hub Max) (1)](https://user-images.githubusercontent.com/78083890/222914742-2893b630-b233-4478-844f-0194ef8d5aea.png)

</p>


### RESTful API Node Express Mongoose Application about Charity organization called Hyatk π©βπ» β­

The project builds RESTful APIs using Node.js, Express and Mongoose,... π₯β­  

### Manual Installation π₯π  :

Clone the repo π«Ά π«‘ :

```bash
git clone https://github.com/libeyondea/backend-node-express.git
cd backend-node-express
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

<!--
Generate JWT RS256 key:

```bash
ssh-keygen -t rsa -P "" -b 2048 -m PEM -f storage/jwtRS256.key
ssh-keygen -e -m PEM -f storage/jwtRS256.key > storage/jwtRS256.key.pub
# encode base64
cat storage/jwtRS256.key | base64 # edit JWT_ACCESS_TOKEN_SECRET_PRIVATE in .env
cat storage/jwtRS256.key.pub | base64 # edit JWT_ACCESS_TOKEN_SECRET_PUBLIC in .env
```
-->

## Table of Contents
<div align="center">

|        Commands π      |          Environment variables π             |     Project Structure π§±               |  api endponts  π             |           
|-----------------------|------------------------------------------------|----------------------------------------|--------------------------------|
| [Commands](#commands) | [Environment Variables](#environment-variables)| [Project Structure](#project-structure)| [API Endpoints](#api-endpoints)|                         |-----------------------|------------------------------------------------|----------------------------------------|--------------------------------| 
      
</div>

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

Running in production:

```bash
# start
npm run prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
#Environment 
NODE_ENV=development
NODE_ENV=production

# Port
PORT = 3000

# Host
BASE_URL = localhost:3000

# Mongo DB
db_user = your user name of atlas db 
db_password = your password
db_name = your db name
db_url= mongodb+srv://db_user:db_password@cluster0.qjpxegw.mongodb.net/db_name?retryWrites=true&w=majority
local_db_url = mongodb://127.0.0.1:27017/db_name

# JWT
JWT_SECRET = 

# Token expires
JWT_EXPIRE =
JWT_COOKIE_EXPIRE =

# SMTP configuration
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 465
EMAIL_USER = 
EMAIL_PASSWORD = 
```

## Project Structure

 ```
βββ E-COMMERCE-CHARITY
β   βββ server.js
β   βββ package.json
β   βββ package-lock.json
|   βββ config.env
β   βββ config
β   β   βββ database.js
β   βββ models
β   β   βββ userModel.js
β   β   βββ productModel.js
β   β   βββ categoryModel.js
β   β   βββ brandModel.js
β   β   βββ cartModel.js
β   β   βββ orderModel.js
β   βββ middlewares
β   β   βββ auth.js
β   β   βββ error.js
β   β   βββ uploadImage.js
β   β   βββ validator.js
β   βββ utils
β   β   βββ validators
β   β   β   βββ userValidator.js
β   β   β   βββ authValidator.js
β   β   β   βββ productValidator.js
β   β   β   βββ categoryValidator.js
β   β   β   βββ brandValidator.js
β   βΒ Β  βββ ApiError.js
β   βΒ Β  βββ apiFeatures.js
β   βΒ Β  βββ sendEmail.js
β   βββ controllers
β   β   βββ handleFactory.js
β   β   βββ userController.js
β   β   βββ auth.js
β   β   βββ productService.js
β   β   βββ categoryService.js
β   β   βββ brandService.js
β   β   βββ cartService.js
β   β   βββ orderService.js
β   βββ routes
β   β   βββ auth.js
β   β   βββ userRoute.js
β   β   βββ productRoute.js
β   β   βββ categoryRoute.js
β   β   βββ brandRoute.js
β   β   βββ cartRoute.js
β   β   βββ orderRoute.js
β   βββ uploads
β   β   βββ brands
β   β   βββ users
β   β   βββ categories
β   β   βββ products
βββ  .gitignore
 ```
 

### API Endpoints:

- [User_Api](https://documenter.getpostman.com/view/25405822/2s93JnUS7q) 
- [Authentication_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7j)
- [Product_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7o)
- [Brand_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7n)
- [Category_API](https://documenter.getpostman.com/view/25405822/2s93JnUSC7)
- [Cart_API](https://documenter.getpostman.com/view/25449871/2s93JnUSC8)
- [Order_API](https://documenter.getpostman.com/view/25450774/2s93JnUSC9)


List of available routes:

**Auth routes**:\
`POST auth/register` - Signup\
`POST auth/login` - Signin\
`POST auth/forgot-password` - Send reset password email\
`POST auth/reset-password` - Reset password

**User routes**:\
`POST /users` - Create a user\
`GET /users` - Get all users\
`GET /users/:id` - Get user\
`PUT /users/:id` - Update user\
`DELETE /users/:id` - Delete user

**Product routes**:\
`POST /products` - Create a product\
`GET /products` - Get all products\
`GET /products/:id` - Get product\
`PUT /products/:id` - Update product\
`DELETE /products/:id` - Delete product

**Category routes**:\
`POST /category` - Create a category\
`GET /category` - Get all categoryies\
`GET /category/:id` - Get category\
`PUT /category/:id` - Update category\
`DELETE /category/:id` - Delete category


**brand routes**:\
`POST /brands` - Create a brand\
`GET /brands` - Get all brands\
`GET /brands/:id` - Get brand\
`PUT /brands/:id` - Update brand\
`DELETE /brands/:id` - Delete brand


### Find this project useful ? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

## License
```
   Copyright (C) 2023 Z,H,N,M,Y Team β€οΈ
```
