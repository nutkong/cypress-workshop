describe("/login", function() {
  beforeEach(function() {
    cy.visit("http://localhost:4100/login");
  });

  it("login successfully [by selecting input index]", function() {
    cy.get("input")
      .eq(0)
      .type("test@mail.com");

    cy.get("input")
      .eq(1)
      .type("test{enter}");

    // cy.get("button")
    //   .contains("Sign in")
    //   .click();
    // cy.get("form").submit();
    // cy.get("form")
    //   .eq(0)
    //   .submit();
  });

  it("login successfully [by selecting data-*]", function() {
    cy.get("[data-test=email]").type("test@mail.com");
    cy.get("[data-test=password]").type("test{enter}");
    // cy.get("[data-test=login-form]").submit();
  });

  it("login successfully [w/ fixture]", function() {
    cy.fixture("users").then(function(users) {
      cy.get("[data-test=email]").type(users[0].email);
      cy.get("[data-test=password]").type(`${users[0].password}{enter}`);
      // cy.get("[data-test=login-form]").submit();
    });
  });
});
