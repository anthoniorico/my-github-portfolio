<template>
  <!-- Existing code -->
  <button @click="openModal">Create New Repository</button>
  <RepoModal
    :isOpen="isModalOpen"
    :repo="currentRepo"
    :isEdit="isEdit"
    @close="closeModal"
    @submit="handleRepoSubmit"
    @delete="handleRepoDelete"
  />
</template>

<script>
import { ref } from 'vue'
import RepoModal from './RepoModal.vue'
import { getRepositories, createRepo, updateRepo, deleteRepo } from '../services/githubService'

export default {
  components: { RepoModal },
  setup() {
    const isModalOpen = ref(false)
    const currentRepo = ref({})
    const isEdit = ref(false)
    const repositories = ref([])

    const fetchRepositories = async () => {
      repositories.value = await getRepositories('your-github-username')
    }

    const openModal = (repo = {}) => {
      currentRepo.value = { ...repo }
      isEdit.value = !!repo.id
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleRepoSubmit = async (repo) => {
      if (isEdit.value) {
        await updateRepo(repo)
      } else {
        await createRepo(repo)
      }
      closeModal()
      fetchRepositories() // Refresh repository list
    }

    const handleRepoDelete = async (repoId) => {
      await deleteRepo(repoId)
      closeModal()
      fetchRepositories() // Refresh repository list
    }

    return {
      isModalOpen,
      currentRepo,
      isEdit,
      repositories,
      openModal,
      closeModal,
      handleRepoSubmit,
      handleRepoDelete,
      fetchRepositories
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
