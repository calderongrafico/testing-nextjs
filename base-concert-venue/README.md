# Popular Concert Venue

### An app to support the Udemy course [Testing Next.js Apps](https://www.udemy.com/course/nextjs-testing/)

## Installation

1. Run `npm install`
2. Run `cp .env.development.local_template .env.development.local`
3. Run `cp .env.test.local_template .env.test.local`
4. Run `cp .env.local_template .env.local`
5. In _.env.test.local_, pupulate `CYPRESS_TEST_USER_EMAIL` and `CYPRESS_TEST_USER_PASSWORD` with data that matches test database data
6. In _.env.local_ and _.env.test.local_:

- add site base URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL`

- add long, hard-to-guess strings as the values for `NEXTAUTH_SECRET` and `REVALIDATION_SECRET`

  - command to generate a random string: `openssl rand -base64 32`

## Running the App

Run `npm run dev`. The app will be found at [http://localhost:3000]
