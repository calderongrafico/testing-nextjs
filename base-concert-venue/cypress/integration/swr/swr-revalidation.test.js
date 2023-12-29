import { generateNewReservation } from "../../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const FIFTEEN_SECONDS = 15 * ONE_SECOND;
const THIRTY_SECONDS = 30 * ONE_SECOND;

it("should refresh shows page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // there should be only one sold-out show
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // buy all tickets for the first show (id: 0, 10 seats available)
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });

  cy.task("addReservation", newReservation);

  // advance time by 1 second and check again that there's only one sold-out show after the new reservation
  // this is because the SWR time interval is set to 30 seconds. See pages/shows/index.tsx
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // advance time by 30 seconds and check that there should be 2 sold-out shows now
  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it("should refresh reservations page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  // click sign-in button from main page (not nav bar) to sign in as a user...
  // ...in an app where user/password weren't pre-filed
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // it should show 10 seats left
  cy.findByText(/10 seats left/i).should("exist");

  // make a 2 seats reservation
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 2,
  });
  cy.task("addReservation", newReservation);

  // advance time by 1 second and check again that there's still 10 seats left
  cy.tick(ONE_SECOND);
  cy.findByText(/10 seats left/i).should("exist");

  // advance time by 15 seconds and check that there should be 8 seats left now
  cy.tick(FIFTEEN_SECONDS);
  cy.findByText(/8 seats left/i).should("exist");
});
