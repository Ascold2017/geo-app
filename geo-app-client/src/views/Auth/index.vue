<template>
    <AuthCard v-if="isFlipped" title="Регистрация" isSignUp  @flip="isFlipped = false"/>
    <AuthCard v-else title="Войти"  @flip="isFlipped = true"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthCard from './components/AuthCard.vue'
const isFlipped = ref(false)
</script>