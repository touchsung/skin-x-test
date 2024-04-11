import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as posts from './posts.json';

interface PostData {
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

async function seed() {
  try {
    for (const postData of posts as PostData[]) {
      const {
        title,
        content,
        postedAt,
        postedBy: authorName,
        tags: tagNames,
      } = postData;

      // Find or create the author
      let author = await prisma.author.findFirst({
        where: { name: authorName },
      });

      if (!author) {
        author = await prisma.author.create({ data: { name: authorName } });
      }

      // Create the post
      await prisma.post.create({
        data: {
          title,
          content,
          postedAt: new Date(postedAt),
          postedBy: { connect: { id: author.id } },
          TagsOnPosts: {
            create: await Promise.all(
              tagNames.map(async (tagName) => {
                let tag = await prisma.tag.findFirst({
                  where: { name: { equals: tagName } },
                });
                if (!tag) {
                  tag = await prisma.tag.create({ data: { name: tagName } });
                }
                return { tag: { connect: { id: tag.id } } };
              }),
            ),
          },
        },
      });
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
