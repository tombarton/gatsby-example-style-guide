import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import logo from '../../images/react-logo.png';
import staticNavItems from './config/staticNavItems';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background: #1d508d;
  > ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    > li {
      margin: 0;
      padding: 0;
      padding: 12px 9px;
      > a {
        display: block;
        color: #bccee3;
        font-size: 0.7rem;
        text-transform: uppercase;
        font-weight: 700;
        text-decoration: none;
      }
    }
  }
`;

const LogoContainer = styled(Link)`
  display: block;
  padding: 6px;
  > img {
    width: 50px;
    height: 100%;
    margin: 0;
  }
`;

const Header = ({ data }) => {
  const { allPagesJson } = data;
  const { nodes } = allPagesJson;
  const navItems = [
    ...staticNavItems,
    ...nodes.map(node => ({ title: node.title, path: node.path })),
  ];

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <img src={logo} alt="Logo" />
      </LogoContainer>
      <ul>
        {navItems.map(i => (
          <li key={`navitem-${i.title}`}>
            <Link to={i.path}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </HeaderContainer>

  );
};

Header.defaultProps = {
  data: {},
};

Header.propTypes = {
  data: PropTypes.shape({
    allPagesJson: PropTypes.shape({
      nodes: PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allPagesJson {
          nodes {
            path
            title
          }
        }
      }
    `}
    render={data => (
      <Header data={data} />
    )}
  />
);
