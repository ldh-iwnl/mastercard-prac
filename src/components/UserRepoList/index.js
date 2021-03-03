import React from 'react'
import RepoDetails from '../RepoDetails'
import styles from './style.module.css';

const UserRepoList = ({ users }) => {
  return (
    <div className={styles.container}>
      {users.map(userData => {
        return (
          <div key={userData.id} className={styles.card}>
            <h3>{userData.login}</h3>
            <hr className={styles.hr} />
            <h5>Repos:</h5>
            <div className="repo-list">
              {userData.repos.map(repo => {
                return (
                  <RepoDetails
                    key={repo.repoName}
                    repoName={repo.repoName}
                    description={repo.description}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserRepoList;
