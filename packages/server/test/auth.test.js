import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import User from "../models/User.js";

beforeAll(async () => {
  // 테스트 전에 테스트용 DB에 연결
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  // 테스트 후 DB 연결 종료
  await mongoose.connection.close();
});

beforeEach(async () => {
  // 각 테스트 전에 User 컬렉션 초기화
  await User.deleteMany({});
});

describe("Auth API Tests", () => {
  describe("POST /auth/signup", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/auth/signup").send({
        username: "testuser",
        password: "testpassword123",
        email: "test@example.com",
      });

      expect(res.status).toBe(201);
      expect(res.text).toBe("User created");
    });
  });

  describe("POST /auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      // 먼저 회원가입
      await request(app).post("/auth/signup").send({
        username: "testuser",
        password: "testpassword123",
        email: "test@example.com",
      });

      // 로그인 테스트
      const res = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "testpassword123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
