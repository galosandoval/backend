const { expectCt } = require("helmet");
const request = require("supertest");
const server = require("../api/server");
const { insert } = require("../database/connection");
const db = require("../database/connection");

// beforeEach(async () => {
//   await db("howto").truncate();
//   await db("user").truncate();
// });

// afterEach(async () => {
//   await db("howto").truncate();
//   await db("user").truncate();
// });


describe("auth routes", () => {
  describe("POST /register", () => {
    it("should add a new user", () => {
      let user = db('user')
      expect(user)
    })
  })
})
