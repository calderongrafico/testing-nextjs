import { testApiHandler } from "next-test-api-route-handler";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import showIdHandler from "@/pages/api/shows/[showId]";
import showsHandler from "@/pages/api/shows/index";

test("GET /api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const data = await res.json();

      const { fakeShows } = await readFakeData();
      expect(data.shows).toEqual(fakeShows);
    },
  });
});

test("GET /api/shows/[showId] returns correct show", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const data = await res.json();
      const { fakeShows } = await readFakeData();
      expect(data.show).toEqual(fakeShows[0]);
    },
  });
});

test("POST /api/shows reruns 401 for invalid revalidations secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.queryStringURLParams = { secret: "NOT_THE_REAL_SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
      });
      expect(res.status).toBe(401);
    },
  });
});
