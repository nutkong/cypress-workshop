describe("/article/[id_slug]", function() {
  it("should edit successfully", function() {
    // start login
    cy.login("adam@gmail.com", "password");
    // end login

    // test create new article
    cy.visit("http://18.139.223.164:4100/editor");
    cy.get("input")
      .eq(0)
      .type("test");
    cy.get("input")
      .eq(1)
      .type("test");
    cy.get("textarea")
      .eq(0)
      .type("test");
    cy.get("input")
      .eq(2)
      .type("test{enter}");
    cy.get("form")
      .get("button")
      .click();
    // end create new article
    cy.server();
    cy.route("/api/articles/*").as("articleApi");
    cy.wait("@articleApi");

    cy.get("a")
      .contains("Edit Article", { timeout: 15000 })
      .click();

    cy.get("input")
      .eq(0)
      .clear()
      .type("new title");

    cy.get("form")
      .get("button")
      .click();
  });
});
