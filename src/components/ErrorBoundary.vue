<template>
  <div class="container mx-auto p-4">
    <button @click="goBack" class="px-4 py-2 bg-blue-500 text-white rounded mb-4">
      Back to List
    </button>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="p-4 border rounded shadow">
      <h2 class="text-2xl font-semibold">{{ repo.name }}</h2>
      <p>{{ repo.description }}</p>
      <p><strong>Language:</strong> {{ repo.language }}</p>
      <p><strong>Stars:</strong> {{ repo.stargazers_count }}</p>
      <p><strong>Forks:</strong> {{ repo.forks_count }}</p>
      <a :href="repo.html_url" target="_blank" class="text-blue-500">View on GitHub</a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'RepoDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const repo = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const fetchRepo = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await axios.get(`https://api.github.com/repositories/${props.id}`)
        repo.value = response.data
      } catch (err) {
        error.value = 'Failed to fetch repository'
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchRepo)

    const goBack = () => {
      window.history.back()
    }

    return {
      repo,
      loading,
      error,
      goBack
    }
  }
}
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
