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
  friends:async (paremt:any,args:any,{prisma}:Context)=>{
    const friend = await prisma.friend.findMany({
      orderBy;[
        {
          created_at:"desc"
        }
      ]
    })
    return friend
  }
  
};
