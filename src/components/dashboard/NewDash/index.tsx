import { INewAccount } from "../../../@types/challenges.interface";
import { Challenge } from "../Dash";



interface ChallengesProps {
  title?: string;
  newaccount: INewAccount[];
}

export function Challenges({ newaccount }: ChallengesProps) {
  return (
    <div>
      <div>
        {newaccount.map((challenge) => (
          <Challenge key={challenge.id} newaccount={challenge} />
        ))}
      </div>
    </div>
  );
}
