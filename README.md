<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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
 


## TODO:
- RegEx (Special || Number) => /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
- configService.get<string>('TOKEN_SECRET')


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
