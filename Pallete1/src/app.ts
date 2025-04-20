import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes';
import commentRoutes from "./routes/comment.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});

export default app;