import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFolderStore = defineStore('folers', () => {
  const mediafolder = ref('')

  return { mediafolder }
})
