import Reset from '../components/Reset';

export default function ResetPassword({ query }) {
  return <Reset token={query.token} />;
}
