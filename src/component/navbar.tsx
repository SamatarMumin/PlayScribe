import { SignOutButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="border-gray-200 bg-black dark:bg-gray-900">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col border p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900">
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/games/create"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Log Game
              </a>
            </li>
            <li>
              <a
                href="/games/log"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                View Gaming Log
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                TBD
              </a>
            </li>
            <li>
              <SignOutButton>
                <button 
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
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
