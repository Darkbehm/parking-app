# this repo has the code for the backend and frontend of the project

## Backend is in the folder parking-api

I use the following technologies:
  - Nodejs
  - Express
  - Mongodb
  - graphql
  - apollo-server
  - mongoose

## Frontend is in the folder parking-ui

I use the following technologies:
  - React
  - tailwindcss

### Notes 
to run the project you need to change the value of the variable VITE_API_GRAPHQL_URL to your ip address in the file .env in the folder parking-ui

this is the url of the backend api (parking-api) so you need to run the backend first in your machine and then run the frontend

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
