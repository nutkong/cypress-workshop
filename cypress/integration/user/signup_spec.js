describe("/register", function() {
  beforeEach(function() {
    cy.visit("http://18.139.223.164:4100/register");
  });
  it("should greet with Sign Up", function() {
    cy.get("h1").contains("Sign Up");
  });

  it("should have href of /login", function() {
    cy.get("a")
      .contains("Have an account?")
      .should("have.attr", "href", "/login");
  });

  it("should return error when submit same user or email", function() {
    cy.server();
    cy.route({
      url: "/api/users",
      method: "post",
      status: 422,
      response: {
        errors: {
          email: "is already taken.",
          username: "is already taken."
        }
      }
    });
    cy.fixture("user/adam").then(function(user) {
      cy.get("[data-test=username]").clear()
        .type(user.username);

      cy.get("[data-test=email]").clear()
        .type(user.email);

      cy.get("[data-test=password]").clear()
        .type(user.password + "{enter}");
    });
    cy.get(".error-messages").contains("username is already taken");
    // cy.get(".error-messages").get(0).get("li").get(0).should("have.text", "username is already taken");
    cy.get(".error-messages").contains("email is already taken");
  });

  it("should sign me up successfully", function() {
    cy.fixture("user/adam").then(function(user) {
      cy.get("[data-test=username]")
        .clear()
        .type(user.username);

      cy.get("[data-test=email]")
        .clear()
        .type(user.email);

      cy.get("[data-test=password]")
        .clear()
        .type(user.password + "{enter}");
    });
  });
});
