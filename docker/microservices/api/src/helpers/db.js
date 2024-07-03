const mongoose = require('mongoose');
const { db } = require('../configuration');

//mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
module.exports.connectDB = () => {
    mongoose.connect(db, { useNewUrlParser: true });
    //if we don't give {useNewUrlParser: true} it will give error that current string url parser is deprecated, and will be removed in future version.
    return mongoose.connection;
};
