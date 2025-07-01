<template>
  <BaseEdge
    type="smoothstep"
    :id="id"
    :style="style"
    :path="path[0]"
    :marker-end="markerEnd ?? ''"
  />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        display: !props.activeEdgeId || props.activeEdgeId === id ? 'flex' : 'none',
      }"
      class="nodrag nopan"
    >
      <button
        class="add-edge-btn"
        :class="{ 'add-edge-btn--active': props.activeEdgeId === id }"
        @click="onClick"
      >
        <Icons name="plus" />
      </button>
    </div>
  </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import type { Position } from '@vue-flow/core';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@vue-flow/core';
import { computed } from 'vue';
import Icons from './IconsItem.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
  data: {
    type: Object,
    required: false,
  },
  activeEdgeId: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['openAddNodeDrawer']);

const path = computed(() =>
  getSmoothStepPath({
    ...props,
    sourcePosition: props.sourcePosition as Position,
    targetPosition: props.targetPosition as Position,
  }),
);

function onClick() {
  emit('openAddNodeDrawer', props);
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
