import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAllTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }
}
