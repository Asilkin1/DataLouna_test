1. Run ```npm -i``` to install all dependencies
2. Configure environment variables in .env for Redis and Postgres
3. Run ```npx ts-node-dev src/index.ts``` to start the server

## Task 1: Registration, Authentication, Change Password
- [x] ```/auth/register``` to register a new user

- [x] ```/auth/login``` to login

- [x] ```/auth/change-password``` to change password

## Task 2: Display an array of objects with 2 minimum prices for items (tradable and non-tradable)
### source: https://docs.skinport.com/#items
#### params app_id and currency - default
#### need to use caching with Redis

## Task 3
Route ```localhost:3000/product/buy/```
### Simulate product purchase from ```products``` table
- [x] Fill the table with random data
- [x] A user should have a balance
- [x] Returns updated balance
