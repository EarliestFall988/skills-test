import type { NextPage } from "next";
import { MagnifyingGlassIcon, QueueListIcon } from "@heroicons/react/24/solid";
import type { FC, ReactNode } from "react";
import Link from "next/link";

const HomeCardComponent: FC<{
  title: string;
  description: string;
  children: ReactNode;
  route?: string;
}> = ({ title, description, children, route }) => {
  return (
    <div className="max-w-[20em]">
      <Link
        href={route ?? "/#"}
        className="flex items-center justify-center gap-3 rounded border border-zinc-600 bg-zinc-700 p-5 transition duration-200 hover:scale-105 hover:bg-sky-800 hover:border-sky-600"
      >
        {children}
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-zinc-200">{description}</p>
        </div>
      </Link>
    </div>
  );
};

const homePage: NextPage = () => {
  return (
    <main className="h-20 min-h-[100vh] w-full bg-zinc-900 text-zinc-200">
      <div className="bg-kscapitol h-[30vh] w-full bg-zinc-800 bg-cover bg-center p-10">
        <h1 className="text-[4rem] font-medium text-sky-200">Home</h1>
      </div>

      <div className="flex w-full gap-3 p-10">
        <HomeCardComponent
          title="Search Applicants"
          description="Need to start an exam? Start Here!"
          route="/search"
        >
          <MagnifyingGlassIcon className="h-10" />
        </HomeCardComponent>
        <HomeCardComponent
          title="Reporting"
          description="Print out you reports"
          route="/reports"
        >
          <QueueListIcon className="h-10" />
        </HomeCardComponent>
      </div>
    </main>
  );
};

export default homePage;
