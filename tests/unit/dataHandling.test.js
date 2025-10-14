import ForceGraph3D from '../../src/3d-force-graph.js';
import { 
  generateMinimalGraphData, 
  generateCustomNodeData,
  generateMalformedGraphData,
  generateLargeGraphData
} from '../mocks/testData.js';
import { createMockContainer } from '../mocks/domUtils.js';
import '../mocks/threejs.mock.js';

describe('ForceGraph3D - Data Handling', () => {
  let container;
  let graph;
  
  beforeEach(() => {
    container = createMockContainer();
    document.body.appendChild(container);
    graph = ForceGraph3D()(container);
  });
  
  afterEach(() => {
    if (graph && typeof graph.stopAnimation === 'function') {
      graph.stopAnimation();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Graph Data Loading', () => {
    test('should load minimal graph data correctly', () => {
      const testData = generateMinimalGraphData();
      
      graph.graphData(testData);
      const currentData = graph.graphData();
      
      expect(currentData.nodes).toHaveLength(2);
      expect(currentData.links).toHaveLength(1);
      expect(currentData.nodes[0]).toHaveProperty('id', 'node1');
      expect(currentData.nodes[1]).toHaveProperty('id', 'node2');
    });

    test('should load custom node properties', () => {
      const testData = generateCustomNodeData();
      
      graph.graphData(testData);
      const currentData = graph.graphData();
      
      expect(currentData.nodes[0]).toHaveProperty('group', 'A');
      expect(currentData.nodes[0]).toHaveProperty('category', 'important');
      expect(currentData.links[0]).toHaveProperty('type', 'friend');
    });

    test('should handle incremental data updates', () => {
      const initialData = generateMinimalGraphData();
      graph.graphData(initialData);
      
      // Add a new node
      const updatedData = {
        nodes: [
          ...initialData.nodes,
          { id: 'node3', name: 'Node 3' }
        ],
        links: [
          ...initialData.links,
          { source: 'node2', target: 'node3' }
        ]
      };
      
      graph.graphData(updatedData);
      const currentData = graph.graphData();
      
      expect(currentData.nodes).toHaveLength(3);
      expect(currentData.links).toHaveLength(2);
    });

    test('should clear previous data when loading new data', () => {
      const firstData = generateMinimalGraphData();
      graph.graphData(firstData);
      
      const secondData = generateCustomNodeData();
      graph.graphData(secondData);
      
      const currentData = graph.graphData();
      expect(currentData.nodes).toHaveLength(2);
      expect(currentData.nodes[0].id).toBe('custom1');
    });
  });

  describe('JSON URL Loading', () => {
    test('should accept JSON URL', () => {
      const testUrl = 'https://example.com/graph-data.json';
      
      expect(() => {
        graph.jsonUrl(testUrl);
      }).not.toThrow();
      
      expect(graph.jsonUrl()).toBe(testUrl);
    });

    test('should clear JSON URL when set to null', () => {
      graph.jsonUrl('https://example.com/data.json');
      graph.jsonUrl(null);
      
      expect(graph.jsonUrl()).toBe(null);
    });
  });

  describe('Data Validation and Error Handling', () => {
    test('should handle malformed data gracefully', () => {
      const malformedDataSets = generateMalformedGraphData();
      
      malformedDataSets.forEach((badData, index) => {
        expect(() => {
          graph.graphData(badData);
        }).not.toThrow(`Failed on malformed data set ${index}`);
      });
    });

    test('should handle null or undefined data', () => {
      expect(() => {
        graph.graphData(null);
      }).not.toThrow();
      
      expect(() => {
        graph.graphData(undefined);
      }).not.toThrow();
    });

    test('should handle empty arrays', () => {
      const emptyData = { nodes: [], links: [] };
      
      expect(() => {
        graph.graphData(emptyData);
      }).not.toThrow();
      
      const currentData = graph.graphData();
      expect(currentData.nodes).toEqual([]);
      expect(currentData.links).toEqual([]);
    });
  });

  describe('Large Dataset Handling', () => {
    test('should handle large datasets', () => {
      const largeData = generateLargeGraphData(100, 200);
      
      expect(() => {
        graph.graphData(largeData);
      }).not.toThrow();
      
      const currentData = graph.graphData();
      expect(currentData.nodes).toHaveLength(100);
      expect(currentData.links).toHaveLength(200);
    });

    test('should perform reasonably with very large datasets', () => {
      const veryLargeData = generateLargeGraphData(1000, 2000);
      
      const startTime = performance.now();
      graph.graphData(veryLargeData);
      const endTime = performance.now();
      
      // Should not take more than 1 second to load data
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('Data Structure Integrity', () => {
    test('should maintain node references in links', () => {
      const testData = generateMinimalGraphData();
      graph.graphData(testData);
      
      const currentData = graph.graphData();
      const nodeIds = currentData.nodes.map(n => n.id);
      
      currentData.links.forEach(link => {
        expect(nodeIds).toContain(link.source);
        expect(nodeIds).toContain(link.target);
      });
    });

    test('should preserve original data properties', () => {
      const testData = generateCustomNodeData();
      const originalNode = testData.nodes[0];
      
      graph.graphData(testData);
      const currentData = graph.graphData();
      const loadedNode = currentData.nodes.find(n => n.id === originalNode.id);
      
      expect(loadedNode.name).toBe(originalNode.name);
      expect(loadedNode.val).toBe(originalNode.val);
      expect(loadedNode.color).toBe(originalNode.color);
      expect(loadedNode.group).toBe(originalNode.group);
    });

    test('should handle duplicate node IDs', () => {
      const dataWithDuplicates = {
        nodes: [
          { id: 'duplicate', name: 'First' },
          { id: 'duplicate', name: 'Second' },
          { id: 'unique', name: 'Unique' }
        ],
        links: []
      };
      
      expect(() => {
        graph.graphData(dataWithDuplicates);
      }).not.toThrow();
      
      const currentData = graph.graphData();
      // Should handle duplicates gracefully (exact behavior depends on implementation)
      expect(currentData.nodes.length).toBeGreaterThan(0);
    });
  });

  describe('Data Accessor Configuration', () => {
    test('should use custom node ID accessor', () => {
      const customData = {
        nodes: [
          { customId: 'node1', name: 'Node 1' },
          { customId: 'node2', name: 'Node 2' }
        ],
        links: [
          { source: 'node1', target: 'node2' }
        ]
      };
      
      graph.nodeId('customId').graphData(customData);
      
      expect(graph.nodeId()).toBe('customId');
    });

    test('should use custom link source/target accessors', () => {
      const customData = {
        nodes: [
          { id: 'node1', name: 'Node 1' },
          { id: 'node2', name: 'Node 2' }
        ],
        links: [
          { from: 'node1', to: 'node2' }
        ]
      };
      
      graph
        .linkSource('from')
        .linkTarget('to')
        .graphData(customData);
      
      expect(graph.linkSource()).toBe('from');
      expect(graph.linkTarget()).toBe('to');
    });

    test('should handle function-based accessors', () => {
      const testData = generateCustomNodeData();
      
      // Test function-based node value accessor
      graph.nodeVal(node => node.val * 2);
      graph.graphData(testData);
      
      expect(typeof graph.nodeVal()).toBe('function');
    });

    test('should handle nested property accessors', () => {
      const nestedData = {
        nodes: [
          { 
            id: 'node1', 
            properties: { 
              display: { name: 'Nested Name', color: '#ff0000' }
            }
          }
        ],
        links: []
      };
      
      graph
        .nodeLabel('properties.display.name')
        .nodeColor('properties.display.color')
        .graphData(nestedData);
      
      expect(graph.nodeLabel()).toBe('properties.display.name');
      expect(graph.nodeColor()).toBe('properties.display.color');
    });
  });
});
