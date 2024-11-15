import express from "express"; // Express 모듈을 가져옵니다.
import mongoose from "mongoose"; // Mongoose 모듈을 가져옵니다.
import authRoutes from "./routes/auth.js"; // 인증 관련 라우트를 가져옵니다.

const app = express(); // Express 애플리케이션을 생성합니다.
const port = 3001; // 서버가 실행될 포트를 설정합니다.

mongoose.connect(
  "mongodb+srv://brandon4038:Z69Y4IeV2vqx27c0@cluster0.hgrrm.mongodb.net/board",
  {
    useNewUrlParser: true, // MongoDB 연결 시 새로운 URL 파서 사용
    useUnifiedTopology: true, // MongoDB의 새로운 통합 토폴로지 엔진 사용
  }
); // MongoDB 데이터베이스에 연결합니다.

app.use(express.json()); // JSON 형식의 요청 본문을 파싱하도록 설정합니다.
app.use("/auth", authRoutes); // "/auth" 경로로 들어오는 요청은 authRoutes에서 처리합니다.

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // 서버가 지정된 포트에서 실행 중임을 콘솔에 출력합니다.
});
