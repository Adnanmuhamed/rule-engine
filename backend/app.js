const express = require('express');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();
const cors=require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



connectDB();


app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});