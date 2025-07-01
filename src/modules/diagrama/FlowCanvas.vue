<template>
  <VueFlow
    :nodes="diagramSteps"
    :edges="diagramConnections"
    @node-click="onStepClick"
    @nodes-initialized="autoLayoutDiagram"
    fit-view-on-init
  >
    <Background />

    <template #node-default="stepProps">
      <StepComponent v-bind="stepProps" />
    </template>

    <template #node-goto="goToProps">
      <GoToStep v-bind="goToProps" />
    </template>

    <template #edge-add-button="edgeProps">
      <AddButtonEdge
        v-bind="edgeProps"
        :activeEdgeId="activeAddEdgeId ?? ''"
        @openAddNodeDrawer="showAddStepDrawer"
      />
    </template>
  </VueFlow>

  <AddStepDrawer
    :isOpenAddNode="isAddStepDrawerOpen"
    v-model="isAddStepDrawerOpen"
    @toggleOpenAddNode="toggleAddStepDrawer"
    @addSimpleNode="addSimpleStep"
    @addBrunchNode="addBrunchStep"
    @addGotoNode="addGoToStep"
    :canAddGotoNode="canAddGotoNode"
  />
  <EditStepDrawer
    :isOpenEditNode="isEditStepDrawerOpen"
    :node="stepToEdit"
    :conditionals="conditionalSteps"
    v-if="stepToEdit !== null"
    v-model="isEditStepDrawerOpen"
    @closeEditNode="closeEditStepDrawer"
    @editNode="updateStepData"
    @removeNode="removeStepWithDescendants"
  />
</template>

<script setup lang="ts">
import { nextTick, ref, computed } from 'vue';
import type { Node, Edge, NodeMouseEvent, GraphNode } from '@vue-flow/core';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { useLayout } from 'src/modules/diagrama/composables/useLayout';
import {
  addButtonEdge,
  brunchEdges,
  brunchNode,
  conditionalNodes,
  goToNode,
  initialEdges,
  initialNodes,
  simpleNode,
} from 'src/modules/diagrama/elements/initial-elements';
import { getDescendants } from 'src/modules/diagrama/helpers';
import AddButtonEdge from 'src/modules/diagrama/components/AddButtonEdge.vue';
import AddStepDrawer from 'src/modules/diagrama/drawers/AddStepDrawer.vue';
import EditStepDrawer from 'src/modules/diagrama/drawers/EditStepDrawer.vue';
import StepComponent from 'src/modules/diagrama/components/StepComponent.vue';
import GoToStep from 'src/modules/diagrama/components/GoToStep.vue';

// Identificador incremental para nuevos pasos
let stepIdCounter = 3;

// VueFlow composables
const {
  findNode: findStep,
  addNodes: addSteps,
  updateNode: updateStep,
  addEdges: addConnections,
  removeEdges: removeConnections,
  fitView,
  getNodes: getSteps,
  getEdges: getConnections,
  setNodes: setSteps,
} = useVueFlow();

const { layout } = useLayout(findStep);

// Estado reactivo
const isAddStepDrawerOpen = ref(false);
const isEditStepDrawerOpen = ref(false);
const edgeToAddStep = ref<Edge | null>(null);
const goToStepNode = ref<Node | null>(null);
const stepToEdit = ref<Node | null>(null);
const conditionalSteps = ref<GraphNode[]>([]);

const diagramSteps = ref<Node[]>(initialNodes);
const diagramConnections = ref<Edge[]>(initialEdges);

const activeAddEdgeId = computed(() => {
  return isAddStepDrawerOpen.value && edgeToAddStep.value ? edgeToAddStep.value.id : null;
});

const canAddGotoNode = computed(() => {
  return getSteps.value.some((n) => n.type !== 'input' && n.type !== 'output');
});

// --- Funciones para manejo de drawers ---
function showAddStepDrawer(edgeProps: Edge) {
  edgeToAddStep.value = edgeProps;
  isEditStepDrawerOpen.value = false;
  isAddStepDrawerOpen.value = true;
}

