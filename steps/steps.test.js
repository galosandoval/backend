const request = require("supertest");
const server = require("../api/server");
const db = require("../database/connection");

describe("steps router", () => {
  beforeEach(async () => {
    await db("steps").truncate();
    await db("user").truncate();
  });

  afterEach(async () => {
    await db("steps").truncate();
    await db("user").truncate();
  });
  describe("POST steps", () => {
    it("should post a step", async () => {
      // start of register and login
      let res = await request(server).post("/register").send({
        username: "galo",
        email: "galo@gmail.com",
        password: "password",
      });

      let token = res.body.token;

      res = await request(server)
        .post("/login")
        .send({ username: "galo", password: "password" });

      token = res.body.token;

      // end of register and login

      res = await request(server)
        .post("/steps")
        .set({ Authorization: token })
        .send({ howto_id: 1, description: "test" });
      expect(res.status).toBe(200);
      // console.log('list of steps', res.body)
    });
  });
  // describe("GET steps", () => {
  //   it("gets a list of steps", async () => {
  //     // start of register, post and login
  //     let res = await request(server).post("/register").send({
  //       username: "galo",
  //       email: "galo@gmail.com",
  //       password: "password",
  //     });

  //     let token = res.body.token;

  //     await request(server).post("/steps").set({ Authorization: token }).send({
  //       title: "test",
  //       category: "test",
  //       description: "test",
  //       user_id: 1,
  //     });

  //     res = await request(server)
  //       .post("/login")
  //       .send({ username: "galo", password: "password" });

  //     token = res.body.token;

  //     // end of register, post and login

  //     res = await request(server).get("/steps").set({ Authorization: token });
  //     expect(res.status).toBe(200);
  //     expect(res.body.steps).toHaveLength(1);
  //   });
  // });
  // describe("PUT stepss", () => {
  //   it("should be able to change a steps", async () => {
  //     // start of register, post and login
  //     let res = await request(server).post("/register").send({
  //       username: "galo",
  //       email: "galo@gmail.com",
  //       password: "password",
  //     });

  //     let token = res.body.token;

  //     await request(server).post("/steps").set({ Authorization: token }).send({
  //       title: "test",
  //       category: "test",
  //       description: "test",
  //       user_id: 1,
  //     });

  //     res = await request(server)
  //       .post("/login")
  //       .send({ username: "galo", password: "password" });

  //     token = res.body.token;

  //     // end of register, post and login

  //     res = await request(server)
  //       .put("/steps/1")
  //       .set({ Authorization: token })
  //       .send({
  //         title: "testing",
  //         category: "testing",
  //         description: "testing",
  //         user_id: 1,
  //       });

  //     expect(res.status).toBe(200);
  //     // console.log("heres the title", res.body);
  //     expect(res.body.message).toBe(
  //       "steps with the id 1 was successfully changed"
  //     );
  //   });
  //   describe("DELETE stepss", () => {
  //     it("should delete a steps", async () => {
  //       // start of register, post and login
  //       let res = await request(server).post("/register").send({
  //         username: "galo",
  //         email: "galo@gmail.com",
  //         password: "password",
  //       });

  //       let token = res.body.token;

  //       await request(server)
  //         .post("/steps")
  //         .set({ Authorization: token })
  //         .send({
  //           title: "test",
  //           category: "test",
  //           description: "test",
  //           user_id: 1,
  //         });

  //       res = await request(server)
  //         .post("/login")
  //         .send({ username: "galo", password: "password" });

  //       token = res.body.token;

  //       // end of register, post and login

  //       res = await request(server)
  //         .delete("/steps/1")
  //         .set({ Authorization: token });

  //       expect(res.status).toBe(204);

  //       stepss = await db("steps");
  //       expect(stepss).toHaveLength(0);
  //     });
  //   });
  // });
});
