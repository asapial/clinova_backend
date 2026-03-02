import app from "./app";
// paths previously had an extra "app/" segment that doesn't exist in the
// project structure. all code lives directly under `src` (e.g. `src/config`)
// so we adjust the imports accordingly.
import { envVars } from "./config/env";
import { seedSuperAdmin } from "./utils/seed";

const bootstrap = async() => {
    try {
        await seedSuperAdmin();
        app.listen(envVars.PORT, () => {
            console.log(`Server is running on http://localhost:${envVars.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

bootstrap();