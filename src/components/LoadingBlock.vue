<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  loading: any
}>()

</script>

<template>
  <div class="fixed inset-x-0 z-[999] bg-black top-0 transition-all overflow-hidden duration-1000" :class="[ loading ? 'h-screen' : 'h-0']">
    <h2 class="absolute text-[8vw] text-yellow-500 font-black p-20">Welcome, let's get things ready....</h2>
  </div>
</template>

<style scoped>
</style>
