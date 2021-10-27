import React from 'react'

const ReposFeed = (props) => {
  const repoArray = props.repos
  const repoItems = repoArray.map((repo) =>
    <li key={repo.id}>
      <h2><a href={repo.html_url} className='feed__link'>{repo.name}</a></h2>
      <div className='feed__display'>
        <p className='feed__displayItem'>Language: {repo.language}</p>
        <p className='feed__displayItem'>Stars: {repo.stargazers_count}</p>
        <p className='feed__displayItem'>Forks: {repo.forks_count}</p>
      </div>
    </li>
  );

  return (
    <ul className='feed__repoList'>{repoItems}</ul>
  )
}

export default ReposFeed;