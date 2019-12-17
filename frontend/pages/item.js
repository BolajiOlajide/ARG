import SingleItem from '../components/SingleItem';


export default function Item({ query }) {
  return <SingleItem id={query.id} />;
}
