import { SignedOut, SignOutButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import router from "next/router";

const handleLogout = async () => {
  console.log('LOGGED OUT')
    await router.push("/").catch(() => console.error("ERROR ERROR CAN'T NAVIGATE HOME"));
};

export default function NavBar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="" >
          <ul className="flex space-x-6 text-white">
            <li>
              <Link
                href="/home"
                className="text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/games/create"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Log Game
              </Link>
            </li>
            <li>
              <Link
                href="/games/log"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                View Gaming Log
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                TBD
              </Link>
            </li>
            <li>
              <SignOutButton>
                <button
                  className="block rounded px- py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </SignOutButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
