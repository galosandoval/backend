const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

describe("steps router", () => {
  let token = "";

  beforeEach(() => db.seed.run());
  describe("POST steps", () => {
    it("should login", () => {
      return request(server)
        .post("/register")
        .send({
          username: "galo",
          email: "galo@gmail.com",
          password: "password",
        })
        .then((res) => {
          token = res.body.token;
          expect(res.status).toBe(201);
        });
    });
    it("should add a step", () => {
      return request(server)
        .post("/steps")
        .set({ authorization: token })
        .send({ howto_id: 2, description: "testing" })
        .then((res) => {
          // console.log(res.error);
          expect(res.status).toBe(201);
        });
    });
  });
  describe("GET steps", () => {
    it("gets a list of steps", async () => {
      // start of register, post and login
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      // end of register, post and login

      res = await request(server).get("/steps").set({ Authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.steps).toHaveLength(13);
    });
  });
  describe("PUT steps", () => {
    it("should login", () => {
      return request(server)
        .post("/register")
        .send({
          username: "galo",
          email: "galo@gmail.com",
          password: "password",
        })
        .then((res) => {
          token = res.body.token;
          expect(res.status).toBe(201);
        });
    });
    it("should change a step", () => {
      return request(server)
        .put("/steps/1")
        .set({ authorization: token })
        .send({
          howto_id: 1,
          description: "testing",
        })
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body.message).toBe('Step with the id 1 was successfully changed')
        })
    });
  });
  describe('DELETE steps', () => {
    it("should login", () => {
      return request(server)
        .post("/register")
        .send({
          username: "galo",
          email: "galo@gmail.com",
          password: "password",
        })
        .then((res) => {
          token = res.body.token;
          expect(res.status).toBe(201);
        });
    });
    it('should delete a step', () => {
      return request(server)
        .delete('/steps/1')
        .set({authorization: token})
        .then(res => {
          expect(res.status).toBe(204)
          expect(res.body).toHaveLength(0)
        })
    })
  })
});
