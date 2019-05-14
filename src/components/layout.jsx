import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './header';
import './layout.css';

const Main = styled.main`
  margin: 15px auto;
  max-width: 960px;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <Main>
      {children}
    </Main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
