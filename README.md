# Structure Challenge API
API for structure challenge React.js web app.

## Up and running
`npm install`

`npm start`

## Deployment

## HTTP API
| Method | Route | Description | JWT required
| --- | --- | --- | ---
| POST | /v1/auth/login | get token for an email/password | N
| POST | /v1/users | create a user | N
| GET  | /v1/users/:userId | Retrieve user record | Y
| POST | /v1/stats | Upload stats for a user | Y
| GET  | /v1/stats/:userId | Retrieve stats for a user | Y
| GET  | /v1/metrics/leaderboard | Leaderboard | Y
