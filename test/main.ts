import ( Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from
"@vendia/segverless-express'i
import ( NestFactory } from *@nestjs/core':
import ( INestApplication } from * @nestjs/common' :
Import AppModule from './app.module' ;
import ( EventEmitter ) from 'events':
import ( LoggerService, LogLevel } from '@nestjs/common/services/logger.service':


EventEmitter.defaultMaxListeners=0;


let cachedServer: Handler:


process.on( 'unhandledRejection', (reason) => {
console.error(reason);
});
process.on( 'uncaughtException', (reason) => {
console.error(reason):
}):

function getLogger(): LoggerService | LogLevel[] | false {
  return process.env?.NESTJS_LOGGER === 'true' ? ['error', 'warn', 'log'] : false;
}
function printRoutes (app: INestApplication)
const server = app.getHttpServer0):
const router = server. _events. request._ router:
const availableRoutes: (1 a router. stack
.map( (layer) => (.
if (layer.route)
return {
route:{
path: layer. route?,path,
method: layer. route?.stack[0] .method,
},
};
}
})
.filter((item) => item != undefined);
console.log(availableRoutes
