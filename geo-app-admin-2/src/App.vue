<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout/index.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()
onMounted(() => {
  authStore.getCurrentUser();
})
</script>

<template>
  <BaseLayout />
</template>
