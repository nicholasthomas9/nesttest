import ( Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from "@vendia/segverless-express";
import ( NestFactory } from '@nestjs/core';
import ( INestApplication } from '@nestjs/common';
import AppModule from './app.module';
import ( EventEmitter ) from 'events';
import ( LoggerService, LogLevel } from '@nestjs/common/services/logger.service';

EventEmitter.defaultMaxListeners=0;

let cachedServer: Handler;
process.on ('unhandledRejection', (reason) => {
console.error(reason);
});

process.on ('uncaughtException', (reason) => {
console.error(reason);
});

function getLogger(): LoggerService | LogLevel[] | false {
return process.env?.NESTJS_LOGGER === 'true' ? ['error', 'warn', 'log']: false;
}
function printRoutes (app: INestApplication) {
const server = app.getHttpServer0;
const router = server._events.request._router;
const availableRoutes: [] = router.stack
map ((layer) => {
if (layer.route) {
return{
route: {
path: layer.route?.path,
method: layer.route?.stack[0].method,
},
};
}
})
.filter( (item) => item !== undefined);
console.log (availableRoutes);
}

async function bootstrap(): Promise<Handler> {
if (!cachedServer) {
const logger = getLogger();
const nestApp = await NestFactory.create (AppModule, { logger });
await nestApp.init();

const expressApp = nestApp.getHttpAdapter().getInstance();
if (!!logger) {
printRoutes(nestApp);
}
cachedServer = serverlessExpress ({ app: expressApp});
}
return cachedServer;
}
export const handler: Handler = async (event: any, context: AudioContext, callback: Callback) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
