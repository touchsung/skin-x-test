import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostDTO } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostDTO[]> {
    const { skip, take, where, orderBy, cursor } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy,
      select: {
        id: true,
        title: true,
        postedAt: true,
        postedBy: {
          select: {
            name: true,
          },
        },
        TagsOnPosts: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getPostDetail(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<PostDTO | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      select: {
        id: true,
        title: true,
        content: true,
        postedAt: true,
        postedBy: {
          select: {
            name: true,
          },
        },
        TagsOnPosts: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
