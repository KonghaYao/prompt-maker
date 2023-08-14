<template>
  <div class="grid grid-cols-8  h-full w-full bg-gray-50 rounded-md p-8">
    <header class="col-span-8">
      提示词编辑器
    </header>
    <div class="flex-1 h-full w-full col-span-8 bg-white rounded-md outline-none p-4 text-left">
      <InputBox v-model="val" @tab="createLabel" @update="updateData" />
    </div>

    <div v-show="sideEditor" class="h-full w-32" />
    <Teleport v-for="item in teleports" :to="item.el">
      <span class="inline-flex rounded-md max-w-xs">
        <span title="hint bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600">
          ⏺️
        </span>
        <input v-model="item.value" class="p-0 border-0 w-fit w-min-[2em] outline-none">
      </span>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import InputBox from './InputBox.vue'
import { insertDivAtCursor } from './insertDivAtCursor'
import type { GPTInputDOM } from './GPTTextType'
const sideEditor = ref(false)
const val = ref('')
const teleports = reactive<GPTInputDOM[]>([])
const createLabel = () => {
  const randomId = crypto.randomUUID()
  const span = insertDivAtCursor(randomId)
  if (span) {
    teleports.push({ el: span, id: randomId, type: 'string', value: '', hint: '', label: '' })
  }
}

const updateData = (data:(string|{id:string})[]) => {
  console.log(data)
}

</script>

<style scoped>

</style>
