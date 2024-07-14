import axios from 'axios'

const GITHUB_API_URL = 'https://api.github.com/users/anthoniorico/repos'

const githubToken = import.meta.env.VITE_GITHUB_TOKEN

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${githubToken}`
  }
})

export const getUserRepos = async (username, page = 1, per_page = 10, query = '') => {
  try {
    const response = await githubApi.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      params: {
        page,
        per_page,
        q: query
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching repositories', error)
    throw error
  }
}

export const getUserRepo = async (repoName) => {
  try {
    const response = await githubApi.get(`https://api.github.com/repos/anthoniorico/${repoName}`)
    return response.data
  } catch (error) {
    console.error('Error fetching repository', error)
    throw error
  }
}
