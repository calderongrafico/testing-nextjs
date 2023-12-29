import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export const resetDb = async (): Promise<void> => {
  // failsafe against accidentally running this in production
  const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;

  if (!safeToReset) {
    // eslint-disable-next-line no-console
    console.warn(
      "WARNING: Database reset unavailable outside test environment."
    );
  }

  const { fakeBands, fakeReservations, fakeShows, fakeUsers } =
    await readFakeData();

  // overwrite the existing JSON files with the fake data
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
};
