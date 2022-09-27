import Link from "next/link";
import { INewAccount } from "../../../@types/interfaces";



interface ChallengeProps {
  newaccount: INewAccount;
}

export function Challenge({ newaccount }: ChallengeProps) {
  
  return (
    <Link href={`/account/${newaccount.slug}`} passHref>
      <div>
        <header>
          <h2 >
            hdad
          </h2>
          <br />
        </header>
      </div>
    </Link>
  );
}
