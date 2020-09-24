const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

describe("auth routes", () => {
  beforeEach(async () => {
    await db("user").truncate();
  });

  afterEach(async () => {
    await db("user").truncate();
  });
  describe("POST /register", () => {
    it("should add a new user", async () => {
      let user = await db("user");
      expect(user).toHaveLength(0);

      const res = await request(server)
        .post("/register")
        .send({ username: "test", password: "testing", email:"test"});

      user = await db("user");
      expect(user).toHaveLength(1);
      expect(res.status).toBe(201);
    });

    it("should give a token with the response", async () => {
      const res = await request(server)
        .post("/register")
        .send({ username: "test", password: "testing", email:"test"});

        expect(res.body.token).toBeDefined();
        expect(res.status).toBe(201);
      });
      
      it("should not create user if req does not include all fields", async () => {
        let user = await db("user");
        expect(user).toHaveLength(0);
        
        const res = await request(server)
        .post("/register")
        .send({ username: "galo" });
        
        // console.log('auth res.body', res.body)
      expect(res.body.message).toMatch(/please provide your email, username, and password/i);
      expect(res.status).toBe(400);

      user = await db("user");
      expect(user).toHaveLength(0);
    });
  });
});
