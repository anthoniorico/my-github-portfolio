<template>
  <div>
    <h1>Error Test</h1>
    <button @click="throwError" class="px-4 py-2 bg-red-500 text-white rounded">Throw Error</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorTest',
  methods: {
    throwError() {
      throw new Error('This is a test error')
    }
  }
}
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
