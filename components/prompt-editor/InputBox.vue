<template>
  <div
    ref="editor"
    class="outline-none"
    :contenteditable="editable"
    @input="inputText"
    @blur="inputBlur"
    @focus="inputFocus"
    @keydown.self.stop.tab="tabEvent"
  />
</template>
<script setup lang="ts">
import { allowToRun, logAsyncState } from './allowToRun'
const editor = ref<HTMLDivElement>()
const props = defineProps<{
  modelValue: string;
  editable: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'update', val:(string|{id:string})[]): void;
  (e: 'tab'): void;
}>()

const allowToEdit = <T extends (...args: any[]) => any>(func: T) => {
  const newFunc = allowToRun(func, () => props.editable)
  return logAsyncState(newFunc, (p) => {
    p.catch(e => console.log(e))
  })
}

// 监听输入框内容
const inputText = allowToEdit(() => {
  emit('update:modelValue', editor.value!.innerHTML)
})

const tabEvent = allowToEdit((e: Event) => {
  const key = e instanceof KeyboardEvent ? e.key : null
  if (key === 'Tab') {
    e.preventDefault()
    e.stopPropagation()
    emit('tab')
  }
})

const isBlur = ref(true)
const inputFocus = allowToEdit(() => {
  isBlur.value = false
})
const inputBlur = allowToEdit(() => {
  isBlur.value = true
  updateData()
})

const updateData = () => {
  const finalResult:(string|{id:string})[] = []
  for (const node of editor.value!.childNodes.values()) {
    if (node instanceof Text) {
      finalResult.push(node.textContent!)
    } else {
      finalResult.push({ id: (node as HTMLElement).id })
    }
  }
  emit('update', finalResult)
}
</script>
