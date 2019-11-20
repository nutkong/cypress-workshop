describe("/register", function() {
  it("should greet with Sign up", function() {
    cy.visit("http://18.139.223.164:4100/register");

    cy.get("h1").contains("Sign Up");
  });

  it("link should have href locate to /login", function() {
    cy.visit("http://18.139.223.164:4100/register");

    cy.get("a")
      .contains("Have an account?")
      .should("have.attr", "href", "/login");
  });

  it("should register successfully", function() {
    cy.visit("http://18.139.223.164:4100/register");

    cy.fixture("user/user-01").then(function(user) {
      cy.get("[data-test=username]").type(user.username);
      cy.get("[data-test=email]").type(user.email);
      cy.get("[data-test=password]").type(`${user.password}{enter}`);
    });
  });

  it("should show error message when typing same username and email", function() {

    cy.server();
    cy.route({
      url: "/path/we/want/to/stub",
      method: "POST",
      status: 200,
      response: {
        // response object
      }
    });

    cy.visit("http://18.139.223.164:4100/register");

    cy.fixture("user/user-01").then(function(user) {
      cy.get("[data-test=username]").type(user.username);
      cy.get("[data-test=email]").type(user.email);
      cy.get("[data-test=password]").type(`${user.password}{enter}`);
    });
  });







});
