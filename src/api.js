import axios from "axios";

export const getUsers = (name) => {
  return axios.get(`https://api.github.com/search/users`, {
    params: {
      q: name
    }
  });
};

export const getRepos = (user) => {
  return axios.get(`https://api.github.com/users/${user}/repos`);
};
