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
const isBlur = ref(true)

watch(
  () => props.modelValue,
  () => {
    if (isBlur.value) {
      editor.value!.innerHTML = props.modelValue
    }
  }
)
// eslint-disable-next-line func-call-spacing
const $emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'createLabel'): void;
}>()
// 监听输入框内容
const inputText = () => {
  $emit('update:modelValue', editor.value!.innerHTML)
}

const tabEvent = (e: Event) => {
  const key = e instanceof KeyboardEvent ? e.key : null
  if (key === 'Tab') {
    e.preventDefault()
    e.stopPropagation()
    $emit('createLabel')
  }
}
const inputFocus = () => {
  isBlur.value = false
}
const inputBlur = () => {
  isBlur.value = true
}
</script>
