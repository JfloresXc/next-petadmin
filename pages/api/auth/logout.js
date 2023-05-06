import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    const { myToken } = req.cookies;
    if (!myToken) {
      return res.status(401).json({ isError: false, message: "Not logged in" });
    }

    const serialized = serialize("myToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    res.json({ isError: false, message: "Logout successfully" });
  } catch (error) {
    res.json({ isError: true, message: error.message });
  }
}
