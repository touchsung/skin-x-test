import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagsService } from './tags.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }
}
