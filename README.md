# job-search-dashboard

## Development

### Setup GitHub for Authentication

Create a copy of local environment variables:
```sh
cp .env.local.example .env.local
```

Define `AUTH_SECRET` environment variable:
```sh
npx auth secret
```

Set up local environment for GitHub app:

1. Go to https://github.com/settings/apps
2. Create a new GitHub app:

- **GitHub App name:** Job Search Dashboard (local)
- **Homepage URL:** http://localhost:3000/
- **Callback URL:** http://localhost:3000/api/auth/callback/github
- No webhook

3. Create a client secret and a private key
4. Store client id (`AUTH_GITHUB_ID`) and client secret (`AUTH_GITHUB_SECRET`) in `.env.local`

### Installing Node Modules
Node modules should be installed in the `next-app` container instead of locally:

```sh
docker-compose exec next-app npm install <package>
```

### Run Locally

To run the Next.js app and database locally:

```sh
docker-compose up --build
```

To shut everything down:
```sh
docker-compose down
```

Please note: Docker is only used for local development.

Go to [http://localhost:3000](http://localhost:3000).

To connect to MongoDB locally:
```
mongodb://<username>:<password>@localhost:27017/
```

# Production

- The Next.js app is hosted on [Vercel](https://vercel.com/)
- The MongoDB database is hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)
