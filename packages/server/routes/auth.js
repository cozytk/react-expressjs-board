import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 회원 가입 엔드포인트
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body; // 요청에서 사용자명, 비밀번호, 이메일을 추출
    const user = new User({ username, password, email }); // 새로운 사용자 객체 생성
    await user.save(); // 사용자 정보를 데이터베이스에 저장
    res.status(201).send("User created"); // 성공 시 201 상태 코드와 메시지 전송
  } catch (error) {
    res.status(400).send(error.message); // 오류 발생 시 400 상태 코드와 오류 메시지 전송
  }
});

// 로그인 엔드포인트
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // 요청에서 사용자명과 비밀번호를 추출
    const user = await User.findOne({ username }); // 데이터베이스에서 사용자명으로 사용자 검색
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials"); // 사용자 없거나 비밀번호가 일치하지 않으면 401 상태 코드 전송
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    }); // JWT 토큰 생성 (1시간 유효)
    res.status(200).json({ token }); // 성공 시 200 상태 코드와 토큰 전송
  } catch (error) {
    res.status(400).send(error.message); // 오류 발생 시 400 상태 코드와 오류 메시지 전송
  }
});

export default router;
