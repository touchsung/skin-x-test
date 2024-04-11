import { Controller, Get, Res, HttpStatus, Req, Param } from '@nestjs/common';
import { Request, Response } from 'express';

import { PostService } from './post.service';
import { PostDTO } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';

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

  @Get()
  async getAllPosts(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const { skip, take, tag, title, orderBy, cursor } =
        this.extractQueryParams(req);

      const posts: PostDTO[] = await this.postService.getAllPosts({
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
          ].filter(Boolean), // Remove undefined values
        },
      });
      res.status(HttpStatus.OK).json({ data: posts });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        function: 'getAllPosts',
        message: 'Error fetching posts',
      });
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostDTO> {
    return this.postService.getPostDetail({ id: Number(id) });
  }
}
