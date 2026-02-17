import app from "./app";
import { envVar } from "./config/env";
import { prisma } from "./lib/prisma";




async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");

        app.listen(envVar.PORT, () => {
            console.log(`Server is running on http://localhost:${envVar.PORT}`);
        });
    } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();