function toggleAddStepDrawer() {
  isAddStepDrawerOpen.value = !isAddStepDrawerOpen.value;
}

function closeEditStepDrawer() {
  isEditStepDrawerOpen.value = false;
  stepToEdit.value = null;
  conditionalSteps.value = [];
}

function openEditStepDrawer(node: Node, conditionals: GraphNode[] = []) {
  if (node.type !== 'output' && node.type !== 'input') {
    isAddStepDrawerOpen.value = false;
    stepToEdit.value = node;
    conditionalSteps.value = conditionals;
    isEditStepDrawerOpen.value = true;
  }
}

// --- Funciones de manipulación de pasos y conexiones ---
function addStepAndConnections({
  node,
  edges = [],
  extraNodes = [],
}: {
  node: Node;
  edges: Edge[];
  extraNodes?: Node[];
}) {
  addSteps([node, ...extraNodes]);
  removeConnections([edgeToAddStep.value!.id]);
  addConnections(edges);
  autoLayoutDiagram();
  void nextTick(async () => {
    await nextTick();
    autoLayoutDiagram();
  });
  toggleAddStepDrawer();
}

function removeStepWithDescendants(id: string) {
  const allSteps = getSteps.value;
  const allConnections = getConnections.value;
  const stepToRemove = allSteps.find((n) => n.id === id);
  if (!stepToRemove) return;
  const descendants = getDescendants(id, allConnections, new Set());
  const parentEdge = allConnections.find((e) => e.target === id);
  const parentId = parentEdge ? parentEdge.source : null;
  const stepsToRemove = new Set([id, ...descendants]);
  const remainingSteps = allSteps.filter((n) => !stepsToRemove.has(n.id));
  const remainingConnections = allConnections.filter(
    (e) => !stepsToRemove.has(e.source) && !stepsToRemove.has(e.target),
  );
  const newOutputId = `output_${Date.now()}`;
  const newOutputStep: Node = {
    id: newOutputId,
    type: 'output',
    position: { x: stepToRemove.position.x + 100, y: stepToRemove.position.y },
    data: { label: 'Fin' },
  };
  (remainingSteps as Node[]).push(newOutputStep);
  if (parentId) {
    (remainingConnections as Edge[]).push({
      id: `e-${parentId}-${newOutputId}`,
      source: parentId,
      target: newOutputId,
      type: 'add-button',
      data: {},
    });
  }
  setSteps(remainingSteps);
  addConnections(remainingConnections);
  autoLayoutDiagram();
  closeEditStepDrawer();
}

// --- Funciones para agregar tipos de pasos ---
function addSimpleStep() {
  if (!edgeToAddStep.value) return;
  const parentEdge = edgeToAddStep.value;
  const sourceStep = findStep(parentEdge.source);
  const targetStep = findStep(parentEdge.target);
  if (!sourceStep || !targetStep) return;
  const newStepId = `node_${stepIdCounter++}`;
  const newStep = simpleNode(newStepId);
  const newConnections = addButtonEdge(sourceStep, targetStep, newStepId);
  addStepAndConnections({ node: newStep, edges: newConnections });
}

function addBrunchStep() {
  if (!edgeToAddStep.value) return;
  const parentEdge = edgeToAddStep.value;
  const sourceStep = findStep(parentEdge.source);
  const targetStep = findStep(parentEdge.target);
  if (!sourceStep || !targetStep) return;
  const newStepId = `node_${stepIdCounter++}`;
  const newStep = brunchNode(newStepId);
  const alternativeEnds = conditionalNodes(newStepId, stepIdCounter);
  const newConnections = brunchEdges(alternativeEnds, sourceStep, targetStep, newStepId);
  addStepAndConnections({ node: newStep, edges: newConnections, extraNodes: alternativeEnds });
}

