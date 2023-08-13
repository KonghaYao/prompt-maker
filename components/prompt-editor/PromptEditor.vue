<template>
  <div class="grid grid-cols-8  h-full w-full bg-gray-50 rounded-md p-8">
    <header class="col-span-8">
      提示词编辑器
    </header>
    <div class="flex-1 h-full w-full col-span-8 bg-white rounded-md outline-none p-4 text-left">
      <InputBox v-model="val" @create-label="createLabel" />
    </div>

    <div v-show="sideEditor" class="h-full w-32" />
  </div>
</template>

<script setup lang="ts">
import InputBox from './InputBox.vue'
import { insertDivAtCursor } from './insertDivAtCursor'

const sideEditor = ref(false)
const val = ref('')
const createLabel = () => {
  const span = insertDivAtCursor('12321')
}
</script>

<style scoped>

</style>
