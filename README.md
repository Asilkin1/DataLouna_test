### First step to run the project
Create .env file in the project root with the following variables

```DATABASE```="postgres://username:password@localhost:port/database" \
```PORT```=3000 \
```REDIS_PASSWORD```= \
```REDIS_USERNAME```= \
```REDIS_HOST```= 
1. Run ```npm -i``` to install all dependencies
2. Run ```npx ts-node-dev src/index.ts``` to start the server

## Task 1: Registration, Authentication, Change Password
- [x] ```/auth/register``` to register a new user

- [x] ```/auth/login``` to login

- [x] ```/auth/change-password``` to change password

## Task 2: Display an array of objects with 2 minimum prices for items (tradable and non-tradable ?? not sure what is expected in here)
Route: ```localhost:3000/items/skinport/```
- [x] source: https://docs.skinport.com/#items
- [x] params app_id and currency - default
- [x] need to use caching with Redis

## Task 3
Route ```localhost:3000/product/buy/```
### Simulate product purchase from ```products``` table
- [x] Fill the table with random data
- [x] A user should have a balance
- [x] Returns updated balance
