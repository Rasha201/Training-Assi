const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
