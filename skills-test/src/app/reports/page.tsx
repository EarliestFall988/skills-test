"use client";


import type { NextPage } from "next";
import { PageHeaderComponent } from "../_components/page-header";


const SearchPage: NextPage = () => {

  return (
    <main className="min-h-[100vh] bg-zinc-900 text-white">
      <PageHeaderComponent title="Reports"/>
    </main>
  );
};

export default SearchPage;
