<template>
    <v-card :title="title" max-width="320">
        <v-form class="px-3 py-3">
            <v-text-field label="Логин" v-model="login" />
            <v-text-field label="Пароль" v-model="password" />
            <v-text-field label="Повторить пароль" v-model="repeatPassword" v-if="isSignUp" />
            <div className="flex items-center">
                <v-btn variant="elevated" @click="submit">{{isSignUp ? 'Зарегистрироваться' :
                    'Войти'}}</v-btn>
                <v-btn variant="text" @click="emit('flip')">{{ isSignUp ? 'Логин' : 'Регистрация' }}</v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    title: string;
    isSignUp?: boolean
}>()
const emit = defineEmits<{ flip: []; submit: [payload: { login: string; password: string }] }>()

const login = ref('')
const password = ref('')
const repeatPassword = ref('')

function submit() {
    emit('submit', {
        login: login.value,
        password: password.value
    })
}
</script>