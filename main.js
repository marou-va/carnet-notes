"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: 'tonSecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
        methods: 'GET, POST,PUT, PATCH, DELETE',
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map