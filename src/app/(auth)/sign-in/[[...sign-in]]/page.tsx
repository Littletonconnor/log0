import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* TODO make this a legit sign-in page. For now we'll just allow easy navigation to home */}
      <Button asChild>
        <Link href="/home">
          <span className="text-2xl">Sign in</span>
        </Link>
      </Button>
    </div>
  );
}
