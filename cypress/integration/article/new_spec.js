describe("/editor", function() {
  beforeEach(function() {
    cy.register();
    cy.login();
  });

  it("should create feed successfully and redirect to aritcle page", function() {
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

      cy.wait("@articleRoute");

      cy.location("pathname").should("match", /article/gi);
      cy.get("h1").contains(article.title);
    });
  });

  it("should edit article successfully", function() {
    cy.server();
    cy.route("GET", "/api/articles/**").as("getRoute");
    cy.route("PUT", "/api/articles/**").as("editRoute");

    cy.writePost();

    cy.get("a")
      .last()
      .click();

    cy.wait("@getRoute");

    cy.get("input")
      .eq(0)
      .clear()
      .type("new title");

    cy.get("input")
      .eq(1)
      .clear()
      .type("new description");

    cy.get("input")
      .eq(2)
      .clear()
      .type("new content");

    cy.get("form")
      .get("button")
      .click();

    cy.wait("@editRoute")
      .its("status")
      .should("be.eq", 200);
  });

  it("should delete article successfully", function() {
    cy.server();
    cy.route("DELETE", "/api/articles/**").as("deleteRoute");
    cy.writePost();

    cy.get("button")
      .eq(0)
      .click();

    cy.wait("@deleteRoute")
      .its("status")
      .should("be.eq", 204);
  });
});
