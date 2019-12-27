import gql from 'graphql-tag';
import { perPage } from '../config';


export const ALL_ITEMS_QUERY = gql`
query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
  items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
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

export const UPDATE_ITEM_MUTATION = gql`
mutation UPDATE_ITEM_MUTATION(
  $id: ID!
  $title: String
  $description: String
  $price: Int
) {
  updateItem(
    id: $id
    title: $title
    description: $description
    price: $price
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

export const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where: { id: $id }) {
    id
    title
    description
    price
    largeImage
  }
}
`;

export const DELETE_ITEM_MUTATION = gql`
mutation DELETE_ITEM_MUTATION($id: ID!) {
  deleteItem(id: $id) {
    id
  }
}
`;

export const PAGINATION_QUERY = gql`
query PAGINATION_QUERY {
  itemsConnection {
    aggregate {
      count
    }
  }
}
`;

export const SIGNUP_MUTATION = gql`
mutation SIGNUP_MUTATION($name: String!, $password: String!, $email: String!) {
  signup(name: $name, password: $password, email: $email) {
    id
    name
    email
  }
}
`;

export const CURRENT_USER_QUERY = gql`
  query me {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export const SIGNIN_MUTATION = gql`
mutation SIGNIN_MUTATION($password: String!, $email: String!) {
  signin(password: $password, email: $email) {
    id
    name
    email
  }
}
`;

export const SIGNOUT_MUTATION = gql`
mutation SIGNOUT_MUTATION {
  signout {
    message
  }
}
`;

export const REQUEST_RESET_MUTATION = gql`
mutation REQUEST_RESET_MUTATION($email: String!) {
  requestReset(email: $email) {
    message
  }
}
`;

export const RESET_PASSWORD_MUTATION = gql`
mutation RESET_PASSWORD_MUTATION(
  $resetToken: String!
  $password: String!
  $confirmPassword: String!
) {
  resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
    id
    email
    name
  }
}
`;

export const ALL_USERS_QUERY = gql`
query ALL_USERS_QUERY {
  users {
    id
    name
    email
    permissions
  }
}
`;

export const UPDATE_PERMISSON_MUTATION = gql`
mutation UPDATE_PERMISSON_MUTATION(
  $permissions: [Permission]
  $userId: ID!
) {
  updatePermissions(permissions: $permissions, userId: $userId) {
    id
    name
    email
    permissions
  }
}
`;

export const LOCAL_STATE_QUERY = gql`
query {
  cartOpen @client
}
`;

export const TOGGLE_CART_MUTATION = gql`
mutation {
  toggleCart @client
}
`;
