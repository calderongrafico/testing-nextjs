import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";
import userAuthHandler from "@/pages/api/users/index";

// mocking the validateToken function (true)
jest.mock("@/lib/auth/utils");
// to be able to change the return value of validateToken
const mockValidateToken = validateToken as jest.Mock;

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data).toHaveProperty("user");
      expect(data.user).toHaveProperty("email");
      expect(data.user).toHaveProperty("id");
      expect(data.user).toHaveProperty("token");
      expect(data.user.email).toBe("test@test.test");
      expect(data.user.id).toBe(1);
    },
  });
});

test("GET /api/user/[userId]/reservations returns correct number of reservations", async () => {
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
      expect(data.userReservations).toHaveLength(2);
    },
  });
});

test("GET /api/user/[userId]/reservations returns no reservations for no-reservations user", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 12345; // user with no reservations
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.userReservations).toHaveLength(0);
    },
  });
});

test("POST /api/user/[userId]/reservations returns 401 for invalid token", async () => {
  // mocking the validateToken function (false) just for this test
  mockValidateToken.mockResolvedValue(false);

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
      expect(res.status).toBe(401);
    },
  });
});
