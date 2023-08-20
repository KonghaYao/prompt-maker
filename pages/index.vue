<template>
  <PromptEditor v-model:template="state" mode="edit" />
</template>
<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
const state = useStorage('my-store', '')
</script>
