import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { UserPhoto } from "./schemas/UserPhoto";
import { Blog } from "./schemas/Blog";
import { BlogImage } from "./schemas/BlogImage";
import { Comment } from "./schemas/Comment";
// import { permissionsList } from './schemas/fields';
// import { Role } from './schemas/Role';
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations";

function check(name: string) {}

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-little-astro-blog";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["fullname", "email", "password"],

    // TODO: Add in inital roles here
  },
  // passwordResetLink: {
  //   async sendToken(args) {
  //     // send the email
  //     await sendPasswordResetEmail(args.token, args.identity);
  //   },
  // },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // async onConnect(keystone) {
      //   console.log('Connected to the database!');
      //   if (process.argv.includes('--seed-data')) {
      //     await insertSeedData(keystone);
      //   }
      // },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Blog,
      Comment,
      UserPhoto,
      BlogImage,
      // Role,
    }),
    // extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email`,
      // User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
