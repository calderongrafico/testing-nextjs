# UPDATE: Cypress 10

While this course was being produced, Cypress 9 was the latest version. However, Cypress 10 has now been released, and it has some differences.


## If you'd like to use Cypress 9
Using Cypress 9 means that you will be able to follow along with the course code exactly. In order to do this, when you install Cypress you must use this command: 

`npm install cypress@^9`
This will install the latest version of Cypress 9.


## If you'd rather use Cypress 10
Cypress 10 is a major update, and requires different configuration syntax and filenames.

### Course example using Cypress 10

You can find an example of course solutions using Cypress 10 (and Next.js 12.2) in the course repo (https://github.com/bonnie/udemy-NEXTJS-TESTING/tree/main/tested-concert-venue-nextjs12.2-cypress10.3).

### Some key differences:

- Test files are located in the `e2e` directory instead of the `integration` directory

- When opening Cypress, you need to select e2e tests (https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad).

- Filenames end in `.cy.js` instead of `.test.js` (for example, if the course uses a file called routes.test.js, you will name this file routes.cy.js).

- The file glob line in .eslintrc.json needs to account for this filename difference (https://github.com/bonnie/udemy-NEXTJS-TESTING/pull/1/files#diff-8ecc5decee27f3e208c87e7fc866bf0b075283484b9004e9654254fefc0f07ca)

- Tasks and environment variables are written in cypress.config.js instead of cypress/plugins/index.js (https://docs.cypress.io/api/commands/task#Syntax)

- The configuration file environment variable definition looks a bit different (https://docs.cypress.io/guides/guides/environment-variables#Option-1-configuration-file).




# TROUBLESHOOTING: `npm run cypress:start` hangs

### The symptom
npm run cypress:start hangs with no error.

### The fix
Update your script in package.json to: 

`"cypress:start": "start-server-and-test --expect 200 start:test http://127.0.0.1:3000 cypress:open"`,

### The explanation
It seems the `--expect` option introduced in start-server-and-test v1.5.0 is required with Node version 18.



# IMPORTANT: Must use older version of Testing Library with Cypress 9
The latest version of Testing Library for Cypress is not compatible with Cypress 9. In the next video, you will need to install an older version of Testing Library for Cypress if you choose to use Cypress 9: 

`npm i -D @testing-library/cypress@8.0.7`