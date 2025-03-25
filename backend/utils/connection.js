import mongoose from "mongoose";

async function connectMongodb(url) {
    return mongoose.connect(url);
}

export default connectMongodb;