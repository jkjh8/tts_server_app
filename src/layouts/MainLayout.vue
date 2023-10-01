<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useFolderStore } from '/src/stores/folders.js'
import { useServerStore } from '/src/stores/server.js'

const { serverport } = storeToRefs(useServerStore())
const { mediafolder } = storeToRefs(useFolderStore())

const $r = useRouter()

onMounted(() => {
  ipc.on('db:rt', (args) => {
    if (args && args.key) {
      switch (args.key) {
        case 'serverport':
          serverport.value = args.value
          break
        case 'mediafolder':
          mediafolder.value = args.value
          break
      }
    }
  })
  ipc.send('db:find', { key: 'serverport' })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black border-bottom">
      <q-toolbar class="justify-between">
        <div
          class="q-pl-md cursor-pointer row no-wrap q-gutter-x-sm items-center"
          @click="$r.push('/')"
        >
          <q-icon name="home" color="primary" size="sm" />
          <div class="font-ubuntumono font-md text-bold">TTS Server</div>
          <div class="caption self-start">listening at {{ serverport }}</div>
        </div>
        <div>
          <div class="btn cursor-pointer" @click="$r.push('/setup')">Setup</div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.btn {
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
  color: #444;
}
.btn:hover {
  background: #eee;
}
.online {
  color: v-bind(online ? 'green': 'red');
  border: 1px solid v-bind(online ? 'green': 'red');
  border-radius: 5px;
  padding: 0 1px 0 1px;
  font-size: 10px;
  height: 18px;
}
</style>
