<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">My GitHub Repositories</h1>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search repositories..."
        class="p-2 border rounded w-full"
      />
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="repo in repos" :key="repo.id" class="p-4 border rounded shadow">
        <h2 class="text-xl font-semibold">{{ repo.name }}</h2>
        <p>{{ repo.description }}</p>
        <router-link :to="{ name: 'RepoDetail', params: { id: repo.id } }" class="text-blue-500">
          View Details
        </router-link>
      </div>
    </div>
    <div class="mt-4 flex justify-center">
      <button
        @click="previousPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span class="mx-2">{{ page }}</span>
      <button @click="nextPage" class="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { getUserRepos } from '../services/github'

export default {
  name: 'RepoList',
  setup() {
    const repos = ref([])
    const loading = ref(true)
    const error = ref(null)
    const page = ref(1)
    const perPage = 10 // Number of repositories per page
    const searchQuery = ref('')

    const fetchRepos = async () => {
      loading.value = true
      error.value = null
      try {
        const data = await getUserRepos(
          'your-github-username',
          page.value,
          perPage,
          searchQuery.value
        )
        repos.value = data
      } catch (err) {
        error.value = 'Failed to fetch repositories'
      } finally {
        loading.value = false
      }
    }

    const handleSearch = () => {
      page.value = 1
      fetchRepos()
    }

    const nextPage = () => {
      page.value += 1
      fetchRepos()
    }

    const previousPage = () => {
      if (page.value > 1) {
        page.value -= 1
        fetchRepos()
      }
    }

    watch(searchQuery, handleSearch)

    onMounted(fetchRepos)

    return {
      repos,
      loading,
      error,
      page,
      searchQuery,
      nextPage,
      previousPage
    }
  }
}
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
