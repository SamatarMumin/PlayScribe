import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const CreateGamePost = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex">
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-16 w-16 rounded-full object-left-top"
      ></img>
    </div>
  );
};

export default function gamesPage() {
  return (
    <div className="mt-8 sm:mx-auto sm:max-w-md bg-black space-y-6 ">
      <CreateGamePost></CreateGamePost>
      <form className="mb-0 space-y-6 sm:w-7 border-spacing-1">
        <input type="text" name="Game Title"></input>
        <input type="text" name="review"></input>
        <input type="number" name="stars" max={5}></input>
        <button type="submit" className="text-red-50"> Submit</button>
      </form>
    </div>
  );
}
