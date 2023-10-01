<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import DialogAddr from 'src/components/dialog/dialogAddr.vue'
import { useServerStore } from 'src/stores/server.js'
// props

const $q = useQuasar()
const { serverport } = storeToRefs(useServerStore())

function openDialogAddr() {
  $q.dialog({
    component: DialogAddr
  }).onOk((str) => {
    if (str) {
      ipc.send('db:update', { key: 'serverport', value: str })
    }
  })
}

onMounted(() => {
  ipc.send('db:find', { key: 'serverport' })
})
</script>

<template>
  <div class="row justify-between items-center">
    <div class="text-bold font-sans">Server Port</div>
    <div class="row items-center q-gutter-x-sm">
      <div class="font-sans">{{ serverport }}</div>
      <q-btn
        round
        flat
        size="sm"
        icon="edit"
        color="primary"
        @click="openDialogAddr"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
