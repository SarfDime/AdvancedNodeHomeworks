import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { OrderModule } from './order/orders.module'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, OrderModule, ProductsModule],
})
export class AppModule {}