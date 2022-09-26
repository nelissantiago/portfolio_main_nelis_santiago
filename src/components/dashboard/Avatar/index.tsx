/* eslint-disable @next/next/no-html-link-for-pages */
import { signIn, signOut, useSession } from "next-auth/react";

export function Avatar() {
  const { data, status } = useSession();
  return (
    <>
          <main>
            {status === "authenticated" ? (
                <>
                <a href="/account/dashboard">Dashboard</a>
                </>
            ) : (
                <button onClick={() => signIn("github")}>Fazer Login</button>
            )}
        </main>
    </>     
  );
}
