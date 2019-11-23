describe("/login", function() {
  beforeEach(function() {
    cy.visit("http://18.139.223.164:4100/login");
  });

  it("should greet with Sign In", function() {
    cy.get("h1").contains("Sign In");
  });

  it("should have href of /login", function() {
    cy.get("a")
      .contains("Need an account?")
      .should("have.attr", "href", "/register");
  });

  it("should sign me in successfully", function() {
    cy.fixture("user/adam.json").then(function(user) {
      // user.username => adam
      cy.get("[data-test=email]")
        .clear()
        .type(user.email);

      cy.get("[data-test=password]")
        .clear()
        .type(user.password + "{enter}");
        //.type(`${user.password}{enter}`)

      cy.location("pathname").should("be.eq", "/");
    });
  });
});