function addGoToStep() {
  if (!edgeToAddStep.value) return;
  const parentEdge = edgeToAddStep.value;
  const sourceStep = findStep(parentEdge.source);
  const targetStep = findStep(parentEdge.target);
  const newStepId = `node_${stepIdCounter++}`;
  const newStep = goToNode(newStepId);
  const newConnections = [
    {
      id: `e-${sourceStep!.id}-${newStepId}`,
      source: sourceStep!.id,
      target: newStepId,
      type: 'add-button',
    },
  ];
  removeStep(targetStep!.id);
  addStepAndConnections({ node: newStep, edges: newConnections });
}

function removeStep(id: string) {
  const allSteps = getSteps.value;
  const filteredSteps = allSteps.filter((node) => node.id !== id);
  setSteps(filteredSteps);
}

// --- Funciones de edición y selección ---
function onStepClick(event: NodeMouseEvent) {
  const { node } = event;
  if (!node) return;
  if (!goToStepNode.value) {
    if (node.data.type === 'brunch') {
      const brunchConnections = getConnections.value.filter((e) => e.source === node.id);
      const conditionals = brunchConnections
        .map((e) => findStep(e.target))
        .filter((n): n is GraphNode => n !== undefined);
      openEditStepDrawer(node, conditionals);
    } else if (node.data.type === 'simple') {
      openEditStepDrawer(node);
    } else if (node.data.type === 'goto') {
      goToStepNode.value = node;
      highlightSelectableSteps();
    }
  } else {
    const targetStep = findStep(node.id);
    if (targetStep && (targetStep.data.type === 'brunch' || targetStep.data.type === 'simple')) {
      addConnections([
        {
          id: `e-${goToStepNode.value.id}-${targetStep.id}`,
          source: goToStepNode.value.id,
          target: targetStep.id,
          animated: true,
        },
      ]);
      removeHighlightSelectableSteps();
      updateStep(goToStepNode.value.id, {
        ...goToStepNode.value,
        class: [
          ...(Array.isArray(goToStepNode.value.class)
            ? goToStepNode.value.class.filter((c: string) => c !== 'brunch' && c !== 'simple')
            : typeof goToStepNode.value.class === 'string'
              ? goToStepNode.value.class
                  .split(' ')
                  .filter((c: string) => c !== 'brunch' && c !== 'simple')
              : []),
          targetStep.data.type,
        ],
        data: {
          ...goToStepNode.value.data,
          icon: targetStep.data.type,
        },
      });
      goToStepNode.value = null;
    }
  }
}

function updateStepData(data: { node: Node; conditionals: GraphNode[] }) {
  const { node, conditionals } = data;
  updateStep(node.id, { data: node.data });
  if (conditionals.length > 0) {
    conditionals.forEach((conditional) => {
      updateStep(conditional.id, { data: conditional.data });
    });
  }
  closeEditStepDrawer();
}

function highlightSelectableSteps() {
  const allSteps = getSteps.value;
  allSteps.forEach((node) => {
    if (node.data.type === 'brunch' || node.data.type === 'simple') {
      updateStep(node.id, {
        ...node,
        class: [node.class, 'selectable-target'],
      });
    }
  });
}

function removeHighlightSelectableSteps() {
  const allSteps = getSteps.value;
  allSteps.forEach((n) => {
    if (n.class && Array.isArray(n.class)) {
      updateStep(n.id, {
        ...n,
        class: n.class.filter((c: string) => c !== 'selectable-target'),
      });
    }
  });
}

// --- Auto layout ---
function autoLayoutDiagram() {
  const currentSteps = getSteps.value;
  const currentConnections = getConnections.value;
  void nextTick(async () => {
    const laidOutSteps = layout(currentSteps, currentConnections);
    setSteps(laidOutSteps);
    await nextTick();
    await fitView({
      offset: {
        x: -120,
        y: 0,
      },
    });
  });
}
</script>

<style src="./FlowCanvas.scss" lang="scss"></style>
