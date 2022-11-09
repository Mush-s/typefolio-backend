import { Friend, Post, Prisma } from "@prisma/client";
import { Context } from "../index";

interface PostCreateArgs {
  title: string;
  content: string;
  date: string;
  color: string;
}
interface FriendCreateArgs {
  name: string;
  color: string;
}

interface PostUpArgs {
  title?: string;
  content?: string;
  date?: string;
  lengthId?: number;
  color?: string;
  done?: boolean;
}
interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post, never> | null;
}

interface FriendPayloadType {
  userErrors: {
    message: string;
  }[];
  friend: Friend | Prisma.Prisma__FriendClient<Friend, never> | null;
}

interface PostPayloadUpType {
  userErrors: {
    message: string;
  }[];
  post: PostUpArgs | Prisma.Prisma__PostClient<Post, never> | null;
}

export const Mutation = {
  postCreate: async (
    _: any,
    {  title, content, date, color }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !date || !color) {
      return {
        userErrors: [{ message: "you must provide" }],
        post: null,
      };
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        date,
        color,
      },
    });
    return {
      userErrors: [],
      post,
    };
  },
  postUpdate: async (
    _: any,
    { lengthId, title, content, color,done }: PostUpArgs,
    { prisma }: Context
  ): Promise<PostPayloadUpType> => {
    const existingPost = await prisma.post.findUnique({
      where: { length: lengthId },
    });
    if (!existingPost) {
      return {
        userErrors: [{ message: "need id" }],
        post: null,
      };
    }
    // if (!content || !title || !color || !done) {
    //   return {
    //     userErrors: [{ message: "need title or content" }],
    //     post: null,
    //   };
    // }

    let payloadToUpdate = {
      title,
      content,
      color,
      done
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
    if (!color) delete payloadToUpdate.color;
    if (!done) delete payloadToUpdate.done;

    return {
      userErrors: [],
      post: prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          length: lengthId,
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { lengthId }: { lengthId: number },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!lengthId) {
      return {
        userErrors: [{ message: "no Id" }],
        post: null,
      };
    }
    return {
      userErrors: [],
      post: prisma.post.delete({
        where: { length: lengthId },
      }),
    };
  },
  friendCreate: async (
    _: any,
    { name, color }: FriendCreateArgs,
    { prisma }: Context
  ): Promise<FriendPayloadType> => {
    if (!name && !color) {
      return {
        userErrors: [{ message: "you must provide" }],
        friend: null,
      };
    }
    const friend = await prisma.friend.create({
      data: {
        name,
        color,
      },
    });
    return {
      userErrors: [],
      friend,
    };
  },
  friendDelete: async (
    _: any,
    { id }: { id: number },
    { prisma }: Context
  ): Promise<FriendPayloadType> => {
    if (!id) {
      return {
        userErrors: [{ message: "no id" }],
        friend: null,
      };
    }
    return {
      userErrors: [],
      friend: prisma.friend.delete({
        where: { id: id },
      }),
    };
  },
};
