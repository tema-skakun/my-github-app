import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_REPOSITORY_DETAILS = gql`
  query($name: String!) {
    repository(name: $name) {
      name
      stargazers {
        totalCount
      }
      pushedAt
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 5) {
        edges {
          node {
            name
          }
        }
      }
      description
    }
  }
`;

const RepositoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, loading } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;

  const repo = data.repository;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>Stars: {repo.stargazers.totalCount}</p>
      <p>Last commit: {repo.pushedAt}</p>
      <div>
        <img src={repo.owner.avatarUrl} alt={repo.owner.login} />
        <a href={repo.owner.url}>{repo.owner.login}</a>
      </div>
      <ul>
        {repo.languages.edges.map((lang: any) => (
          <li key={lang.node.name}>{lang.node.name}</li>
        ))}
      </ul>
      <p>{repo.description}</p>
    </div>
  );
};

export default RepositoryPage;
