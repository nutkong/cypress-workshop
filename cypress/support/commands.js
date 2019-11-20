Cypress.Commands.add("register", function() {
  cy.server();
  cy.route("POST", "/api/users", "fx:response/user-response").as(
    "registerRoute"
  );

  cy.visit("http://18.139.223.164:4100/register");

  cy.fixture("user/user-01").then(function(user) {
    cy.get("[data-test=username]").type(user.username);
    cy.get("[data-test=email]").type(user.email);
    cy.get("[data-test=password]").type(`${user.password}{enter}`);
  });

  cy.wait("@registerRoute", { timeout: 10000 });
});

Cypress.Commands.add("login", function() {
  cy.server();
  cy.route("POST", "/api/users/login", "fx:response/user-response").as(
    "loginRoute"
  );

  cy.visit("http://18.139.223.164:4100/login");

  cy.fixture("user/user-01").then(function(user) {
    cy.get("input")
      .eq(0)
      .type(user.email);
    cy.get("input")
      .eq(1)
      .type(`${user.password}{enter}`);
  });

  cy.wait("@loginRoute", { timeout: 10000 });
});

Cypress.Commands.add("writePost", function() {
  cy.visit("http://18.139.223.164:4100/editor");
  cy.route("POST", "/api/articles").as("articleRoute");

  cy.fixture("article/article-01").then(function(article) {
    cy.get("input")
      .eq(0)
      .type(article.title);

    cy.get("input")
      .eq(1)
      .type(article.description);

    cy.get("textarea")
      .eq(0)
      .type(article.content);

    cy.get("input")
      .eq(2)
      .type(`${article.tags.join("{enter}")}{enter}`);

    cy.get("form")
      .get("button")
      .click();

    cy.wait("@articleRoute", { timeout: 10000 });

    cy.location("pathname").should("match", /article/gi);
    cy.get("h1").contains(article.title);
  });
});
