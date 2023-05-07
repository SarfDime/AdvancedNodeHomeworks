import { Module } from '@nestjs/common'
import { PublisherService } from './publisher.service'
import { PublisherController } from './publisher.controller'
import { PublisherEntity } from './entities/publisher.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PublisherEntity])],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
