describe("/register", function() {
  beforeEach(function() {
    // go to register page
    cy.visit("http://localhost:4100/register");
  });
  it("should register successfully", function() {
    // type in username input
    cy.fixture("user/user-01.json").then(function(user) {
      cy.get("[data-test=username]").type(user.username);

      cy.get("input")
        .eq(1)
        .type("test@mail.com");

      cy.get("input")
        .eq(2)
        .type("test{enter}");
    });
  });
});
