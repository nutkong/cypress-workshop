describe("/register", function() {
  it("should create account successfully", function() {
    cy.visit("http://13.229.67.92:4100/register");

    cy.get("input")
      .eq(0)
      .type("username");

    cy.get("input")
      .eq(1)
      .type("example@mail.com");

    cy.get("input")
      .eq(2)
      .type("testpassword");

    cy.get("form").submit();
  });
});
