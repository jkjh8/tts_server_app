import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnlineStore = defineStore('online', () => {
  const online = ref(false)

  return { online }
})
