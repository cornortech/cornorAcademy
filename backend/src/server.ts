import app from "./app";
import { connectToDatabase } from "./libs/db";

const PORT = process.env.PORT || 4000;

async function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
        console.log(`📊 API Information: http://localhost:${PORT}/`);
    });

    try {
        await connectToDatabase();
        console.log(`✅ Database connected successfully`);
    } catch (err) {
        console.error("⚠️ Database connection failed:", err);
        console.log("📝 Note: Server is still running for API documentation and testing");
        console.log("🔧 APIs will return database errors until DB is connected");
    }
}

startServer();