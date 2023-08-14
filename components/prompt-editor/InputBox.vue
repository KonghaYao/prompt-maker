<template>
  <div
    ref="editor"
    class="outline-none"
    contenteditable="true"
    @input="inputText"
    @blur="inputBlur"
    @focus="inputFocus"
    @keydown.stop.tab="tabEvent"
  />
</template>
<script setup lang="ts">
const editor = ref<HTMLDivElement>()
const props = defineProps<{
  modelValue: string;
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'update', val:(string|{id:string})[]): void;
  (e: 'tab'): void;
}>()

// 监听输入框内容
const inputText = () => {
  emit('update:modelValue', editor.value!.innerHTML)
}

const tabEvent = (e: Event) => {
  const key = e instanceof KeyboardEvent ? e.key : null
  if (key === 'Tab') {
    e.preventDefault()
    e.stopPropagation()
    emit('tab')
  }
}

const isBlur = ref(true)
const inputFocus = () => {
  isBlur.value = false
}
const inputBlur = () => {
  isBlur.value = true
  updateData()
}

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
