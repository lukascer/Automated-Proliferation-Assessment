import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';

const DecisionTreeVisNetwork = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = new DataSet([
      { id: 1, label: 'Senzorová data\n(150 mg/dl)' },
      { id: 2, label: 'Předchozí stav\n(140 mg/dl)' },
      { id: 3, label: 'Nynější stav\n(150 mg/dl)' },
    ]);
    const edges = new DataSet([
      { id: '1-2', from: 1, to: 2 },
      { id: '1-3', from: 1, to: 3 },
    ]);
    const data = { nodes, edges };
    const options = {
      layout: {
        hierarchical: {
          direction: 'UD', // up-down
          sortMethod: 'directed',
        },
      },
      edges: {
        smooth: true,
      },
      physics: false,
    };

    const network = new Network(containerRef.current, data, options);

    return () => network.destroy();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px', border: '1px solid #ddd', borderRadius: '8px' }} />
  );
};

export default DecisionTreeVisNetwork;
