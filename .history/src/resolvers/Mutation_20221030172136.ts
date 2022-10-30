import { Friend, Post, Prisma } from "@prisma/client";
import { Context } from "../index";

interface PostCreateArgs {
  length: number;
  title: string;
  content: string;
  date: string;
}
interface FriendCreateArgs {
  name: string;
  relation: string;
}

interface PostUpArgs {
  title?: string;
  content?: string;
  date?: string;
  lengthId?: number;
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
  friend: Friend | null;
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
    { length, title, content, date }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !length || !date) {
      return {
        userErrors: [{ message: "you must provide" }],
        post: null,
      };
    }
    const post = await prisma.post.create({
      data: {
        length,
        title,
        content,
        date,
      },
    });
    return {
      userErrors: [],
      post,
    };
  },
  postUpdate: async (
    _: any,
    { lengthId, title, content, date }: PostUpArgs,
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
    if (!content && !title) {
      return {
        userErrors: [{ message: "need title or content" }],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
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
    { name, relation }: FriendCreateArgs,
    { prisma }: Context
  ): Promise<FriendPayloadType> => {
    if (!name && !relation) {
      return {
        userErrors: [{ message: "you must provide" }],
        friend: null,
      };
    }
    const friend = await prisma.friend.create({
      data: {
        name,
        relation,
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
    { prisma }: Content
  ): Promise<FriendPayloadType> => {
    const friend = await prisma.friend.delete({
      friend: {
        where: id,
      },
    });

    return { userErrors: [], friend: null };
  },
};
