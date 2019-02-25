module.exports = {
    PORT: process.env.PORT || 3005,
    DATABASE: process.env.MONGODB_URI || 'mongodb://localhost:27017/shop',  
    SECRET_TOKEN: 'token123', 
}