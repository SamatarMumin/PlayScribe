import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import NavBar from "~/component/navbar";


export default function homePage() {
  return (
    <div className="">
      <NavBar></NavBar>
    </div>
  );
}
