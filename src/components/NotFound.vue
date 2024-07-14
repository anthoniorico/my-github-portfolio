<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-3xl font-bold mb-4">404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="text-blue-500 mt-4 inline-block">Go back to home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
