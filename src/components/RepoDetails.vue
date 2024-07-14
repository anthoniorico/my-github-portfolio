<!-- src/components/RepoDetails.vue -->
<template>
  <div>
    <h2>{{ repo.name }}</h2>
    <p>{{ repo.description }}</p>
    <!-- Add more repo details as needed -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'RepoDetails',
  setup(props) {
    const repo = ref({})
    const fetchRepo = async () => {
      const response = await axios.get(
        `https://api.github.com/repos/your-github-username/${props.route.params.id}`
      )
      repo.value = response.data
    }

    onMounted(fetchRepo)

    return { repo }
  }
}
</script>
