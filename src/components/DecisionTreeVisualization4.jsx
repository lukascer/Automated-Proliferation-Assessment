import React from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

// Default node style using the primary color (#ff0071)
const nodeStyle = {
  background: '#ff0071',
  color: '#fff',
  padding: 10,
  borderRadius: 5,
  border: '1px solid #ff0071',
};

// Highlighted node style (green styling)
const highlightedNodeStyle = {
  background: '#e0ffe0', // light green background
  color: '#000',
  padding: 10,
  borderRadius: 5,
  border: '2px solid #00ff00', // green border
};

// Highlighted edge style (green line)
const highlightedEdgeStyle = {
  stroke: '#00ff00',
  strokeWidth: 3,
};

// Neuroendocrine Tumor Decision Tree Data
const initialNodes = [
  { id: '1', data: { label: 'Neuroendocrine Tumor' }, position: { x: 300, y: 0 }, style: nodeStyle },
  { id: '2', data: { label: 'Well-Differentiated' }, position: { x: 150, y: 150 }, style: nodeStyle },
  { id: '3', data: { label: 'Poorly-Differentiated' }, position: { x: 450, y: 150 }, style: nodeStyle },
  { id: '4', data: { label: 'Localized Disease' }, position: { x: 0, y: 300 }, style: nodeStyle },
  { id: '5', data: { label: 'Regional Disease' }, position: { x: 200, y: 300 }, style: nodeStyle },
  { id: '6', data: { label: 'Metastatic: Low-Grade' }, position: { x: 400, y: 300 }, style: nodeStyle },
  { id: '7', data: { label: 'Metastatic: High-Grade' }, position: { x: 600, y: 300 }, style: nodeStyle },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e2-5', source: '2', target: '5', animated: true },
  { id: 'e3-6', source: '3', target: '6', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
];

/**
 * DecisionTreeReactFlow Component
 *
 * Props:
 * - highlightPath: an array of node IDs that defines the path to be highlighted.
 *   (Default: ['1', '3', '6'] representing one measurement path)
 *
 * This component renders a decision tree visualization using React Flow.
 * Nodes and edges that belong to the highlightPath are styled with green.
 */
const DecisionTreeReactFlow = ({ highlightPath = ['1', '3', '6'] }) => {
  // Update nodes: if a node's id is in highlightPath, apply the highlighted style.
  const newNodes = initialNodes.map((node) => {
    if (highlightPath && highlightPath.includes(node.id)) {
      return { ...node, style: highlightedNodeStyle };
    }
    return node;
  });

  // Update edges: highlight the edge if both source and target are in highlightPath and are consecutive.
  const newEdges = initialEdges.map((edge) => {
    if (highlightPath && highlightPath.includes(edge.source) && highlightPath.includes(edge.target)) {
      const sourceIndex = highlightPath.indexOf(edge.source);
      const targetIndex = highlightPath.indexOf(edge.target);
      // Highlight edge only if target immediately follows source in the path
      if (targetIndex === sourceIndex + 1) {
        return { ...edge, style: highlightedEdgeStyle };
      }
    }
    return edge;
  });

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        border: '2px solid #ff0071',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow nodes={newNodes} edges={newEdges} fitView>
          <Controls />
          <Background color="#ff0071" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

// Set default props for the measurement path
DecisionTreeReactFlow.defaultProps = {
  highlightPath: ['1', '3', '6'],
};

export default DecisionTreeReactFlow;
