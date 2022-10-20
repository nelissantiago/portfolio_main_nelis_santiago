import { Newaccount } from "@prisma/client";
import Link from "next/link";



interface ChallengeProps {
  newaccount: Newaccount;
}[]

export function Challenge({ newaccount }: ChallengeProps) {
  
  return (
    <>
      {newaccount?.slug}aa
    </>
  );
}
