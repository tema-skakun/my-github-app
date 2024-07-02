import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { RootState } from '../redux/store';
import { setRepositories, setSearchQuery, setCurrentPage } from '../redux/slices/repositoriesSlice';
import { NavLink } from 'react-router-dom';

const GET_REPOSITORIES = gql`
  query($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            pushedAt
            url
          }
        }
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { repositories, searchQuery, currentPage } = useSelector((state: RootState) => state.repositories);
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { query: searchQuery, first: 10, after: null },
  });

  useEffect(() => {
    if (data) {
      const repos = data.search.edges.map((edge: any) => ({
        id: edge.node.id,
        name: edge.node.name,
        owner: edge.node.owner.login,
        stars: edge.node.stargazers.totalCount,
        lastCommitDate: edge.node.pushedAt,
        url: edge.node.url,
      }));
      dispatch(setRepositories(repos));
    }
  }, [data, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    // выполнить fetchMore для получения новых данных
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search repositories..." />
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <NavLink to={`/repository/${repo.owner}/${repo.name}`}>
              {repo.name}
            </NavLink>
            {' '}⭐ Star {repo.stars} - Last commit: {repo.lastCommitDate} -
            <a href={repo.url} target="_blank" rel="noopener noreferrer">link</a>
          </li>
        ))}
      </ul>
      <div>
        {/* пагинация */}
      </div>
    </div>
  );
};

export default HomePage;
