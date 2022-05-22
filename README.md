# 24 Hour NestJS API Challenge / Project

## Description
The goal of this test is to create a consumable RESTful API for storing and retrieving
images.

## Code Repository
- https://github.com/biboyatienza/nestjs24hour


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tools
- Visual Studio Code
- Git/Github
- docker for PostgreSQL
- Prisma
- NestJs.com
- SendGrid


## Testing
I am using REST Client v0.24.6 by Huachao Mao, a VS Code extension.

- 24hrs-test.http
- test.http



### 05:30 images/id - with valid token:
```
GET  http://localhost:8080/images/1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6ImJpYm95YXRpZW56YUBnbWFpbC5jb20iLCJpYXQiOjE2NTMyNTQyOTAsImV4cCI6MTY1MzI1NTE5MH0.NprJID1OKJNpC164RhKqBZ8-Q2Vzekom_i8xBlp6Plg
```

### Result: 
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 175
ETag: W/"af-LkoyG2b28jqWgW3BhFpmoVeoXkQ"
Date: Sun, 22 May 2022 21:30:18 GMT
Connection: close

{
  "id": 1,
  "hits": 2,
  "uri": "https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress\\u0026cs=tinysrgb\\u0026dpr=1\\u0026fit=crop\\u0026h=200\\u0026w=280"
}
```


### 05:29 images/id - Calling with invalid token: 
```
GET  http://localhost:8080/images/1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZW1haWwwM0BnbWFpbC5jb20iLCJpYXQiOjE2NTMyNDkyNDcsImV4cCI6MTY1MzI1MDE0N30.xzdWENaOdWhnsXr1ZMfay-aApHoBve88OOiUJGpUzAg
```
### Result: 
```
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 43
ETag: W/"2b-hGShxOkieaAVDloBubJVM+h58D8"
Date: Sun, 22 May 2022 21:27:59 GMT
Connection: close

{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 05:22 PASSWORD RESET" 
```
POST http://localhost:8080/auth/password-reset
Content-Type: application/json

{
  "email": "baliwme2014@gmail.com"
}
```
### Result: also with send an email to the given email address
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 4
ETag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"
Date: Sun, 22 May 2022 21:22:05 GMT
Connection: close

true
```


### 05:20 LOGIN: Using and password should a token 
```
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "email": "biboyatienza@gmail.com",
  "password": "Pass@word123!"
}
```
### Result:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 203
ETag: W/"cb-OdAnKT0+ivgjzJ/0oyZjDLrE3/4"
Date: Sun, 22 May 2022 21:18:10 GMT
Connection: close

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6ImJpYm95YXRpZW56YUBnbWFpbC5jb20iLCJpYXQiOjE2NTMyNTQyOTAsImV4cCI6MTY1MzI1NTE5MH0.NprJID1OKJNpC164RhKqBZ8-Q2Vzekom_i8xBlp6Plg"
}
```



### 05:07 REGISTER: A valid user and password should return a token:
```
POST http://localhost:8080/auth/register
Content-Type: application/json

{
  "email": "biboyatienza@gmail.com",
  "password": "Pass@word123!",
  "role": "ADMIN"
}
```

### Result:
```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 203
ETag: W/"cb-Cg1WSML44nLlEFcRkBX7Fx6+AEU"
Date: Sun, 22 May 2022 21:14:44 GMT
Connection: close

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6ImJpYm95YXRpZW56YUBnbWFpbC5jb20iLCJpYXQiOjE2NTMyNTQwODQsImV4cCI6MTY1MzI1NDk4NH0.DCTJpXrUeE5-M8EGOFeETrfmxImTXvjV5a09gkub5hA"
}
```

### 05:07 REGISTER: Invalid password should return error
```
POST http://localhost:8080/auth/register
Content-Type: application/json

{
  "email": "adm3@gmail.com",
  "password": "ssw1111",
  "role": "ADMIN"
}

```

