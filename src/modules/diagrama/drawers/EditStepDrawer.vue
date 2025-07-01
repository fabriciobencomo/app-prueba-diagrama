<template>
  <q-drawer
    v-if="node && node.data"
    elevated
    v-model="isOpenEditNode"
    :width="400"
    bordered
    overlay
    side="right"
  >
    <div class="edit-step-drawer q-pa-lg">
      <div class="row items-center justify-between q-mb-lg">
        <div class="edit-step-header">
          <Icons :name="node.data.type" class="edit-step-icon" />
          <span class="edit-step-title">
            {{
              node.data.type === 'simple'
                ? 'Simple'
                : node.data.type === 'brunch'
                  ? 'Brunch'
                  : node.data.type
            }}
          </span>
        </div>
      </div>
      <div v-if="node.data.type === 'simple'">
        <q-input outlined v-model="label" label="Nombre del paso" />
      </div>
      <div v-if="node.data.type === 'brunch'">
        <q-input class="q-mb-sm" outlined v-model="label" label="Nombre del paso" />
        <q-input
          class="q-mb-sm"
          outlined
          v-model="conditionalLabels[0]"
          label="Nombre de brunch 1"
        />
        <q-input outlined v-model="conditionalLabels[1]" label="Nombre de brunch 2" />
      </div>
      <div class="edit-step-actions row q-mt-lg q-gutter-md">
        <q-btn
          flat
          class="edit-step-btn-delete"
          label="Eliminar"
          @click="$emit('removeNode', node.id)"
        />
        <q-btn flat class="edit-step-btn-cancel" label="Cancelar" @click="$emit('closeEditNode')" />
        <q-btn class="edit-step-btn-confirm" label="Confirmar" @click="onSubmit" />
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import type { Node, GraphNode } from '@vue-flow/core';
import { ref } from 'vue';
import Icons from '../components/IconsItem.vue';

const props = defineProps<{
  isOpenEditNode: boolean;
  node: Node;
  conditionals: GraphNode[];
}>();

const { isOpenEditNode, node, conditionals } = props;

const label = ref(node.data.label || '');

const conditionalNodes = ref<GraphNode[]>(conditionals || []);

const conditionalLabels = ref<string[]>([]);

conditionalNodes.value.forEach((conditional) => {
  conditionalLabels.value.push(conditional.data.label || '');
});

const emit = defineEmits(['editNode', 'closeEditNode', 'removeNode']);

function onSubmit() {
  emit('editNode', {
    node: {
      ...node,
      data: {
        ...node.data,
        label: label.value,
      },
    },
    conditionals: conditionalNodes.value.map((conditional) => ({
      ...(conditional || {}),
      data: {
        ...(conditional?.data || {}),
        label: conditionalLabels.value[conditionalNodes.value.indexOf(conditional)],
      },
    })),
  });
}
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
.edit-step-drawer {
  min-height: 100%;
}
.edit-step-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.edit-step-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
}
.edit-step-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
  display: inline-block;
  vertical-align: middle;
}
.edit-step-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit-step-btn-delete {
  color: #e53935;
  font-weight: 500;
  background: transparent;
  border: none;
}
.edit-step-btn-cancel {
  color: #222;
  font-weight: 500;
  background: transparent;
  border: none;
}
.edit-step-btn-confirm {
  background: #222;
  color: #fff;
  border-radius: 8px;
  font-weight: 500;
  min-width: 110px;
}
</style>
