import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './GlobalStyles';

// components
import Header from './Header';
import Meta from './Meta';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  breakpoint: '1300px',
  animationLength: '0.5s',
  animationTimingFunction: 'ease-in-out'
};

const StyledPage = styled.main`
  background: white;
  color: ${props => props.theme.black};
`;

const PageContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledPage>
          <Meta />
          <Header />
          <PageContainer>
            {this.props.children}
          </PageContainer>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