### Result: 
  ```
  HTTP/1.1 400 Bad Request
  X-Powered-By: Express
  Content-Type: application/json; charset=utf-8
  Content-Length: 128
  ETag: W/"80-V8CxVySWe4UyN5QeqY87MqJ2kJE"
  Date: Sun, 22 May 2022 21:11:01 GMT
  Connection: close

  {
    "statusCode": 400,
    "message": [
      "Password too weak",
      "password must be longer than or equal to 8 characters"
    ],
    "error": "Bad Request"
  }
  ```

### 05:07 REGISTER: An Existing User should return error
```
POST http://localhost:8080/auth/register
Content-Type: application/json

{
  "email": "admin1@gmail.com",
  "password": "P@ssword!1",
  "role": "ADMIN"
}
```
### Result:
```
  HTTP/1.1 403 Forbidden
  X-Powered-By: Express
  Content-Type: application/json; charset=utf-8
  Content-Length: 74
  ETag: W/"4a-GHBZjFPSwzIT1kpOZwyLwrJWdVc"
  Date: Sun, 22 May 2022 21:05:33 GMT
  Connection: close

  {
    "statusCode": 403,
    "message": "Email already registed.",
    "error": "Forbidden"
  }
```





## References
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model
- https://www.pexels.com/api/documentation/#authorization
- pxls => 563492ad6f9170000100000143b1404b9f7e475d8c8831687a2e36a9
- 08:46 https://docs.nestjs.com/recipes/prisma#set-up-prisma
- 09:53 issue with ip address of PG on PgAdmin
  - Resolution: https://www.youtube.com/watch?v=3nIc5GNmh98 
  - $ docker inspect 207bb054e117
- 10:20 Setup Prism/client
- 10:52 Coffee refill (2nd)
- 11:54 https://docs.nestjs.com/security/authentication#jwt-functionality
- 12:32 https://stackoverflow.com/questions/71219246/jsonwebtokenerror-jwt-must-be-provided-nest-js
- 12:45  Error: listen EADDRINUSE: address already in use :::8080 
  - Resolution: $ npx kill-port 8080
- 12:57 Register a user is now working, with token returns 
    ```
    ### POST local/register: 
    POST http://localhost:8080/auth/register
    Content-Type: application/json

    {
      "email": "email03@gmail.com",
      "password": "P@ssword!"
    }

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZW1haWwwM0BnbWFpbC5jb20iLCJpYXQiOjE2NTMxOTUxNzksImV4cCI6MTY1MzE5NjA3OX0.Aw1DbftPRXIS-Xc9Q8t2qWWfVuTe0ta_S3hMPee0ab8"
    }
    ```
- 13:08 https://docs.nestjs.com/techniques/configuration
- 14:04 Lunch Break
- 14:23 Resume
- 15:58 Working Password reset & new route, just need other service for email
- 16:38 Applied enum RBAC
- 16:57 Create a protected route => http://localhost:8080/auth/
  - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZW1haWwwM0BnbWFpbC5jb20iLCJpYXQiOjE2NTMyMDk3MzksImV4cCI6MTY1MzIxMDYzOX0.Hyi8vGiJJK8SqAj9UVHqMwoxFGWTn9J8Q_s8td0nz8A
- 17:07 Apply event for out emailing => https://docs.nestjs.com/techniques/events
- 17:36 https://app.sendgrid.com/
- 17:41 https://progressivecoder.com/how-to-send-emails-using-nestjs-sendgrid-api/
- 17:48 sg =>  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
- 18:39 Setting up SendGrif verifications :(
- 18:41 Sendgrid test OK!
- 19:08 Dinner Break
- 20:09 Resume, Sendgrid not ending email :(
  - https://jsonlint.com/
- 21:05 Sendgrid is now working on NestJS
- 21:21 Start working with images, 8hrs to go :(
- 21:30 https://stackoverflow.com/questions/54958244/how-to-use-query-parameters-in-nest-js
- 23:56 Image service
- 01:09 https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
- 01:51 Created basic image routes
- 02:56 https://cloudinary.com/console/c-dc77ffa1444252c90516193ea838a7/getting-started
- 02:59 wiring cloudinary
- 04:17 Brain is now working properly, sleepy :(
- 04:22 Just fixing this ReadMe  

