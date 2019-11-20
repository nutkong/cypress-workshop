describe("/", function() {
  it("should render ariticle correctly", function() {

    cy.server()
    cy.wait("/some/api/path").as("someRoute")

    // statement

    cy.wait("@someRoute", { timeout: 10000 })

    cy.visit("http://18.139.223.164:4100/");

    cy.wait(15000);

    cy.get(".article-preview").should("have.length.lte", 10);
  });
});











