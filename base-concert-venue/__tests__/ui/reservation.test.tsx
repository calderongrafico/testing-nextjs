import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("reservation page shows correct number of seats", async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test("reservation pages shows 'sold out' message an NO purchase button if there are no seats available", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  // Using fingBy because it is an async call
  const soldOutMsg = await screen.findByText(/sold out/i);
  expect(soldOutMsg).toBeInTheDocument();

  // Using queryBy because we're expecting the button to NOT be in the DOM
  const purchaseBtn = screen.queryByRole("button", { name: /purchase/i });
  expect(purchaseBtn).toBeNull();
  // or..
  expect(purchaseBtn).not.toBeInTheDocument();
});
