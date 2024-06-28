<script setup>
import Modal from './components/Modal.vue'
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
</script>

<template>
  <main class="w-full h-dvh text-white p-4">
    <Header />
    <Table />
  </main>
  <Modal />
</template>

<style scoped>
main {
  background-image: linear-gradient(to right top, #080d14, #131722, #1e1d30, #2d233c, #402746)
}
</style>
