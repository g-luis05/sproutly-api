# Sproutly API

A RESTful API to manage hierarchical decisions with passwordless authentication for a future frontend page. This was built mostly as a portfolio project with Node.js, Express, TypeScript, and PostgreSQL with Prisma ORM. But also built for personal use.

## Features

- **Passwordless Authentication**: OTP-based email auth
- **Hierarchical Decision Management**: Create and organize decisions with a parent-child structure
- **Topics Organization**: Group related decisions under topics
- **Security**: JWT Tokens, rate limiting, CORS and Helmet protection
- **Testing**: Critical endpoints and validations tested with postman


## Stack 

- **Packages manager**: pnpm
- **Runtime**: Node.js 24
- **Language**: Typescript
- **Framework**: Express
- **Database**: PostgreSQL 17
- **ORM**: Prisma 7
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **Security**: Helmet, express-rate-limiter, CORS
- **Validation**: Zod

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/g-luis05/sproutly-api.git
cd sproutly-api-main
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

There is a `.env.example` file in the root directory that can be use for reference as a `.env` file.

```env
# SERVER

PORT=3000
NODE_ENV=development/test/production #You decide

#POSTGRES / CONTAINER

POSTGRES_URL=postgresql://postgres_user:postgres_password@localhost:5432/postgres_db
POSTGRES_USER=db_user
POSTGRES_PASSWORD=db_password
POSTGRES_DB=db_name
POSTGRES_PORT=5432

#JWT

JWT_SECRET=your_secret

#EMAIL

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=example@email.com
EMAIL_KEY=your_app_key

#FRONTEND (optional)
FRONTEND_URL=http://localhost:3000
```

### 4. Set up the database

This project includes a `docker-compose.yml` file for local development. Set it with:

- Needs Docker Desktop to run the container

```bash
docker compose up -d
```

Now, execute: 

```bash
# Generate the prisma client
pnpm prisma:generate

# Run the migrations
pnpm prisma:migrate
```

### 5. Start the dev server
```bash
pnpm dev
```

The api will be running locally at `http://localhost:3000`

## Testing

### Postman

This API was tested with Postman mostly due to its simplicity (critical endpoints, validations with Zod, etc). But there is room for improvement. If you want, you can configurate a proper test environment contributing to the project.

---

## API Documentation

- **Development**: `http://localhost:3000/api/v1`

### Authentication Endpoints

#### Request OTP

- Will send the email with the OTP Code

```http
POST /auth/request-otp
Content-Type: application/json

{
    "email": "user@example.com"
}
```

---

#### Verify OTP
- Will give the access token and refresh token

```http
POST /auth/verify-otp
Content-Type: application/json

{
    "email": "user@example.com"
    "code": "123456"
}
```

**Response**:
```json
{
    "accessToken": "eyJhbGh...",
    "refreshToken": "88gf..."
}
```

---

#### Refresh Token
- Will refresh the access token 

```http
POST /auth/refresh
Content-Type: application/json

{
    "refreshToken": "88gf73..."
}
```

---

#### Logout
- Will revoke the actual refresh token

```http
POST /auth/logout
Content-Type: application/json

{
    "refreshToken": "88gf73..."
}
```

---

### Topic Endpoints

All topic endpoints require authentication via `Authorization: Bearer <token>` header.

#### Create Topic
```http
POST /topics
Authorization: Bearer
Content-Type: application/json

{
    "title": "My project",
    "description": "Project planning"
}
```

---

#### Get All Topics
```http
GET /topics
Authorization: Bearer
```

**Response**:
```json
{
    "topics": [
        {
            "id": "uuid",
            "title": "My project",
            "description": "Project planning",
            "userId": "uuid",
            "createdAt": "2026-02-07T10...",
            "updatedAt": "2026-02-07T10..."
        }
    ]
}
```

---

#### Get Root Decisions By Topic
```http
GET /topics/:id/decisions
Authorization: Bearer

```

