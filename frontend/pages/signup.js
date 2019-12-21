import styled from 'styled-components';

import Signup from '../components/Signup';
import Signin from '../components/Signin';

const Columns = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default function SignupPage() {
  return <Columns>
    <Signup />
    <Signin />
  </Columns>;
}
