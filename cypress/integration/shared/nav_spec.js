describe("/", function() {
  it("should contain Home Sign in and Sign up if I haven't logged in", function() {
    cy.visit("http://18.139.223.164:4100/");
    cy.get("nav").should("have.contain", "Home");
    cy.get("nav").should("have.contain", "Sign in");
    cy.get("nav").should("have.contain", "Sign up");
  });

  it("should have contain username, new Article and Setting after login success", function() {
    cy.server();

    cy.fixture("response/user-response").then(function(userResponse) {
      cy.route({
        url: "/api/users/login",
        method: "POST",
        status: 200,
        response: {
          user: userResponse
        }
      }).as("loginRoute");
    });

    cy.visit("http://18.139.223.164:4100/login");

    cy.fixture("user/user-01").then(function(user) {
      cy.get("input")
        .eq(0)
        .type(user.email);
      cy.get("input")
        .eq(1)
        .type(`${user.password}{enter}`);

      cy.wait("@loginRoute");

      cy.visit("http://18.139.223.164:4100/");

      cy.get("nav").should("have.contain", user.username);
      cy.get("nav").should("have.contain", "New Post");
      cy.get("nav").should("have.contain", "Setting");
    });
  });
});
