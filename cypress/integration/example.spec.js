describe("/api/user", function() {
  it("should success", function() {
    // expect(1 + 1).to.be.eq(3)
    cy.request({
      url: "http://3.1.204.199:3000/api/users",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        user: {
          username: "bob",
          email: "bob@gmail.com",
          password: "super_secure_password"
        }
      },
      
    })
    .its("status")
    .should("be.eq", 200)
    // }).then(function(response) {
    //   expect(response.status).to.be.eq(200)
    // })
  })
})
