import React, { Component } from 'react';
import { getRepos, getUsers } from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import UserRepoList from '../components/UserRepoList';
import styles from './GithubUserList.module.css'

export default class GithubUserList extends Component {
  state = {
    users: [],
    loading: false,
    text: '',
    error: false,
  }

  onInputChange = (e) => {
    this.setState({ text: e.target.value });
  }

  onClick = async () => {
    if (!this.state.text) {
      return;
    }
    try {
      this.setState({ loading: true, error: false });
      const { items } = await (await getUsers(this.state.text)).data;
      const users = await Promise.all(items.map(async ({ login, id }) => {
        const { data } = await getRepos(login);
        return {
          login,
          id,
          repos: data.map(({ full_name, description }) => ({
            description,
            repoName: full_name,
          }))
        }
      }));
      this.setState({ loading: false, users });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    return (
      <div>
        <h1>Github user repos list</h1>
        <div className={styles.top}>
          <Input data-testid="input" value={this.state.text} onChange={this.onInputChange} />
          <Button data-testid="button" className={styles.button} onClick={this.onClick}>Search</Button>
        </div>
        {this.state.loading && <Loader data-testid="loader" />}
        {this.state.error && <div>Something went wrong</div>}
        <UserRepoList users={this.state.users} />
      </div>
    )
  }
}
