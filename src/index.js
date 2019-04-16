const express = require('express');
const authMiddleware = require('./middlewares/AuthMiddleware');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/auth', require('./controllers/authController'));
app.use(authMiddleware);
app.use('/projects', require('./controllers/projectController'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
