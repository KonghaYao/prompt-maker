<template>
  <div class="grid grid-cols-8  h-full w-full bg-gray-50 rounded-md p-8">
    <header class="col-span-8">
      提示词编辑器
    </header>
    <header>
      <el-button type="primary" @click="copyText">
        复制
      </el-button>
    </header>
    <div class="flex-1 h-full w-full col-span-8 bg-white rounded-md outline-none p-4 text-left">
      <InputBox v-model="val" :editable="mode==='edit'" @tab="createLabel" @update="updateData" />
    </div>

    <div v-show="sideEditor" class="h-full w-32" />
    <Teleport v-for="item in teleports" :to="item.el">
      <span
        class="inline-flex rounded-xl max-w-xs mx-2 text-white my-1 overflow-hidden"
        :style="{
          backgroundColor:stringToColor(item.id)
        }"
      >
        <span :title="item.hint">
          ⏺️
        </span>
        <input v-model="item.value" class="bg-gray-100 text-black max-w-[10em] px-4 border-0 outline-none text-sm ">
      </span>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import copy from 'copy-to-clipboard'
import InputBox from './InputBox.vue'
import { insertDivAtCursor } from './insertDivAtCursor'
import type { GPTInputDOM, IInputType } from './GPTTextType'

defineProps<{
  mode: 'edit'|'reader'
}>()

const sideEditor = ref(false)
const val = ref('')
const teleports = reactive<GPTInputDOM[]>([])
const createLabel = () => {
  const randomId = crypto.randomUUID()
  const content = insertDivAtCursor(randomId)
  if (content) {
    const { span, text } = content
    teleports.push({ el: span, id: randomId, type: 'string', value: text ?? '', hint: '', label: '选项' + teleports.length })
  }
}
/** realData 是用于 vue 渲染的数据类型 */
const realData = ref<(string|IInputType)[]>([])
const updateData = (data:(string|{id:string})[]) => {
  realData.value = data.map((i) => {
    if (typeof i === 'string') {
      return i
    } else {
      return teleports.find(ii => i.id === ii.id) as IInputType
    }
  })
}
const copyText = () => {
  const text = promptDataToText(realData.value)
  copy(text)
}
/** 最终将数据转化为文本 */
const promptDataToText = (realData:(string|IInputType)[]) => {
  return realData.map((i) => {
    if (typeof i === 'string') { return i }
    return i.value
  }).join('')
}

const stringToColor = (str:string) => {
  let code = 0
  for (const char of str) {
    code += char.charCodeAt(0)
  }
  return `hsl(${code % 360} 56% 44% / 1)`
}
</script>

<style scoped>

</style>
