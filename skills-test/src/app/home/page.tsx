import type { NextPage } from "next";
import { Cog6ToothIcon, MagnifyingGlassIcon, QueueListIcon } from "@heroicons/react/24/solid";
import type { FC, ReactNode } from "react";
import Link from "next/link";

const HomeCardComponent: FC<{
  title: string;
  description: string;
  children: ReactNode;
  route?: string;
}> = ({ title, description, children, route }) => {
  return (
    <Link
      href={route ?? "/#"}
      className="flex h-24 w-[20em] items-center justify-start gap-3 rounded border border-zinc-700 bg-zinc-800 p-3 transition duration-200 hover:scale-105 hover:border-blue-700 hover:bg-blue-800"
    >
      {children}
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-zinc-200">{description}</p>
      </div>
    </Link>
  );
};

const homePage: NextPage = () => {
  return (
    <main className="h-20 min-h-[100vh] w-full bg-zinc-900 text-zinc-200">
      <div className="bg-kscapitol animate-appear h-[20vh] w-full bg-zinc-800 bg-cover bg-center p-10 md:h-[35vh] lg:h-[50vh]">
        <h1 className="text-[2.5rem] animate-appearLong font-medium text-sky-200 md:text-[4rem]">
          Home
        </h1>
      </div>

      <div className="flex w-full flex-wrap items-stretch gap-3 p-10 animate-appear">
        <HomeCardComponent
          title="Search Applicants"
          description="Need to start an exam? Start Here!"
          route="/search"
        >
          <MagnifyingGlassIcon className="h-14 w-14" />
        </HomeCardComponent>
        <HomeCardComponent
          title="Reporting"
          description="Export or Print out your reports for exams"
          route="/reports"
        >
          <QueueListIcon className="h-14 w-14" />
        </HomeCardComponent>
        <HomeCardComponent
          title="Settings"
          description="Change accessibility settings, or how the app functions"
          route="/settings"
        >
          <Cog6ToothIcon className="h-14 w-14" />
        </HomeCardComponent>
      </div>
    </main>
  );
};

export default homePage;
