import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductsController } from './products/products.controller';
import { ProductModule } from './products/products.module';

@Module({
  imports: [OrderModule, ProductModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
