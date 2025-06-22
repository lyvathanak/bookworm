import { Controller, Post, Logger } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  private readonly logger = new Logger(SeederController.name);

  constructor(private readonly seederService: SeederService) {}

  @Post('run')
  async runSeed() {
    this.logger.warn('MANUAL SEED ENDPOINT TRIGGERED');
    return this.seederService.seed();
  }
}