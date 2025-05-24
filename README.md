<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Lab

This project showcases key NestJS features:

### Core Features Demonstrated

- **Decorators**: Custom parameter decorators (`@CurrentUser`), class decorators, and method decorators
- **Filters**: Exception filters for handling errors and formatting responses
- **Guards**: Authentication guards for protecting routes
- **Interceptors**:
  - Serialization interceptor for transforming responses
  - Current user interceptor for attaching user data to requests

## Installation

```bash
# Install dependencies
$ npm install
```

## Environment Setup

Create two environment files in the root directory:

1. `.env.development` for development:

```env
DB_NAME=db.sqlite
PORT=3000
```

2. `.env.test` for testing:

```env
DB_NAME=test.sqlite
PORT=3001
```

## Running the app

```bash
# Development
$ npm run start:dev

```

## Test

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Feature Examples

### Decorators

```typescript
@CurrentUser() // Custom parameter decorator
async whoami(@CurrentUser() user: User) {
  return user;
}
```

### Filters

```typescript
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // Custom error handling
}
```

### Guards

```typescript
@UseGuards(AuthGuard)
@Get('whoami')
async whoami() {
  // Protected route
}
```

### Interceptors

```typescript
@UseInterceptors(SerializeInterceptor)
@Controller('auth')
export class UsersController {
  // Response transformation
}
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/whoami` - Get current user (Protected route)
- `POST /auth/logout` - Logout user

### Users

- `GET /auth/getUserById/:id` - Get user by ID
- `PATCH /auth/updateUser/:id` - Update user
- `DELETE /auth/deleteUser/:id` - Delete user
