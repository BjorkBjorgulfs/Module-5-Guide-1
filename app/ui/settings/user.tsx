import {User} from '@/app/lib/definitions';

export default function UserOverview({ user }: { user: User }) {

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
