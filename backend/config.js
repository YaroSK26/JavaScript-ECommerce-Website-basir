/* eslint-disable import/no-extraneous-dependencies */
import dotenv from "dotenv";

dotenv.config()

export default {
    MONGODB_URL: process.env.MONGODB_URL,
}