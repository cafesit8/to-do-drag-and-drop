<script setup>
import Dialog from 'primevue/dialog'
import Form from './Form.vue'
import { useTasksStore } from '../store/tasks';
import { computed } from 'vue';
const store = useTasksStore()

const visible = computed(() => store.visible);

</script>

<template>
  <Dialog v-model:visible="visible" :closable="false" :draggable="false" modal header="Task"
    :style="{ width: '25rem' }">
    <Form />
  </Dialog>
</template>