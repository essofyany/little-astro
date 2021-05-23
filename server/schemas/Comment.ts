import { list } from "@keystone-next/keystone/schema";
import { text, relationship, timestamp } from "@keystone-next/fields";
import { stampy } from "../lib/stampy";

export const Comment = list({
  fields: {
    author: relationship({
      ref: "Blog.comments",
    }),
    content: text(),
    createdAt: timestamp({
      defaultValue: stampy(),
    }),
  },
});
