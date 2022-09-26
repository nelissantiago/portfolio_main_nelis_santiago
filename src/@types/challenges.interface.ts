import { Newaccount, Tag  } from "@prisma/client";

export type ITag = Tag;

export type INewAccount = Newaccount & {
  tags: ITag[];
};
