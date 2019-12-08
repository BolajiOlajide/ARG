import App, { Container } from 'next/app';

// components
import Page from '../components/Page';

class ARG extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
}

export default ARG;
