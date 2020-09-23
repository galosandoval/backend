const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

beforeEach(async () => {
  await db("howto").truncate();
});

describe("howto router", () => {
  describe("POST how to", () => {
    it("adds a howto to the database", async () => {
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      console.log("heres the token:", res.body.token);
      console.log("header", res.header);

      await request(server).post("/howto").set({ Authorization: token }).send({
        title: "test",
        category: "test",
        description: "test",
        user_id: 1,
      });

      let howto = await db('howto')
      expect(howto).toHaveLength(1)

      res = await request(server)
        .post("/login")
        .send({ username: "galo", password: "password" });

      token = res.body.token;

      res = await request(server)
        .get("/howto")
        .set({ Authorization: token });

      expect(res.status).toBe(200);
      console.log('list of howtos', res.body)
      expect(res.body.howto).toHaveLength(1);
    });
  });
  describe("GET howtos", () => {
    it("gets a list of howtos", async () => {
      let res = await request(server).post;
    });
  });
});
