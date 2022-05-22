# 24 Hour NestJS API Challenge / Project

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
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
  

## TODO:
- RegEx (Special || Number) => /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
- configService.get<string>('TOKEN_SECRET')

