# Parking management App

### Backend is in the folder parking-api

I use the following technologies:

- Nodejs
- Express
- Mongodb
- graphql
- apollo-server
- mongoose

### Frontend is in the folder parking-ui

I use the following technologies:

- React
- tailwindcss
- apollo-client
- graphql
- antd

## IMPORTANT

to run the project you need to change the value of the variable `VITE_API_GRAPHQL_URL` to your **ip address** in the file .env in the folder parking-ui

example: `VITE_API_GRAPHQL_URL=http://192.168.0.11:4000/graphql`

this is the url of the backend api (parking-api) 
so you need to run the backend first and then run the frontend
both projects in the same machine

- [more info about this problem](#Inportant-info)

## How to run the project

### Backend

1. go to the folder parking-api
2. run `yarn install` to install the dependencies
3. run `yarn build` to build the project (this is required the first time you run the project)
4. run `yarn dev` to run the project

### Frontend

1. go to the folder parking-ui
2. run `yarn install` to install the dependencies
3. run `yarn dev` to run the project

## Inportant info

```
I have some probles to connect the frontend with the backend,
at least when the backend is deployed in cloud(railway),
also havéthe same problem when i use localhost.

I think the problem is the cors, i tried to solve it but i couldn't,
so i decided to use the ip address of my machine because i know that works. :D

the main problem here in frontend is that apollo-client doesn't send the cookies in the request,
so the backend doesn't know if the request is authenticated or not.
and the backend is configured to only allow authenticated users to access the data.
```
