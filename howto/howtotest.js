const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

describe("howto router", () => {
  beforeEach(async () => {
    await db("howto").truncate();
    await db("user").truncate();
  });

  afterEach(async () => {
    await db("howto").truncate();
    await db("user").truncate();
  });
  describe("POST how to", () => {
    it("adds a howto to the database", async () => {
      // start of register and login
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      // console.log("heres the token:", res.body.token);
      // console.log("header", res.header);

      await request(server).post("/howto").set({ Authorization: token }).send({
        title: "test",
        category: "test",
        description: "test",
        user_id: 1,
      });

      let howto = await db("howto");
      expect(howto).toHaveLength(1);

      res = await request(server)
        .post("/login")
        .send({ username: "galo", password: "password" });

      token = res.body.token;

      // end of register and login

      res = await request(server).get("/howto").set({ Authorization: token });

      expect(res.status).toBe(200);
      // console.log('list of howtos', res.body)
    });
  });
  describe("GET howtos", () => {
    it("gets a list of howtos", async () => {
      // start of register, post and login
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      await request(server).post("/howto").set({ Authorization: token }).send({
        title: "test",
        category: "test",
        description: "test",
        user_id: 1,
      });

      res = await request(server)
        .post("/login")
        .send({ username: "galo", password: "password" });

      token = res.body.token;

      // end of register, post and login

      res = await request(server).get("/howto").set({ Authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.howto).toHaveLength(1);
    });
  });
  describe("PUT howtos", () => {
    it("should be able to change a howto", async () => {
      // start of register, post and login
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      await request(server).post("/howto").set({ Authorization: token }).send({
        title: "test",
        category: "test",
        description: "test",
        user_id: 1,
      });

      res = await request(server)
        .post("/login")
        .send({ username: "galo", password: "password" });

      token = res.body.token;

      // end of register, post and login

      res = await request(server)
        .put("/howto/1")
        .set({ Authorization: token })
        .send({
          title: "testing",
          category: "testing",
          description: "testing",
          user_id: 1,
        });

      expect(res.status).toBe(200);
      // console.log("heres the title", res.body);
      expect(res.body.message).toBe(
        "Howto with the id 1 was successfully changed"
      );
    });
    describe("DELETE howtos", () => {
      it("should delete a howto", async () => {
        // start of register, post and login
        let res = await request(server).post("/register").send({
          username: "galo",
          email: "galo@gmail.com",
          password: "password",
        });

        let token = res.body.token;

        await request(server)
          .post("/howto")
          .set({ Authorization: token })
          .send({
            title: "test",
            category: "test",
            description: "test",
            user_id: 1,
          });

        res = await request(server)
          .post("/login")
          .send({ username: "galo", password: "password" });

        token = res.body.token;

        // end of register, post and login

        res = await request(server)
          .delete("/howto/1")
          .set({ Authorization: token });

        expect(res.status).toBe(204);

        howtos = await db("howto");
        expect(howtos).toHaveLength(0);
      });
    });
  });
});
