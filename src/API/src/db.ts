import mongoose from "mongoose"

const tryConnectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/travel")
    } catch(error) {
        throw error
    }
}

export default tryConnectDB