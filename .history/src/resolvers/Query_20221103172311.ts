import { Context } from "..";

export const Query = {
  posts: async (parent: any, args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          length: "asc",
        },
      ],
    });
    return posts;
  },

  friends: async (_: any, __: any, { prisma }: Context) => {
    const friends = await prisma.friend.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return friends;
  },
};

export const Friend = {
  posts: (parent: any, args: any, context: any) => {
    console.log(parent);
  },
};
