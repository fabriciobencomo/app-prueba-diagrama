import { ref } from 'vue';
import type { Node } from '@vue-flow/core';

export function useStepSelection(
  getSteps: { value: Node[] },
  updateStep: (id: string, data: Record<string, unknown>) => void,
) {
  const goToStepNode = ref<Node | null>(null);

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

  return {
    goToStepNode,
    highlightSelectableSteps,
    removeHighlightSelectableSteps,
  };
}
