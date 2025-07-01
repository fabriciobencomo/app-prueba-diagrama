<template>
  <q-drawer elevated v-model="isOpenAddNode" :width="400" bordered overlay side="right">
    <div class="row items-center justify-between q-pa-md">
      <div class="text-h6">Agregar un paso</div>
      <q-btn flat round dense icon="close" @click="$emit('toggleOpenAddNode')" />
    </div>
    <div class="q-pa-md">
      <h3 class="text-subtitle1 text-bold step-color-green">Tipos de paso simple</h3>
      <button class="step-container drawer-btn simple" @click="onClick('simple')">
        <Icons name="simple" />
        Paso simple
      </button>

      <h3 class="text-subtitle1 text-bold step-color-orange">Tipos de paso brunch</h3>
      <button class="step-container drawer-btn brunch" @click="onClick('conditional')">
        <Icons name="brunch" />
        Paso brunch
      </button>

      <h3 class="text-subtitle1 text-bold step-color-brown">Otros tipos de paso</h3>
      <button v-if="canAddGotoNode" class="step-container drawer-btn goto" @click="onClick('goto')">
        <Icons name="goto" />
        Paso ir a
      </button>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import Icons from '../components/IconsItem.vue';

const props = defineProps({
  isOpenAddNode: {
    type: Boolean,
    required: true,
  },
  canAddGotoNode: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const { isOpenAddNode } = props;

const emit = defineEmits(['addSimpleNode', 'addBrunchNode', 'addGotoNode', 'toggleOpenAddNode']);

function onClick(type: string) {
  if (type === 'simple') {
    emit('addSimpleNode', type);
    return;
  }
  if (type === 'conditional') {
    emit('addBrunchNode', type);
    return;
  }
  if (type === 'goto') {
    emit('addGotoNode', type);
    return;
  }
}
</script>

<script lang="ts">
export default {};
</script>
