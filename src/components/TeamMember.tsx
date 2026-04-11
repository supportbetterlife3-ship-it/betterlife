import React from 'react';
import Image from 'next/image';

interface TeamMemberProps {
    member: {
        name: string;
        role: string;
        photo: string;
    };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  const { name, role, photo } = member;
  return (
    <article className="h-full flex flex-col text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-500/30 dark:hover:border-brand-400/30 transition-all duration-300">
      <div className="relative w-full aspect-[4/5] flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800/50 group rounded-t-3xl flex items-center justify-center">
        <Image
          src={photo}
          alt={`${name}'s photo`}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="object-cover object-top rounded-t-3xl group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-1">
          {name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          {role}
        </p>
      </div>
    </article>
  );
};

export default TeamMember;