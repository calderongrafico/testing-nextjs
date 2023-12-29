it("shows Purchase More Tickets button in the user page", () => {
  // reset db and sign-in using custom signIn command
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_USER_PASSWORD")
  );

  // access user page
  cy.visit("/user");

  // check for purchase mor tickets button
  cy.findByRole("button", { name: /purchase more tickets/i }).should("exist");
});
