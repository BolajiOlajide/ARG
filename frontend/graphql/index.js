import gql from 'graphql-tag';


export const ALL_ITEMS_QUERY = gql`
query ALL_ITEMS_QUERY {
  items {
    id
    title
    description
    price
    image
    largeImage
  }
}
`;

export const CREATE_ITEM_MUTATION = gql`
mutation CREATE_ITEM_MUTATION(
  $title: String!
  $description: String!
  $price: Int!
  $image: String
  $largeImage: String
) {
  createItem(
    title: $title
    description: $description
    price: $price
    image: $image
    largeImage: $largeImage
  ) {
    id
    title
    description
    price
    image
    largeImage
  }
}
`;
