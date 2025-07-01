<template>
  <div class="step-label-container">
    <Icons v-if="props.data.type" :name="props.data.type" />
    <span>{{ props.data.label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core';
import Icons from './IconsItem.vue';

const props = defineProps<NodeProps>();
defineEmits(['updateNodeInternals']);
</script>
<script lang="ts">
export default {};
</script>
