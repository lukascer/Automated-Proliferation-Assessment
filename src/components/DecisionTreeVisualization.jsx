import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Tree from 'react-d3-tree';

/**
 * Example tree data.
 * You can adapt it to show any "previous" vs. "current" states
 * or other relevant branches in your medical decision tree.
 */
const treeData = [
  {
    name: 'Senzorová data',
    attributes: {
      Glukóza: '150 mg/dl',
      Tlak: '130/85 mmHg',
      Vyhodnocení: 'Mírně zvýšená',
    },
    children: [
      {
        name: 'Předchozí stav',
        attributes: {
          Glukóza: '140 mg/dl',
          Tlak: '125/80 mmHg',
          Vyhodnocení: 'Normální',
        },
      },
      {
        name: 'Nynější stav',
        attributes: {
          Glukóza: '150 mg/dl',
          Tlak: '130/85 mmHg',
          Vyhodnocení: 'Mírně zvýšená',
        },
      },
    ],
  },
];

/**
 * This function defines how each node is rendered.
 * - A circle for the node
 * - Node name in white text
 * - Node attributes in smaller black text
 */
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      {/* Circle node */}
      <circle
        r={15}
        fill={nodeDatum.children || nodeDatum._children ? '#1976d2' : '#64b5f6'}
        stroke="#fff"
        strokeWidth={2}
        onClick={toggleNode}
        style={{ cursor: 'pointer' }}
      />
      {/* Node name (centered above the circle) */}
      <text fill="#ffffff" x={0} y={5} textAnchor="middle" fontSize={12} fontWeight="bold" pointerEvents="none">
        {nodeDatum.name}
      </text>
      {/* Node attributes (listed to the right) */}
      {nodeDatum.attributes && (
        <text fill="#333" fontSize={12} x={25} y={-5}>
          {Object.entries(nodeDatum.attributes).map(([key, val], i) => (
            <tspan x={25} dy="1.2em" key={i}>
              {`${key}: ${val}`}
            </tspan>
          ))}
        </text>
      )}
    </g>
  );
};

const containerStyles = {
  width: '100%',
  height: '500px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  margin: '1rem 0',
  backgroundColor: '#fff',
};

const DecisionTreeVisualization = ({ sx }) => {
  const treeContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure container size to center the tree
  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.offsetWidth,
        height: treeContainerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <Box style={containerStyles} ref={treeContainerRef} sx={sx}>
      <Tree
        data={treeData}
        renderCustomNodeElement={renderCustomNode}
        orientation="vertical"
        translate={{
          x: dimensions.width / 2,
          y: 50, // top offset
        }}
        pathFunc="elbow" // curved or elbow, etc.
        styles={{
          links: {
            stroke: '#1976d2',
            strokeWidth: 2,
          },
        }}
      />
    </Box>
  );
};

export default DecisionTreeVisualization;
