import { nextTick } from 'vue';
import type { Node, Edge } from '@vue-flow/core';

interface DiagramActionsDeps {
  addSteps: (nodes: Node[]) => void;
  removeConnections: (ids: string[]) => void;
  addConnections: (edges: Edge[]) => void;
  setSteps: (nodes: Node[]) => void;
  getSteps: { value: Node[] };
  getConnections: { value: Edge[] };
  layout: (nodes: Node[], edges: Edge[]) => Node[];
  fitView: (opts: { offset: { x: number; y: number } }) => Promise<void>;
  getDescendants: (id: string, edges: Edge[], acc: Set<string>) => Set<string>;
}

export function useDiagramActions({
  addSteps,
  removeConnections,
  addConnections,
  setSteps,
  getSteps,
  getConnections,
  layout,
  fitView,
  getDescendants,
}: DiagramActionsDeps) {
  // Agrega un paso y sus conexiones
  function addStepAndConnections({
    node,
    edges = [],
    extraNodes = [],
    edgeToRemove,
  }: {
    node: Node;
    edges: Edge[];
    extraNodes?: Node[];
    edgeToRemove: string;
  }) {
    addSteps([node, ...extraNodes]);
    removeConnections([edgeToRemove]);
    addConnections(edges);
    autoLayoutDiagram();
    void nextTick(async () => {
      await nextTick();
      autoLayoutDiagram();
    });
  }

  // Elimina un paso y todos sus descendientes
  function removeStepWithDescendants(id: string, closeEditStepDrawer: () => void) {
    const allSteps = getSteps.value;
    const allConnections = getConnections.value;
    const stepToRemove = allSteps.find((n: Node) => n.id === id);
    if (!stepToRemove) return;
    const descendants = getDescendants(id, allConnections, new Set());
    const parentEdge = allConnections.find((e: Edge) => e.target === id);
    const parentId = parentEdge ? parentEdge.source : null;
    const stepsToRemove = new Set([id, ...descendants]);
    const remainingSteps = allSteps.filter((n: Node) => !stepsToRemove.has(n.id));
    const remainingConnections = allConnections.filter(
      (e: Edge) => !stepsToRemove.has(e.source) && !stepsToRemove.has(e.target),
    );
    const newOutputId = `output_${Date.now()}`;
    const newOutputStep: Node = {
      id: newOutputId,
      type: 'output',
      position: { x: stepToRemove.position.x + 100, y: stepToRemove.position.y },
      data: { label: 'Fin' },
    };
    remainingSteps.push(newOutputStep);
    if (parentId) {
      remainingConnections.push({
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

  // Relayout automático del diagrama
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

  return {
    addStepAndConnections,
    removeStepWithDescendants,
    autoLayoutDiagram,
  };
}
