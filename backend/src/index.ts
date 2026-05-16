import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/error.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 인증 미적용 — 인프라 헬스체크 전용
app.get('/health', (req, res) => {
  res.json({
    data: { status: 'ok' },
    error: null,
    message: 'ok',
  });
});

app.use(errorHandler);

const PORT = parseInt(process.env.PORT ?? '3000', 10);

app.listen(PORT, () => {
  console.log(`[momente-backend] listening on :${PORT}`);
});
