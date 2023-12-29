it("runs auth flow for successful login to protected reservations page", () => {
  // visit revervations page for the first show (id: 0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check that tehre's no option to purchase tickets
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  // enter valid sign in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for purchase button and band name
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");

  // check for email and sign-out button on navbar
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("runs auth flow for protected user page, including failed sign in", () => {
  // reset db and visit user page
  cy.task("db:reset").visit("/user");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check that there's no welcome message
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  // fill out the sign-in form with env vars values, but bad password
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type("not my password");

  // submit form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for error message
  cy.findByText(/Sign in failed/i).should("exist");

  // submit the from again with the correct password
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check that there is a welcome message and Yor Tickets heading
  cy.findByRole("heading", { name: /welcome/i }).should("exist");
  cy.findByRole("heading", { name: /your tickets/i }).should("exist");

  // check for email and sign-out button on navbar
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("redirects to sign-in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url);
      cy.findByRole("heading", { name: /sign in to your account/i }).should(
        "exist"
      );
    });
  });
});

it("does not show sign-in page when already signed in", () => {
  // reset db and sign-in using custom signIn command
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_USER_PASSWORD")
  );

  // access reservations page
  cy.visit("/reservations/0");

  // check there's no sign in heading
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "not.exist"
  );

  // check for purchase button
  cy.findByRole("button", { name: /purchase/i }).should("exist");
});
