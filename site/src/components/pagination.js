import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import { device } from './devices';

const Pagination = styled.nav`

  padding: var(--gutter);
  flex-flow: row wrap;
  justify-content: center;
  display: flex;

  & a {
    margin: 0 calc(0.5 * var(--gutter));
    padding: calc(0.25 * var(--gutter)) calc(1 * var(--gutter));

    background-color: inherit;
    color: var(--dark-base);

    @media only screen and ${device.medium} {
      margin: 0 calc(0.25 * var(--gutter));
      padding: calc(0.25 * var(--gutter)) calc(0.5 * var(--gutter));
    }
  }

  & a:hover {
    color: var(--dark-text-colour);
  }

  & a.current {
    background-color: var(--dark-base);
    color: var(--light-text-colour);
  }

  & a.current:hover {
    color: var(--light-base);
  }
`;

export const Paginate = ({basepath, currentpage, numpages}) => {
  // builds a pagination component

  // determine values to work out if we show the prev and next buttons
  const isFirstPage = currentpage === 1;
  const isLastPage = currentpage === numpages;

  // these don't account for boundaries as the bools above will deal with it.
  const prevPagePath = (currentpage - 1) === 1 ? '' : (currentpage - 1).toString();
  const nextPagePath = (currentpage + 1).toString();

  if (!basepath.endsWith('/')) {
    basepath = basepath + '/';
  }

  return (
    <Pagination>
      {!isFirstPage && (
        <Link to={basepath + prevPagePath} rel="prev">
          <FontAwesomeIcon icon={faAngleLeft}/>
        </Link>
      )}
      {Array.from({length: numpages}, (_, i) => {
        const current = (currentpage === i+1) ? 'current' : '';
        return (
          <Link key={`pagination-num-${i+1}`} className={current}
            to={basepath + (i === 0 ? '' : i + 1)}>
            {i + 1}
          </Link>
        );
      })}
      {!isLastPage && (
        <Link to={basepath + nextPagePath} rel="next">
          <FontAwesomeIcon icon={faAngleRight}/>
        </Link>
      )}
    </Pagination>
  );
}

