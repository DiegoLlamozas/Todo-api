const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { router: usersRoutes } = require('./src/accounts/routes/users');
const { router: tasksRoutes } = require('./src/tasks/routes/tasks');
const sequelize = require('./src/config/db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

// Database synchronization
sequelize.sync()
  .then(() => {
    console.log('Database is synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start the server
const PORT = process.env.PORT || 80; // Use environment variable if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


