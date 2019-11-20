describe("https://www.skyscanner.co.th", function() {
  it("should render time correctly", function() {
    const now = new Date(2017, 11, 13).getTime();
    cy.clock(now);

    cy.visit("https://www.skyscanner.co.th");
  });
});
