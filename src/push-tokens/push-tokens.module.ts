import { Module } from '@nestjs/common';
import { PushTokensService } from './push-tokens.service';
import { PushTokensController } from './push-tokens.controller';
import { PushToken, PushTokenSchema } from './schemas/push-token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PushTokensController],
  providers: [PushTokensService],
  imports: [
    MongooseModule.forFeature([{ name: PushToken.name, schema: PushTokenSchema }])
  ],
  exports: [PushTokensService]
})
export class PushTokensModule {}
