import { text, relationship, timestamp } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { stampy } from "../lib/stampy";

export const Blog = list({
  fields: {
    createdAt: timestamp({
      defaultValue: stampy(),
    }),
    title: text({ isRequired: true, isIndexed: true }),
    category: text({ isRequired: true, isIndexed: true }),
    imageUrl: text(),
    body: text({
      isRequired: true,
      ui: { displayMode: "textarea" },
    }),
    author: relationship({
      ref: "User.blogs",
      many: false,
    }),
    comments: relationship({
      ref: "Comment.author",
      many: true,
    }),
    stars: relationship({
      ref: "User.liked",
      many: true,
    }),
    bookmarks: relationship({
      ref: "User.bookmarked",
      many: true,
    }),
    image: relationship({
      ref: "BlogImage.blog",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
  },
});
