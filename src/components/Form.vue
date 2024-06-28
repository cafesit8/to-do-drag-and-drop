<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useTasksStore } from '../store/tasks';
import { ref } from 'vue';
const { toggleModal, addTask, taskSelected, updateTask } = useTasksStore()
const title = ref(taskSelected.title)
const description = ref(taskSelected.description)

const handleSubmit = (event) => {
  event.preventDefault();
  if (taskSelected.id) {
    updateTask({ ...taskSelected, title: title.value, description: description.value })
  } else {
    addTask({ title: title.value, description: description.value })
  }
  toggleModal();
}
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col gap-3">
    <label class="flex flex-col">
      <span>Title</span>
      <InputText v-model="title" type="text" />
    </label>
    <label class="flex flex-col">
      <span>Description</span>
      <Textarea v-model="description" autoResize rows="5" />
    </label>
    <div class="flex gap-3">
      <button type="button" @click="toggleModal" class="w-full py-1 rounded-md border border-red-500/70">Cancel</button>
      <button type="button" @click="handleSubmit" class="w-full py-1 rounded-md bg-purple-900/80">Save</button>
    </div>
  </form>
</template>