<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
// components
import ServerAddress from 'components/setupPage/serverAddr.vue'
import MediaFolder from 'components/setupPage/mediaFolder.vue'

const $q = useQuasar()

const serverport = ref('')
const mediafolder = ref('')

// lifecycle hook
// onMounted(() => {
//   ipc.on('db:rt', (args) => {
//     if (args && args.key) {
//       switch (args.key) {
//         case 'serverport':
//           serverport.value = args.value
//           break
//         case 'mediafolder':
//           mediafolder.value = args.value
//           break
//       }
//     }
//   })
// })

// onBeforeUnmount(() => {
//   ipc.removeEventListener('db:rt')
// })
</script>

<template>
  <div class="q-pa-md">
    <div class="bg-grey-1 border-round q-pa-md">
      <!-- server ip address -->
      <ServerAddress :address="serverport" />
      <!-- media folder -->
      <MediaFolder :mediafolder="mediafolder" />
    </div>
  </div>
</template>

<style scoped>
.border-round {
  border-radius: 0.5rem;
}
</style>
