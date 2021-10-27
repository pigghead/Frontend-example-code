import React from 'react'

const ProfileCard = (props) => (
  <div className='ProfileCard'>
    <img src={props.avatar} alt='profile-picture' className='ProfileCard__img' />
    <h2 className='ProfileCard__login'>
      <a className='ProfileCard__link' href={props.userUrl}>@{props.login}</a>
    </h2>
    <h3 className='ProfileCard__name'>{props.name}</h3>
    <p>{props.numRepos} repositories</p>
    <div className='ProfileCard__followMetrics'>
      <p>{props.numFollowers} followers</p>
      <p>{props.numFollowing} following</p>
    </div>
  </div>
)

export default ProfileCard;