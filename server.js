const app = require('./app')
const mongoose = require('mongoose')

const DB_HOST = "mongodb+srv://Olena:bRJu57hIRP7NHXFC@cluster0.sezj9am.mongodb.net/db-projects?retryWrites=true&w=majority"

const { PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
.then(console.log("Database connection successful"))
.then(app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000")
}))
.catch(error => {
  console.log(error.message);
  process.exit(1);
});



