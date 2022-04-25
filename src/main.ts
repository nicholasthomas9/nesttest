import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { AppModule } from "../test/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  const port = 5000;
  await app.listen(port, () => {
    console.log(`Application started at localhost:${port} 🚀`);
  });
}
bootstrap();
