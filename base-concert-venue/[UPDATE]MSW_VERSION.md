## IMPORTANT! Mock Service Worker version

### The issue
On October 23, 2023, Mock Service Worker (MSW) released version 2. This version has breaking changes and a new syntax compared to version 1.

### The workaround
This course is taught using MSW version 1, and currently won't work if you install MSW version 2. You will need to specify version 1 when installing msw in order to follow along with the course code: 

- `npm install msw@1` 

### Using MSW v2
MSW v2 syntax differs only for the handlers. Here's an example of the v1 vs v2 syntax.

v1 syntax, as presented in the course: 

```
  import { rest } from "msw";
  import { readFakeData } from "@/__tests__/__mocks__/fakeData";
  
  export const handlers = [
    rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
      const { fakeShows } = await readFakeData();
      const { showId } = req.params;
  
      // index / showId = 0 has seats available in fake data
      // index / showId = 1 has NO seats available
      return res(ctx.json({ show: fakeShows[Number(showId)] }));
    }),
  ]
```

The equivalent in MSW v2 syntax would be: 

```
  import { http, HttpResponse } from 'msw'
  import { readFakeData } from "@/__tests__/__mocks__/fakeData";
  
  export const handlers = [
    http.get("http://localhost:3000/api/shows/:showId", async ({ params }) => {
      const { fakeShows } = await readFakeData();
      const { showId } = params;
  
      // index / showId = 0 has seats available in fake data
      // index / showId = 1 has NO seats available
      return HttpResponse.json({ show: fakeShows[Number(showId)] });
    }),
  ]
```

You can read more in the MSW docs.

### Installing MSW v2

Also, you may need to use the --legacy-peer-deps flag when installing the latest MSW version: 

`npm install --save-dev --legacy-peer-deps msw`