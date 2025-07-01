<!-- IconsItem.vue - Componente de íconos SVG reutilizables -->

<!-- Template: Renderiza el SVG correspondiente según el nombre -->
<template>
  <!-- Ícono plus -->
  <svg
    v-if="iconName === 'plus'"
    :key="'plus-' + iconName"
    data-name="Modo de aislamiento"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15.6 15.6"
    class="diagram-icon"
  >
    <line
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="3px"
      x1="7.8"
      y1="1.5"
      x2="7.8"
      y2="14.1"
    />
    <line
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="3px"
      x1="1.5"
      y1="7.8"
      x2="14.1"
      y2="7.8"
    />
  </svg>

  <!-- Ícono brunch -->
  <svg
    v-else-if="iconName === 'brunch'"
    :key="'brunch-' + iconName"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.58 19.83"
    class="icon-svg"
  >
    <g>
      <g>
        <path
          d="M2.92,14.39v-1.82c0-1,.9-1.82,2-1.82h2.96"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linejoin="round"
          fill="none"
        />
        <circle
          cx="2.92"
          cy="16.91"
          r="2.22"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-miterlimit="10"
          fill="none"
        />
      </g>
      <g>
        <path
          d="M16.66,14.39v-1.82c0-1-.9-1.82-2-1.82h-2.96"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linejoin="round"
          fill="none"
        />
        <circle
          cx="16.66"
          cy="16.91"
          r="2.22"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-miterlimit="10"
          fill="none"
        />
      </g>
    </g>
    <circle
      cx="9.79"
      cy="10.66"
      r="2"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <line
      x1="9.79"
      y1="8.16"
      x2="9.79"
      y2="5.16"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-miterlimit="10"
    />
    <circle
      cx="9.79"
      cy="2.92"
      r="2.22"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-miterlimit="10"
      fill="none"
    />
  </svg>

  <!-- Ícono simple -->
  <svg
    v-else-if="iconName === 'simple'"
    :key="'simple-' + iconName"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17.3 19.16"
    class="icon-svg"
  >
    <path
      d="M13.73,17.05c0,.8-.66,1.46-1.46,1.46H2.11c-.8,0-1.46-.66-1.46-1.46V5.02c0-.8.66-1.46,1.46-1.46h8.19l3.43,2.57v10.91Z"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linejoin="round"
      fill="none"
    />
    <line
      x1="3.12"
      y1="8.33"
      x2="11.14"
      y2="8.33"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <line
      x1="3.12"
      y1="11.24"
      x2="11.14"
      y2="11.24"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <line
      x1="3.12"
      y1="14.16"
      x2="11.14"
      y2="14.16"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <polyline
      points="13.69 6.14 10.41 6.14 10.41 3.59"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linejoin="round"
      fill="none"
    />
    <path
      d="M3.57,3.22v-1.12c0-.8.66-1.46,1.46-1.46h8.19l3.43,2.57v10.91c0,.8-.66,1.46-1.46,1.46h-1.49"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linejoin="round"
      fill="none"
    />
    <polyline
      points="16.61 3.22 13.33 3.22 13.33 .67"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>

  <!-- Ícono goto -->
  <svg
    v-else-if="iconName === 'goto'"
    :key="'goto-' + iconName"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.21 16.4"
    class="icon-svg"
  >
    <path
      d="M2.7,11.2v-6c0-2.2,1.68-4,3.73-4s3.73,1.8,3.73,4v6c0,2.2,1.65,4,3.67,4s3.67-1.8,3.67-4v-6"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <circle
      cx="2.7"
      cy="13.7"
      r="2"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <circle
      cx="17.51"
      cy="2.7"
      r="2"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>

  <span v-else :key="iconName + '-empty'" class="diagram-icon diagram-icon--empty">?</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// Props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
// Computed para el nombre del ícono
const iconName = computed(() => props.name);
</script>

<script lang="ts">
// Export explícito para mejor integración
export default {
  name: 'IconsItem',
};
</script>

<style scoped>
.diagram-icon {
  transition:
    transform 0.15s cubic-bezier(0.4, 2, 0.6, 1),
    color 0.2s;
  display: inline-block;
}
.diagram-icon:hover {
  transform: scale(1.15);
  color: #1565c0;
}
.diagram-icon--empty {
  font-size: 1.5em;
  color: #bbb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
