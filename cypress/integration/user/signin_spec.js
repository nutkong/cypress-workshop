describe("/login", function() {
  it("should greet with Sign In", function() {
    cy.visit("http://18.139.223.164:4100/login");

    cy.get("h1").contains("Sign In");
  });

  it("should have link which let us go to /register", function() {
    cy.visit("http://18.139.223.164:4100/login");

    cy.get("a")
      .contains("Need an account?")
      .should("have.attr", "href", "/register");
  });
















  

});
