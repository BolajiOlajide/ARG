import Items from '../components/Items';


export default function({ query }) {
  return <Items page={parseFloat(query.page, 10) || 1} />;
}
