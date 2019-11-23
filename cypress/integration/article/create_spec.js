describe("/editor", function() {
  it("create article successfully", function() {
    // start login
    cy.visit("http://18.139.223.164:4100/login");
    cy.fixture("user/adam.json").then(function(user) {
      cy.get("[data-test=email]").clear().type(user.email);
      cy.get("[data-test=password]").clear().type(user.password + "{enter}");
      cy.location("pathname").should("be.eq", "/");
    });
    // end login

    // test create new article
    cy.visit("http://18.139.223.164:4100/editor");
    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type("test");
    cy.get("textarea").eq(0).type("test");
    cy.get("input").eq(2).type("test{enter}");
    cy.get("form").get("button").click();
    // end create new article
  });
});
