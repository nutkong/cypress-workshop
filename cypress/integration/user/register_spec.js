describe("/register", function() {
  beforeEach(function() {
    cy.visit("http://localhost:4100/register");
  });
  it("register successfully [by selecting input index]", function() {
    cy.get("input")
      .eq(0)
      .type("admin");

    cy.get("input")
      .eq(1)
      .type("admin@mail.com");

    cy.get("input")
      .eq(2)
      .type("password{enter}");

    // cy.get("button")
    //   .contains("Sign up")
    //   .click();
    // cy.get("form").submit();
    // cy.get("form")
    //   .eq(0)
    //   .submit();
  });

  it("register successfully [by selecting data-*]", function() {
    cy.get("[data-test=username]").type("john");
    cy.get("[data-test=email]").type("john@mail.com");
    cy.get("[data-test=password]").type("john");
    cy.get("[data-test=signup-form]").submit();
  });

  it("return username already taken", function() {
    cy.fixture("users.json").then(function(users) {
      cy.server();
      cy.route({
        url: "**/api/users",
        method: "POST",
        response: {
          errors: {
            username: "is already taken.",
            email: "is already taken."
          }
        },
        status: 422
      }).as("postUser");

      cy.get("[data-test=username]").type(users[0].username);
      cy.get("[data-test=email]").type(users[0].email);
      cy.get("[data-test=password]").type(users[0].password);
      cy.get("[data-test=signup-form]").submit();

      cy.wait("@postUser");
    });
  });

  // it("register successfully [w/ fixture]", function() {
  //   cy.fixture("users.json").then(function(users) {
  //     cy.get("[data-test=username]").type(users[0].username);
  //     cy.get("[data-test=email]").type(users[0].email);
  //     cy.get("[data-test=password]").type(users[0].password);
  //     cy.get("[data-test=signup-form]").submit();
  //   });
  // });
});
