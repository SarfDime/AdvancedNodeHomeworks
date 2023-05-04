import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieees from 'cookie-parser'
import { HttpExceptionFilter } from './common/filter/exceptions/exceptions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(cookieees())
  await app.listen(3000)
}

bootstrap()
