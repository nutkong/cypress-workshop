Cypress.Commands.add("login", function(username = "defailt-user", password = "default-pass") {
  cy.visit("http://18.139.223.164:4100/login");

  cy.fixture("user/adam.json").then(function(user) {
    cy.get("[data-test=email]")
      .clear()
      .type(user.email);
    cy.get("[data-test=password]")
      .clear()
      .type(user.password + "{enter}");
    cy.location("pathname").should("be.eq", "/");
  });
});
