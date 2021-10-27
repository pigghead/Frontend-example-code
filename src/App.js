import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar.js';
import ProfileCard from './ProfileCard.js';
import ReposFeed from './ReposFeed.js';
import './App.css';

function App() {
  //State setting for React hooks
  const [login, setLogin] = useState('username');
  const [name, setName] = useState('name');
  const [repos, setRepos] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [userUrl, setUserUrl] = useState('');
  const [userInput, setUserInput] = useState('');
  const [reposArray, setReposArray] = useState('');

  //In case user DNE
  const [notFound, setNotFound] = useState(null);

  const SetData = ({login, public_repos, followers, following, avatar_url, name, html_url}) => {
    setLogin(login);
    setRepos(public_repos);
    setFollowers(followers);
    setFollowing(following);
    setAvatar(avatar_url);
    setUserUrl(html_url);
    setName(name);
  }

  //set default as my profile because this makes the most sense to me
  useEffect(() =>{
    //for profile card
    fetch('https://api.github.com/users/pigghead')
      .then(res => res.json())
      .then(data => {
        SetData(data);
      })
    //for repository feed
    fetch('https://api.github.com/users/pigghead/repos')
      .then(repores=>repores.json())
      .then(reposres => {
        setReposArray(reposres);
      })
  }, []);

  //use a state to determine which user we are searching for
  const handleSearch = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  }

  //fetch the user + their repo array
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if(data.message) {
          setNotFound(data.message)
        } else {
          SetData(data);
          setNotFound(null);
        }
      });
      getReposArray();
  }

  //fetching user repo array
  const getReposArray = () => {
    fetch(`https://api.github.com/users/${userInput}/repos`)
      .then(res => res.json())
      .then(repos => {
        if(repos.message) {
          setNotFound(repos.message)
        } else {
          setReposArray(repos);
          setNotFound(null);
        }
      });
      console.log(reposArray);
  }

  return (
    <div>
      <div className='header'>
        <h2><a className='logo' href='./App.js'>GitHub API query</a></h2>
        <Searchbar 
          handleSubmit={handleSubmit}
          handleSearch={handleSearch}
        />
      </div>
      {notFound ? (<h1 className='body'>No user found</h1>) : 
        (
          <div className='body'>
            <ProfileCard 
              login={login} 
              numRepos={repos} 
              numFollowers={followers} 
              numFollowing={following}
              avatar={avatar}
              userUrl={userUrl}
              name={name}
            />
          </div>
        )};
      {reposArray.length == 0  || notFound ? (<h1>No repos found</h1>) : 
        (<ReposFeed 
          repos={reposArray}
        />)};
    </div>
  )
}

export default App;
