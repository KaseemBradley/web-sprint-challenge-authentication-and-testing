const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const kaseemInsert = {
  username: "kaseem",
  password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
};

const kaseem = {
  username: "kaseem",
  password: "1234",
};

const bradleyInsert = {
  username: "bradley",
  password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
};

const bradley = {
  usernmae: "bradley",
  password: "1234",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("server", () => {
  describe("logging in", () => {
    it("rejects on missing credentials", async () => {
      let res;
      res = await request(server).post("/api/auth/login").send({});
      expect(res.body.message).toMatch(/username and password required/i);

      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "kaseem" });
      expect(res.body.message).toMatch(/username and password required/i);

      res = await request(server)
        .post("/api/auth/login")
        .send({ password: "1234" });
      expect(res.body.message).toMatch(/username and password required/i);
    });
    it("fails to login if user is missing", async () => {
      let res;
      res = await request(server).post("/api/auth/login").send(kaseem);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});
