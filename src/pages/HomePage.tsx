import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { RootState } from '../redux/store';
import { setRepositories, setSearchQuery, setCurrentPage } from '../redux/slices/repositoriesSlice';

const GET_REPOSITORIES = gql`
  query($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
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
    // выполню fetchMore для получения новых данных
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search repositories..." />
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <a href={repo.url}>{repo.name}</a> - {repo.stars} stars - Last commit: {repo.lastCommitDate}
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
