import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';

import { PostService } from './post.service';
import { PostDTO } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  private extractQueryParams(req: Request) {
    const skip: number = req.query.skip ? Number(req.query.skip) : undefined;
    const take: number = req.query.take ? Number(req.query.take) : 10;
    const tag: string = req.query.tag ? String(req.query.tag) : undefined;
    const title: string = req.query.title ? String(req.query.title) : undefined;
    const orderByParam: string = req.query.orderByParam
      ? String(req.query.orderByParam)
      : 'id';
    const sortBy: string = req.query.sortBy ? String(req.query.sortBy) : 'asc';

    const lastCursor: string = req.query.lastCursor
      ? String(req.query.lastCursor)
      : undefined;

    let cursor: Prisma.PostWhereUniqueInput | undefined;
    let orderBy: Prisma.PostOrderByWithRelationInput | undefined;

    if (orderByParam) {
      orderBy = { [orderByParam]: sortBy as 'asc' | 'desc' };
    }

    if (lastCursor) {
      cursor = { id: Number(lastCursor) };
    }
    return { skip, take, tag, title, orderBy, cursor };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllPosts(@Req() req: Request): Promise<PostDTO[]> {
    const { skip, take, tag, title, orderBy, cursor } =
      this.extractQueryParams(req);

    return this.postService.getAllPosts({
      skip,
      take,
      orderBy,
      cursor,
      where: {
        AND: [
          tag
            ? {
                TagsOnPosts: {
                  some: {
                    tag: {
                      name: tag,
                    },
                  },
                },
              }
            : undefined,
          title ? { title: { contains: title } } : undefined,
        ].filter(Boolean),
      },
    });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostDTO> {
    return this.postService.getPostDetail({ id: Number(id) });
  }
}
