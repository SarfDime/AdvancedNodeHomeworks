import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [OrderModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
