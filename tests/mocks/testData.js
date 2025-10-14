// Test data generators for 3D Force Graph tests

export const generateNode = (overrides = {}) => ({
  id: `node-${Math.random().toString(36).substr(2, 9)}`,
  name: `Node ${Math.floor(Math.random() * 1000)}`,
  val: Math.floor(Math.random() * 20) + 1,
  color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  x: (Math.random() - 0.5) * 200,
  y: (Math.random() - 0.5) * 200,
  z: (Math.random() - 0.5) * 200,
  ...overrides,
});

export const generateLink = (sourceId, targetId, overrides = {}) => ({
  source: sourceId,
  target: targetId,
  name: `Link ${sourceId}-${targetId}`,
  color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  value: Math.floor(Math.random() * 10) + 1,
  ...overrides,
});

export const generateGraphData = (nodeCount = 10, linkCount = 15) => {
  const nodes = Array.from({ length: nodeCount }, () => generateNode());
  const links = Array.from({ length: linkCount }, (_, i) => {
    const sourceIndex = Math.floor(Math.random() * nodeCount);
    let targetIndex = Math.floor(Math.random() * nodeCount);
    
    // Ensure source and target are different
    while (targetIndex === sourceIndex && nodeCount > 1) {
      targetIndex = Math.floor(Math.random() * nodeCount);
    }
    
    return generateLink(nodes[sourceIndex].id, nodes[targetIndex].id);
  });
  
  return { nodes, links };
};

export const generateLargeGraphData = (nodeCount = 1000, linkCount = 2000) => {
  return generateGraphData(nodeCount, linkCount);
};

export const generateMinimalGraphData = () => ({
  nodes: [
    { id: 'node1', name: 'Node 1' },
    { id: 'node2', name: 'Node 2' },
  ],
  links: [
    { source: 'node1', target: 'node2' }
  ],
});

export const generateEmptyGraphData = () => ({
  nodes: [],
  links: [],
});

export const generateMalformedGraphData = () => [
  // Missing required fields
  { nodes: [{ name: 'No ID' }], links: [] },
  
  // Invalid link references
  {
    nodes: [{ id: 'node1' }],
    links: [{ source: 'node1', target: 'nonexistent' }]
  },
  
  // Non-array nodes/links
  { nodes: 'invalid', links: [] },
  { nodes: [], links: 'invalid' },
  
  // null/undefined data
  null,
  undefined,
  {},
];

export const generateTestColors = () => [
  '#ff0000', // red
  '#00ff00', // green  
  '#0000ff', // blue
  '#ffff00', // yellow
  '#ff00ff', // magenta
  '#00ffff', // cyan
  '#ffffff', // white
  '#000000', // black
];

export const generateCustomNodeData = () => ({
  nodes: [
    {
      id: 'custom1',
      name: 'Custom Node 1',
      val: 10,
      color: '#ff0000',
      group: 'A',
      category: 'important'
    },
    {
      id: 'custom2', 
      name: 'Custom Node 2',
      val: 5,
      color: '#00ff00',
      group: 'B',
      category: 'normal'
    },
  ],
  links: [
    {
      source: 'custom1',
      target: 'custom2',
      name: 'Custom Link',
      value: 3,
      type: 'friend'
    }
  ]
});

export const generateHierarchicalData = () => {
  const nodes = [
    { id: 'root', name: 'Root', level: 0 },
    { id: 'child1', name: 'Child 1', level: 1 },
    { id: 'child2', name: 'Child 2', level: 1 },
    { id: 'grandchild1', name: 'Grandchild 1', level: 2 },
    { id: 'grandchild2', name: 'Grandchild 2', level: 2 },
  ];
  
  const links = [
    { source: 'root', target: 'child1' },
    { source: 'root', target: 'child2' },
    { source: 'child1', target: 'grandchild1' },
    { source: 'child2', target: 'grandchild2' },
  ];
  
  return { nodes, links };
};

export const generateNetworkWithSelfLoops = () => ({
  nodes: [
    { id: 'node1', name: 'Node with self loop' },
    { id: 'node2', name: 'Regular node' },
  ],
  links: [
    { source: 'node1', target: 'node1' }, // self loop
    { source: 'node1', target: 'node2' },
  ]
});

export const generateDisconnectedGraph = () => ({
  nodes: [
    { id: 'island1', name: 'Island 1' },
    { id: 'island2', name: 'Island 2' },
    { id: 'connected1', name: 'Connected 1' },
    { id: 'connected2', name: 'Connected 2' },
  ],
  links: [
    { source: 'connected1', target: 'connected2' }
    // island1 and island2 are disconnected
  ]
});

export default {
  generateNode,
  generateLink, 
  generateGraphData,
  generateLargeGraphData,
  generateMinimalGraphData,
  generateEmptyGraphData,
  generateMalformedGraphData,
  generateTestColors,
  generateCustomNodeData,
  generateHierarchicalData,
  generateNetworkWithSelfLoops,
  generateDisconnectedGraph,
};
