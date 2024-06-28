import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const pendingTasks = ref([{ id: 1, title: "Some Pending Task", description: "Here you can add your task description" }])
  const inProgress = ref([{ id: 2, title: "Learning Vue", description: "This is a project to learn Vue" }])
  const completedTasks = ref([{ id: 3, title: "Learned React", description: "I learned React with other projects, but now I pretend to learn Vue and Nuxt" }])
  const visible = ref(false)
  const taskSelected = ref({ id: null, title: "", description: "" })

  function addTask (task) {
    pendingTasks.value.unshift({
      id: crypto.randomUUID(),
      ...task
    })
  }

  function toggleModal () {
    visible.value = !visible.value
    if (!visible.value) {
      taskSelected.value = { title: "", description: "" }
    }
  }

  function addTaskSelected (task) {
    taskSelected.value = task
  }

  function updateTask (updatedTask) {
    const taskId = updatedTask.id;

    const findTaskIndex = (tasks) => tasks.findIndex(task => task.id === taskId);

    const updateTaskInArray = (tasks) => {
      const index = findTaskIndex(tasks);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
      }
    }

    updateTaskInArray(pendingTasks.value);
    updateTaskInArray(inProgress.value);
    updateTaskInArray(completedTasks.value);
  }

  function removeTask (taskId) {

    const findTaskIndex = (tasks) => tasks.findIndex(task => task.id === taskId);

    const updateListTasks = (tasks) => {
      const index = findTaskIndex(tasks);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }

    updateListTasks(pendingTasks.value);
    updateListTasks(inProgress.value);
    updateListTasks(completedTasks.value);
  }

  const setUpdatePendingTask = (newList) => pendingTasks.value = newList

  const setUpdateInProgressTask = (newList) => inProgress.value = newList

  const setUpdateCompletedTask = (newList) => completedTasks.value = newList

  return { pendingTasks, inProgress, completedTasks, toggleModal, visible, addTask, taskSelected, addTaskSelected, updateTask, removeTask, setUpdatePendingTask, setUpdateInProgressTask, setUpdateCompletedTask }
})