**Response**:
```json
{
    "decisions": [
        {
            "id": "uuid",
            "title": "Decide on tech stack",
            "description": "Choose technologies for the project",
            "status": "IN_PROCESS",
            "parentId": null,
            "topicId": "uuid",
            "userId": "uuid",
            "order": null,
            "createdAt": "2026-02-01T10...",
            "updatedAt": "2026-02-01T10..."
        },
        {
            "..."
        }
    ]
}
```

---

#### Update Topic
```http
PATCH /topics/:id
Authorization: Bearer
Content-Type: application/json

{
    "title": "Updated title",
    "description": "Updated description" 
}
```

#### Delete Topic

```http
DELETE /topics/:id
Authorization: Bearer
```

**Note**: Deletes all associated decisions (cascade delete)

---

#### Create Decision 
```http
POST /decisions 
Authorization: Bearer
Content-Type: application/json

{
    "topicId": "uuid",
    "title": "Choose Database"
    "description": "Decide between SQL and NoSQL",
    "parentId": "uuid" // optional, null for root decisions
}
```

**Decision Status**: Defaults to `IN_PROCESS`. Available statuses when updating:
- `IN_PROCESS`
- `WAITING`
- `SUCCESSFUL`
- `FAILED`
- `DISCARDED`

---

#### Get Children Decisions
```http
POST /decisions/:id/children
Authorization: Bearer
```

**Response**:
```json
{
    "decisions": [
        {
            "id": "uuid",
            "title": "Research PostgreSQL",
            "description": "Evaluate PostgreSQL features",
            "status": "SUCCESSFUL",
            "parentId": "parent-uuid",
            "topicId": "uuid",
            "userId": "uuid",
            "order": null,
            "createdAt": "2026-02-07T10...",
            "updatedAt": "2026-02-07T10..."
        },
        {
            "..."
        }
    ]
}
```
---

#### Update Decisions
```http
PATCH /decisions/:id
Authorization: Bearer
Content-Type: application/json

{
    "title": "Updated title"
    "description": "Updated description",
    "status": "SUCCESSFUL"
}
```

---

#### Delete Decisions
```http
DELETE /decisions/:id
Authorization: Bearer
```

**Note**: Deletes all child decisions (cascade delete)

---

### Error Responses

Endpoints may return the following error responses:

#### 400 Bad Request
```json
{
  "message": [
    {
      "code": "invalid_type",
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

#### 403 Forbidden
```json
{
  "message": "You don't have permission to access this resource"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 429 Too Many Requests
```json
{
  "message": "Too many requests from this IP, please try again later"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Security Features

### Authentication $ Authorization
- **Passwordless OTP**: Email-based authentication
- **JWT Tokens**: Access Tokens (10 min) + Refresh Tokens (7 days)
- **Token Refresh**: Automatic session renewal
- **Token Revocation**: Refresh tokens revoked on logout

### API
- **Rate limiting**: Prevent excesive amount of requests
    - OTP Request: 3 per minute
    - General API: 20 request per minute
- **CORS**: Configured for specific frontend origins
- **Helmet**: Security headers
- **Input Validation**: Zod schema validation on all endpoints
- **User Isolation**: Users can only access their own data

### Notes
- It could be considered to implement a Redis-based token blacklist

## Available Scripts

```bash
# Development
pnpm dev                # Start development server

# Production
pnpm build              # Build for production
pnpm start              # Start production server
pnpm start:prod         # Build and start production server

# Database
pnpm prisma:generate    # Generate prisma client
pnpm prisma:migrate     # Run the migrations in dev mode
pnpm migrate:deploy     # Run migrations in production
pnpm prisma:studio      # Open Prisma Studio

pnpm typecheck          # Type check without build

```

## Contribution

This project is open for contributions. This is a learning and portfolio project, but feel free to:

1. `git clone` the repository 
2. Create a new feature branch 
3. Commit and push changes into that branch
4. Open a pull request

## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

**Luis Gomez**
- [@g-luis05](https://github.com/g-luis05)


---

If you find this project helpful, please consider giving it a star!
