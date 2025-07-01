<template>
  <Icons v-if="iconName" :name="iconName" />
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core';
import { watch, ref } from 'vue';
import Icons from './IconsItem.vue';

const props = defineProps<NodeProps>();
const iconName = ref(props.data.icon);

// React to changes in data.icon
watch(
  () => props.data.icon,
  (newVal) => {
    iconName.value = newVal;
  },
);
</script>
<script lang="ts">
export default {};
</script>
