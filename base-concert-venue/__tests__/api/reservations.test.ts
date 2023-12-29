import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import reservationsHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

// mocking the validateToken function (true)
jest.mock("@/lib/auth/utils");

const mockValidateToken = validateToken as jest.Mock;

test("POST /api/reservations/[reservationId] creates a reservation successfully", async () => {
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 2,
          userId: 1,
          showId: 1,
        }),
      });

      expect(res.status).toBe(201);
    },
  });

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.userReservations).toHaveLength(3);
    },
  });
});

test("POST /api/reservations/[reservationId] returns 401 for invalid token", async () => {
  // mocking the validateToken function (false) just for this test
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 2,
          userId: 1,
          showId: 1,
        }),
      });

      expect(res.status).toBe(401);
    },
  });
});
