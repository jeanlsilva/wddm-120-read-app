import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Star } from './entities/star.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Star])],
  controllers: [StarController],
  providers: [StarService],
})
export class StarModule {}
