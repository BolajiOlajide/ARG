import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';

export default function Sell() {
  return (<PleaseSignIn>
    <CreateItem />
  </PleaseSignIn>);
}
