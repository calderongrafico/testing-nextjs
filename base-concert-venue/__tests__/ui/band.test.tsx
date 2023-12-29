import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandPage from "@/pages/bands/[bandId]";

test("the band component displays the correct information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandPage band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

test("the component returns an error", () => {
  render(<BandPage band={null} error={"This band doesn't exist"} />);

  const error = screen.getByRole("heading", {
    name: /Could not retrieve band data: This band doesn't exist/i,
  });
  expect(error).toBeInTheDocument();
});
