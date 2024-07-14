<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <form @submit.prevent="handleSubmit">
        <input v-model="localRepo.name" placeholder="Repository Name" required />
        <textarea v-model="localRepo.description" placeholder="Description"></textarea>
        <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
        <button type="button" @click="handleDelete" v-if="isEdit">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, toRefs } from 'vue'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    repo: {
      type: Object,
      required: true,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'submit', 'delete'],
  setup(props, { emit }) {
    const { repo } = toRefs(props)
    const localRepo = ref({ ...repo.value })

    watch(repo, (newRepo) => {
      localRepo.value = { ...newRepo }
    })

    const closeModal = () => {
      emit('close')
    }

    const handleSubmit = () => {
      emit('submit', localRepo.value)
    }

    const handleDelete = () => {
      emit('delete', localRepo.value.id)
    }

    return {
      localRepo,
      closeModal,
      handleSubmit,
      handleDelete
    }
  }
}
</script>

<style scoped>
.modal {
  /* Add your modal styling here */
}
.modal-content {
  /* Add your modal content styling here */
}
.close {
  /* Add your close button styling here */
}
</style>
