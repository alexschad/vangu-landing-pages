"use client";
// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return <button onClick={() => signIn("google")}>sign in with gooogle</button>;
}
