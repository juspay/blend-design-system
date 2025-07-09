import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen relative">
        <header className="fixed top-0 left-0 right-0 h-[var(--default-navbar-height)] z-10  bg-background flex items-center justify-center px-6">
          <nav className="max-w-8xl mx-auto w-full">
            <Link
              href="/"
              className="inline-flex text-lg font-bold items-center justify-center whitespace-nowrap transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3"
            >
              Blend Docs
            </Link>
          </nav>
        </header>

      <div className="pt-[var(--default-navbar-height)] w-screen h-screen px-2">
        {children}
      </div>
    </main>
  );
};

export default layout;
