import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship, timestamp } from "@keystone-next/fields";
// import { permissions, rules } from '../access';
import { stampy } from "../lib/stampy";

export const User = list({
  // access: {
  //   create: () => true,
  //   read: rules.canManageUsers,
  //   update: rules.canManageUsers,
  //   // only people with the permission can delete themselves!
  //   // You can't delete yourself
  //   delete: permissions.canManageUsers,
  // },
  // ui: {
  //   // hide the backend UI from regular users
  //   hideCreate: (args) => !permissions.canManageUsers(args),
  //   hideDelete: (args) => !permissions.canManageUsers(args),
  // },
  fields: {
    joinedAt: timestamp({
      defaultValue: stampy(),
    }),
    fullname: text({ isRequired: true, isIndexed: true }),
    email: text({ isRequired: true, isUnique: true }),
    city: text(),
    country: text(),
    status: text(),
    photoUrl: text(),
    tiwtterLink: text(),
    githubLink: text(),
    linkedinLink: text(),
    password: password(),
    blogs: relationship({
      ref: "Blog.author",
      many: true,
    }),
    follows: relationship({ ref: "User.followers", many: true }),
    followers: relationship({ ref: "User.follows", many: true }),
    liked: relationship({
      ref: "Blog.stars",
      many: true,
    }),
    bookmarked: relationship({
      ref: "Blog.bookmarks",
      many: true,
    }),
    photo: relationship({
      ref: "UserPhoto.user",
      ui: {
        displayMode: "cards",
        cardFields: ["photo", "altText"],
        inlineCreate: { fields: ["photo", "altText"] },
        inlineEdit: { fields: ["photo", "altText"] },
      },
    }),
  },
});
