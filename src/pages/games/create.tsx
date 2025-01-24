import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Trpc from "../api/trpc/[trpc]";
import { useState } from "react";

const createGamePost = api.games.createGame.useMutation();

// States for form fields
const [status, setStatus] = useState(false);
const [id, setId] = useState("");
const [authorID, setAuthorID] = useState("");
const [createdAt, setCreatedAt] = useState(new Date());
const [updatedAt, setUpdatedAt] = useState(new Date());
const [title, setTitle] = useState("");
const [starRating, setStarRating] = useState(0);
const [message, setMessage] = useState("");

const UserAvatar = () => {
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await createGamePost.mutateAsync({
      status,
      id,
      authorID,
      createdAt,
      updatedAt,
      title,
      starRating,
    });

    setStatus(false);
    setId("");
    setAuthorID("");
    setCreatedAt(new Date());
    setUpdatedAt(new Date());
    setTitle("");
    setStarRating(0);
  } catch (e) {
    console.error(e);
  }
};

export default function gamesPage() {
  const { data } = api.games.getAll.useQuery();
  return (
    <div className="mt-8 space-y-6 bg-black sm:mx-auto sm:max-w-md ">
      <UserAvatar></UserAvatar>
      <form className="mb-0 border-spacing-1 space-y-6 sm:w-7">
        <input type="text" name="Game Title"></input>
        <input type="text" name="review"></input>
        <input type="number" name="stars" max={5}></input>
        <button type="submit" className="text-red-50">
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
}

/*    how to show all games {data?.map((game) => <div key={game.authorID}>{game.title}</div>)}
 */
