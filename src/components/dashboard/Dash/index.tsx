import { SlugCreate } from "@prisma/client";
import Link from "next/link";



interface ChallengeProps {
  newaccount: SlugCreate;
}[]

export function Challenge({ newaccount }: ChallengeProps) {
  
  return (
    <>
      {newaccount?.slug}aa
    </>
  );
}
