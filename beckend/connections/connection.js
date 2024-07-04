const mongoose = require('mongoose');

const ConnectionToDatabase = (url) => {
  return mongoose.connect(url);
}
 
module.exports = {ConnectionToDatabase};