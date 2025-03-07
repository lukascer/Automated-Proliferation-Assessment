import React from 'react';
import { Canvas } from 'reaflow';
// import 'reaflow/dist/style.css';

const data = {
  nodes: [
    { id: 'root', text: 'Senzorová data\n(150 mg/dl)' },
    { id: 'prev', text: 'Předchozí stav\n(140 mg/dl)' },
    { id: 'current', text: 'Nynější stav\n(150 mg/dl)' },
  ],
  edges: [
    { id: 'edge1', from: 'root', to: 'prev' },
    { id: 'edge2', from: 'root', to: 'current' },
  ],
};

const DecisionTreeReaflow = () => {
  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Canvas
        nodes={data.nodes}
        edges={data.edges}
        direction="TB" // top to bottom layout
        node={
          {
            // custom styles
          }
        }
      />
    </div>
  );
};

export default DecisionTreeReaflow;
