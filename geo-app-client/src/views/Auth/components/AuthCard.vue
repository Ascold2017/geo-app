<template>
    <v-card :title="title" max-width="320">
        <v-form class="px-3 py-3">
            <v-text-field label="Логин" v-model="login" />
            <v-text-field label="Пароль" v-model="password" type="password"/>
            <v-text-field v-if="isSignUp" label="Повторить пароль" v-model="repeatPassword" type="password" />
            <v-card-actions>
                <v-btn variant="outlined" @click="submit">{{ isSignUp ? 'Зарегистрироваться' :
                    'Войти' }}</v-btn>
                <v-btn variant="text" @click="emit('flip')">{{ isSignUp ? 'Логин' : 'Регистрация' }}</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
const props = defineProps<{
    title: string;
    isSignUp?: boolean
}>()
const emit = defineEmits<{ flip: []; }>()
const authStore = useAuthStore();

const login = ref('')
const password = ref('')
const repeatPassword = ref('')

function reset() {
    login.value = '';
    password.value = '';
    repeatPassword.value = ''
}

async function submit() {
    const cb = props.isSignUp ? authStore.signUp : authStore.signIn;

    await cb({
        login: login.value,
        password: password.value
    })
    reset()
}
</script>