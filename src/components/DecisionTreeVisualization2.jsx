import React from 'react';
import {Tree} from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

const data = {
  name: 'Senzorová data',
  children: [
    {
      name: 'Předchozí stav',
      children: [
        { name: 'Glukóza: 140 mg/dl' },
        { name: 'Tlak: 125/80 mmHg' },
        { name: 'Vyhodnocení: Normální' },
      ],
    },
    {
      name: 'Nynější stav',
      children: [
        { name: 'Glukóza: 150 mg/dl' },
        { name: 'Tlak: 130/85 mmHg' },
        { name: 'Vyhodnocení: Mírně zvýšená' },
      ],
    },
  ],
};

function DecisionTreeVisualization2() {
  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ddd' }}>
      <Tree
        data={data}
        height={400}
        width={600}
        svgProps={{
          transform: 'translate(50,50)',
        }}
        animated={true}
        nodeRadius={15}
        margins={{ top: 20, bottom: 20, left: 20, right: 20 }}
      />
    </div>
  );
}

export default DecisionTreeVisualization2;
