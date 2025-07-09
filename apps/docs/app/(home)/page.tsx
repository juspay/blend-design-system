"use client";
import { Button } from "blend-v1";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="flex flex-1 flex-col justify-center text-center max-w-md mx-auto">
      <Button
        text="Check out Blenc Docs"
        onClick={() => router.push("/docs")}
      />
    </main>
  );
}
