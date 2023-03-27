import HeaderLink from "@/components/HeaderLink";
import {
  ArrowForwardIosRounded,
  BusinessCenter,
  Explore,
  Group,
  OndemandVideo,
} from "@mui/icons-material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { getProviders, signIn } from "next-auth/react";

const home = ({providers}:any): JSX.Element => {
  
  return (
    <div className="space-y-10 relative">
      <header className="flex items-center justify-around py-4">
        <div className="relative w-36 h-10">
          <Image
            objectFit="contain"
            layout="fill"
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
            alt=""
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink text="Discover" Icon={Explore} />
            <HeaderLink text="People" Icon={Group} />
            <HeaderLink text="Learning" Icon={OndemandVideo} />
            <HeaderLink text="Jobs" Icon={BusinessCenter} />
          </div>
          {
              Object.values(providers).map((provider:any) => (
                <div key={provider.name} className="pl-5">
                    <button
                        className="text-blue-700 rounded-full border-blue-700 border font-semibold px-5 py-1.5 transition-all hover:border-2"
                        onClick={()=> signIn(provider.id, {callbackUrl: "/"})}
                    >
                    Sign in
                    </button>
                </div>
              ))
          }
        </div>
      </header>
      <main className="flex flex-col lg:flex-row items-center mx-auto max-w-screen-lg">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you konw</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative w-80 h-80 xl:w-[650px] xl:h-[650px]">
          <Image priority layout="fill" src="/b.svg" alt="" />
        </div>
      </main>
    </div>
  );
};

export default home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  
  return {
    props: {
      providers,
    },
  };
};
