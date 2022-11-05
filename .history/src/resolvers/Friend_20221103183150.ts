import { Context } from "..";

export const Friends = {
  posts: async (parent: any, args: any, { prisma }: Context) => {
    const friendColor = parent.color;
    const friend = await prisma.post.findMany({
      where: { color: friendColor },
    });
    return friend;
  },
};
