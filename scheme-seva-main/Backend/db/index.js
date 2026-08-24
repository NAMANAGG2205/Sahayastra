import { initializeUserDb } from "./userDb.js";

const connectDB = async () => {
    try {
        await initializeUserDb();
        console.log("Excel Database initialized...");
    } catch (error) {
        console.log("Error initializing Excel Database", error);
    }
};

export default connectDB;