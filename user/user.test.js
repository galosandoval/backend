const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");
const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

describe("user router", () => {
  beforeEach(() => db.seed.run());
  describe("GET users", () => {
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
    it("should show a list of users", () => {
      return request(server)
        .get("/user")
        .set({ authorization: token })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.users).toHaveLength(2);
        });
    });
  });
  describe("GET users howtos", () => {
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
    it("should list how many howtos a user has", () => {
      return request(server)
        .get("/user/1/howto")
        .set({ authorization: token })
        .then((res) => {
          console.log("this is the res.body for userHowto", res.body);
          expect(res.body.userHowto).toBe();
        });
    });
  });
  describe("PUT users", () => {
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
    it("should change a users info", () => {
      return request(server)
        .put("/user/1")
        .set({ authorization: token })
        .send({
          username: "gmoney",
          email: "gmoney@gmail.com",
          password: "password",
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe(
            "User with the id 1 was successfully changed"
          );
        });
    });
  });
  describe("DELETE user", () => {
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
    it("should delete a user", () => {
      return request(server)
        .delete("/user/1")
        .set({ authorization: token })
        .then((res) => {
          expect(res.status).toBe(204);
          console.log("this is the res.body for DELETE", res.body);
          expect(res.body);
        });
    });
  });
});
