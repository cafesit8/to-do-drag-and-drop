<template>
  <header class="flex flex-col gap-3 justify-center items-center">
    <h1 class="text-3xl font-bold text-center">Todo App with Drag and Drop</h1>
    <button @click="toggleModal" class="bg-[#4e4b88] py-1 px-6 rounded-lg">Add Task</button>
  </header>
</template>

<script setup>
import { useTasksStore } from '../store/tasks';

const { toggleModal } = useTasksStore();
</script>