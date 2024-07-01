<template>
  <v-file-input
    v-model="file"
    accept="image/*"
    :label="label"
    @update:model-value="onFileChange"
  ></v-file-input>
  <v-img v-if="preview" :src="preview" max-width="300" max-height="300" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ value: string | null; label: string }>();
const emit = defineEmits<{ change: [value: string | null] }>()
const file = ref<File | null>(null);
const preview = ref<string | null>(props.value);

watch(() => props.value, (newValue) => {
    preview.value = newValue;
});

const onFileChange = (newFile: File | File[]) => {
    if (!newFile || Array.isArray(newFile)) {
      file.value = null;
      preview.value = null;
      emit('change', null);
      return;
    }
    file.value = newFile as File;
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target?.result as string;
      emit('change', preview.value);
    };
    reader.readAsDataURL(file.value);
};
</script>