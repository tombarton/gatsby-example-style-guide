import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

const Grid = styled.div`
  display: flex;
  > div {
    align-self: flex-start;
    padding: 18px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 0 1px 0 rgba(44, 54, 67, 0.1);
    > h3 {
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      line-height: 1.15rem;
      font-weight: normal;
      color: #297CBB;
    }
  }
  > div:first-of-type {
    margin: 0 18px;
    width: 20%;
  }
  > div:last-of-type {
    width: 80%;
  }
`;

const ColourGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 12px;
  margin: 21px 0;
`;

const ColourItem = styled.div`
p {
  margin: 9px 0;
}
  > p:first-of-type {
    margin-top: 0;
    background: ${p => p.hex};
    height: 85px;
    line-height: 85px;
    text-align: center;
    border-radius: 6px;
    color: #FFF;
    font-size: 0.8rem;
    font-weight: 700;
  }
  > p:last-of-type {
    border: 1px solid #dbe6ec;
    border-radius: 3px;
    text-align: center;
    font-size: 0.7rem;
    padding: 3px 0;
  }
`;

export const Colours = ({ data }) => {
  const { pagesJson } = data;
  return (
    <Layout>
      <Grid>
        <div>
          <h3>Sub Menu</h3>
        </div>
        <div>
          <h3>Colour Palette</h3>
          <ColourGrid>
            {pagesJson.colours.map(colour => (
              <ColourItem key={colour.hexCode} hex={colour.hexCode}>
                <p>{colour.hexCode}</p>
                <p>{colour.variableName}</p>
              </ColourItem>
            ))}
          </ColourGrid>
        </div>
      </Grid>
    </Layout>
  );
};

Colours.defaultProps = {
  data: {},
};

Colours.propTypes = {
  data: PropTypes.shape({
    pagesJson: PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string,
      colours: PropTypes.arrayOf(PropTypes.shape({
        hexCode: PropTypes.string,
        variableName: PropTypes.string,
      })),
    }),
  }),
};

export const pageQuery = graphql`
  query($path: String!) {
    pagesJson(path: { eq: $path }) {
      title
      path
      colours {
        hexCode
        variableName
      }
    }
  }
`;

export default Colours;
