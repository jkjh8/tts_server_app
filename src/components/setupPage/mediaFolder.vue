<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useFolderStore } from 'src/stores/folders.js'
// props
const { mediafolder } = storeToRefs(useFolderStore())
const $q = useQuasar()

function openDialog() {
  ipc.send('dialog:folder')
}

function openFolder() {
  ipc.send('dialog:openFolder', props.mediafolder)
}

onMounted(() => {
  ipc.send('db:find', { key: 'mediafolder' })
})
</script>

<template>
  <div class="row justify-between items-center">
    <div class="text-bold font-sans">Default Media Folder</div>
    <div class="row items-center q-gutter-x-sm">
      <div class="font-sans cursor-pointer" @click="openFolder">
        {{ mediafolder }}
      </div>
      <q-btn
        round
        flat
        size="sm"
        icon="refresh"
        color="primary"
        @click="openDialog"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
