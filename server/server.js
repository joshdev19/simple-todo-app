require('dotenv').config();
const express = require('express');
const formData = require('express-form-data');
const cors = require('cors');

const todosRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;
const app = express();
app.listen( PORT , console.log(`Server is running at http://localhost:${PORT}`))

app.use(express.json());
app.use(formData.parse());
app.use(cors(
    {
        origin: ["*", "http://localhost:5173", "https://simple-todo-app-ts.netlify.app"]
    }
))

app.use('/api', todosRoutes);