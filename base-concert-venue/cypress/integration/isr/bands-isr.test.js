it("skips client-side bundel, confirming data from ISR cache", () => {
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the scripts, so they don't start automattically
      const staticHtml = html.replace(/<script.*?>.*?<\/script.*?>/gm, "");
      cy.state("document").write(staticHtml);
    });

  // find expected bands
  cy.findByRole("heading", { name: /The Wandering Bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
  cy.findByRole("heading", { name: /The Joyous Nun Riot/i }).should("exist");
});
