require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MongoDB = process.env.MongoDB;

mongoose
  .connect(MongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    if (err) {
      console.log('Unable to connect to Mongoose');
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}. `);
});