import { hashPassword } from "../../../utils/auth";
import { connectToDB } from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const {
    email,
    password,
    fullname,
    photoUrl,
    status: userStatus,
    city,
    country,
  } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid Input",
    });
    return;
  }

  const dbClient = await connectToDB();
  const db = dbClient.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "Email is already exist" });
    dbClient.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    joinedAt: new Date(),
    fullname: fullname,
    photoUrl: photoUrl,
    city: city,
    country: country,
    status: userStatus,
  });

  res.status(201).json({ message: "Created User!" });
  dbClient.close();
}

export default handler;
