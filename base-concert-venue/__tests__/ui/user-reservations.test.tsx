import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("Purchase button shows 'purchase more tickets' when user has reservations", async () => {
  render(<UserReservations userId={1} />);
  // Using findBy because it is an async call
  const purchaseBtnText = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });

  expect(purchaseBtnText).toBeInTheDocument();
});

test("Purchase button shows 'purchase tickets' when user has NO reservations", async () => {
  render(<UserReservations userId={0} />);

  const purchaseBtnText = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(purchaseBtnText).toBeInTheDocument();

  // Using queryBy because we're expecting the heading to NOT be in the DOM
  const heading = screen.queryByText(/your tickets/i);
  expect(heading).toBeNull();
  // or...
  expect(heading).not.toBeInTheDocument();
});
