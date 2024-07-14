import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const getRepositories = async (username, page = 1, perPage = 10) => {
  const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const createRepo = async (repo) => {
  // Add logic to create a new repository
};

export const updateRepo = async (repo) => {
  // Add logic to update the repository
};

export const deleteRepo = async (repoId) => {
  // Add logic to delete the repository
};