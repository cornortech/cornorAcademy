import app from "./app";
import { connectToDatabase } from "./libs/db";

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        await connectToDatabase();
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("⚠️ Failed to connect to database:", err);
        console.log("🚀 Starting server without database for API testing...");
    }
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
        console.log(`🔍 Test your APIs using Swagger UI!`);
    });
}

startServer();