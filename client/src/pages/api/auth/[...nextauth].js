import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../utils/auth";
import { connectToDB } from "../../../utils/db";
import jwt from "jsonwebtoken";

export default NextAuth({
  debug: true,
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDB();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("no user Found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect Password!");
        }

        return {
          email: user.email,
          name: user.fullname,
          image: user._id,
        };
      },
    }),
  ],
  // jwt: {
  //   secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSq",

  //   encode: async ({ secret, token, maxAge }) => {
  //     const jwtClaims = {
  //       name: token.name,
  //       email: token.email,
  //       userId: token.image,
  //     };
  //     const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
  //     return encodedToken;
  //   },
  //   decode: async ({ secret, token, maxAge }) => {
  //     const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
  //     return decodedToken;
  //   },
  // },
  // callbacks: {
  //   async session(session, user) {
  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     return token;
  //   },
  // },
});
