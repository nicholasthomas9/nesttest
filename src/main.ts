import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from '../test/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        }),
    );
    
    const port = 5000;
    await app.listen(port, () => {
        console.log(`Application started at localhost:${port} 🚀`);
    });
}
bootstrap();
