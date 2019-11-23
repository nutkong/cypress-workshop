describe("/", function() {
  it("should render properly", function() {
    cy.server()
    cy.route("/api/articles?limit=10&offset=0").as("articleApi")

    cy.visit("http://18.139.223.164:4100/");

    cy.wait("@articleApi", { timeout: 15000 })

    cy.get(".article-preview").should("have.length.lte", 10)
  });
});
