// src/components/FlowBuilder.jsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { nodeTypes } from './NodeTypes';
import Sidebar from './Sidebar';
import FlowPreview from './FlowPreview';
import { validateFlow } from '../utils/validation';

const initialNodes = [];
const initialEdges = [];

const FlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Called by the Sidebar to add new nodes
  const addNode = (nodeData) => {
    setNodes((nds) => [...nds, nodeData]);
  };

  // Save the flow configuration after validation
  const saveConfiguration = () => {
    const isValid = validateFlow(nodes, edges);
    if (isValid) {
      const config = { nodes, edges };
      console.log('Flow configuration saved:', config);
      alert('Flow configuration saved successfully!');
    } else {
      alert('Flow is not valid. Please ensure you have both start and end nodes.');
    }
  };

  return (
    <ReactFlowProvider>
      <div className="flow-builder-container">
        <div className="sidebar-container">
          <Sidebar addNode={addNode} />
        </div>
        <div className="flow-area">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
        <div className="preview-container">
          <FlowPreview nodes={nodes} edges={edges} />
          <button onClick={saveConfiguration} className="save-button">
            Save Configuration
          </button>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
