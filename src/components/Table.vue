<template>
  <section class="max-w-6xl h-full m-auto flex flex-col gap-3 overflow-x-auto">
    <header class="mt-10 md:w-full w-[870px] md:grid flex grid-cols-3 gap-3">
      <h3 class="w-full bg-[#63498a] rounded-md p-2 flex justify-center">Pending</h3>
      <h3 class="w-full bg-[#63498a] rounded-md p-2 flex justify-center">In Progress</h3>
      <h3 class="w-full bg-[#63498a] rounded-md p-2 flex justify-center">Completed</h3>
    </header>
    <div class="grid grid-cols-3 gap-3 w-full">
      <ul ref="pendingList" class="w-full flex flex-col gap-2 bg-[#63498a] rounded-lg p-3">
        <li v-for="task in pending" :key="task" class="p-2 w-full cursor-pointer rounded-md text-white/90 bg-[#52406f] flex justify-between group">
          <div @click="handleClick(task)" class="group-hover:w-5/6 w-full">
            <div>
              <p class="text-base">{{ task.title }}</p>
              <p class="text-xs text-white/70 truncate">{{ task.description }}</p>
            </div>
          </div>
          <button @click="removeTask(task.id)"
            class="bg-red-500/40 rounded-md w-10 group-hover:grid md:hidden grid place-content-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
              class="text-red-500 icon icon-tabler icons-tabler-filled icon-tabler-trash">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
              <path
                d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
            </svg>
          </button>
        </li>
      </ul>
      <ul ref="progressList" class="w-full flex flex-col gap-2 bg-[#63498a] rounded-lg p-3">
        <li v-for="task in progress" :key="task" class="p-2 w-full cursor-pointer rounded-md text-white/90 bg-[#52406f] flex justify-between group">
          <div @click="handleClick(task)" class="group-hover:w-5/6 w-full">
            <div>
              <p class="text-base">{{ task.title }}</p>
              <p class="text-xs text-white/70 truncate">{{ task.description }}</p>
            </div>
          </div>
          <button @click="removeTask(task.id)" class="bg-red-500/40 rounded-md w-10 group-hover:grid md:hidden grid place-content-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
              class="text-red-500 icon icon-tabler icons-tabler-filled icon-tabler-trash">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
              <path
                d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
            </svg>
          </button>
        </li>
      </ul>
      <ul ref="completedList" class="w-full flex flex-col gap-2 bg-[#63498a] rounded-lg p-3">
        <li v-for="task in completed" :key="task" class="p-2 w-full  cursor-pointer rounded-md text-white/90 bg-[#52406f] flex justify-between group">
          <div @click="handleClick(task)" class="group-hover:w-5/6 w-full">
            <div>
              <p class="text-base">{{ task.title }}</p>
              <p class="text-xs text-white/70 truncate">{{ task.description }}</p>
            </div>
          </div>
          <button @click="removeTask(task.id)" class="bg-red-500/40 rounded-md w-10 group-hover:grid md:hidden grid place-content-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
              class="text-red-500 icon icon-tabler icons-tabler-filled icon-tabler-trash">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
              <path
                d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </section>
  <Toast />
</template>

<script setup>
import Toast from 'primevue/toast'
import { useDragAndDrop } from "@formkit/drag-and-drop/vue"
import { useTasksStore } from '../store/tasks';
import { watch } from 'vue';
import { useToast } from "primevue/usetoast";
import confetti from 'canvas-confetti'

const { pendingTasks, inProgress, completedTasks, toggleModal, addTaskSelected, removeTask, setUpdatePendingTask, setUpdateInProgressTask, setUpdateCompletedTask } = useTasksStore();

const [pendingList, pending] = useDragAndDrop(pendingTasks, { group: "app-todo" });
const [progressList, progress] = useDragAndDrop(inProgress, { group: "app-todo" });
const [completedList, completed] = useDragAndDrop(completedTasks, { group: "app-todo" });

function handleClick (task) {
  addTaskSelected(task)
  toggleModal()
}

const toast = useToast()

watch([pending, progress, completed], ([, , newCompleted], [, , oldCompleted]) => {
  setUpdatePendingTask(pending.value)
  setUpdateInProgressTask(progress.value)
  setUpdateCompletedTask(completed.value)

  if (newCompleted.length > oldCompleted.length) {
    confeti()
  }
})

function confeti () {
  toast.add({ severity: 'success', summary: 'Tarea Completada', detail: 'Felicidades por completar la tarea :)', life: 2000 });
  let duration = 2 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange (min, max) {
    return Math.random() * (max - min) + min;
  }

  let interval = setInterval(function () {
    let timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    let particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}


</script>