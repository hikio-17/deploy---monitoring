/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./app/models');

const { errorHandler } = require('./app/middleware/errorHandler');

const app = express();

require('dotenv').config();
/** MIDDLEWARE */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ROUTE */
// app.use('/', (req, res) => {
//   res.send('Welcome to Monitoring Air API');
// });

const userRoutes = require('./app/routes/userRoute');
const regionRoutes = require('./app/routes/regionRoute');
const authRoutes = require('./app/routes/authRoute');
const deviceRoutes = require('./app/routes/deviceRoute');
const cloudinaryRoutes = require('./app/routes/cloudinaryRoute');
const orderRoutes = require('./app/routes/orderRoute');
const runSeeders = require('./seeders');

/** MAIN ROUTE */
app.use('/api', userRoutes);
app.use('/api', regionRoutes);
app.use('/api', authRoutes);
app.use('/api', deviceRoutes);
app.use('/api', orderRoutes);
app.use('/api', cloudinaryRoutes);

/** ENDPOINT SEEDER */
app.use('/api/seeders', (req, res) => {
  runSeeders();

  res.status(200).json({
    status: 'success',
    message: 'Sedders run successfully',
  });
});

/** ROUTER HANDLER ERROR */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
