import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add("signIn", (email, password) => {
  // NOTE: for many systems, this would POST to an API rather than
  // go through the UI flow
  cy.visit("/auth/signin");

  // fill out the sign-in form
  cy.findByLabelText(/email address/i)
    .clear()
    .type(email);
  cy.findByLabelText(/password/i)
    .clear()
    .type(password);

  // submit form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for the welcome message
  cy.findByRole("heading", { name: /welcome/i }).should("exist");
});
