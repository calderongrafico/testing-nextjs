import { generateNewBand } from "../../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../../lib/features/reservations/utils";

it("displays correct heading when navigating to Shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays the correct heading when navigating to Bands route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /our illustrious performers/i }).should(
    "exist"
  );
});

it("displays correct band name for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
});

it("displays an error message when the band id doesn't exist", () => {
  cy.task("db:reset").visit("/bands/123645");
  cy.findByRole("heading", {
    name: /Could not retrieve band data: Error: band not found/i,
  }).should("exist");
});

it("displays name for band that was not present at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);

  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
});
