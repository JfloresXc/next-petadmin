import { serialize } from "cookie";
import { API_URL_SERVER_BACKEND } from "settings";

export default async function handler(req, res) {
  const { body } = req;
  const { email, password } = body;

  try {
    const url = `${API_URL_SERVER_BACKEND}/auth/signin`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    const { token, name = "" } = data;

    if (token) {
      const serialized = serialize("myToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
    }

    res.json({ isError: Boolean(name), ...data });
  } catch (error) {
    res.json({ isError: true, message: error.message });
  }
}
