import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";


const CreateGamePost = () => {
  const {user} = useUser();
  if (!user) return null;
  
  return (<div className="flex">
    <img src={user.profileImageUrl} alt="Profile Image" className="object-left-top h-16 w-16 rounded-full"></img>
  </div>);
  
}

export default function gamesPage() {
    return ( <div>
      <CreateGamePost></CreateGamePost>
      <form className="flex border-spacing-8">
        <input type="text" name="Game Title"></input>
        <input></input>
        <button type="submit"> Submit</button>
      </form>
      
    </div>);
  }
  