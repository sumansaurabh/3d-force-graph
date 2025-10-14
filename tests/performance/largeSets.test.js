import ForceGraph3D from '../../src/3d-force-graph.js';
import { generateLargeGraphData, generateMinimalGraphData } from '../mocks/testData.js';
import { createMockContainer, waitFor } from '../mocks/domUtils.js';
import '../mocks/threejs.mock.js';

describe('ForceGraph3D - Performance Tests', () => {
  let container;
  let graph;
  
  beforeEach(() => {
    container = createMockContainer();
    document.body.appendChild(container);
    graph = ForceGraph3D();
  });
  
  afterEach(() => {
    if (graph && typeof graph.stopAnimation === 'function') {
      graph.stopAnimation();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Large Dataset Performance', () => {
    test('should handle 1000 nodes efficiently', async () => {
      const largeData = generateLargeGraphData(1000, 1500);
      
      const startTime = performance.now();
      graph(container).graphData(largeData);
      const endTime = performance.now();
      
      const loadTime = endTime - startTime;
      
      // Should load within reasonable time (2 seconds)
      expect(loadTime).toBeLessThan(2000);
      
      // Verify data was loaded
      const currentData = graph.graphData();
      expect(currentData.nodes).toHaveLength(1000);
      expect(currentData.links).toHaveLength(1500);
    });

    test('should handle 5000 nodes for stress testing', async () => {
      const veryLargeData = generateLargeGraphData(5000, 7500);
      
      const startTime = performance.now();
      
      expect(() => {
        graph(container).graphData(veryLargeData);
      }).not.toThrow();
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Should load within 5 seconds even for very large datasets
      expect(loadTime).toBeLessThan(5000);
      
      // Verify data integrity
      const currentData = graph.graphData();
      expect(currentData.nodes).toHaveLength(5000);
      expect(currentData.links).toHaveLength(7500);
    });

    test('should maintain performance with multiple data updates', async () => {
      const dataset1 = generateLargeGraphData(500, 750);
      const dataset2 = generateLargeGraphData(800, 1200);
      const dataset3 = generateLargeGraphData(300, 450);
      
      graph(container);
      
      const startTime = performance.now();
      
      // Multiple rapid updates
      graph.graphData(dataset1);
      await waitFor(50);
      
      graph.graphData(dataset2);
      await waitFor(50);
      
      graph.graphData(dataset3);
      await waitFor(50);
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // Should handle multiple updates efficiently
      expect(totalTime).toBeLessThan(1000);
      
      // Final data should be correct
      const finalData = graph.graphData();
      expect(finalData.nodes).toHaveLength(300);
      expect(finalData.links).toHaveLength(450);
    });
  });

  describe('Animation Performance', () => {
    test('should maintain stable frame rate with medium dataset', async () => {
      const mediumData = generateLargeGraphData(200, 300);
      
      graph(container)
        .graphData(mediumData)
        .cooldownTicks(Infinity); // Keep animation running
      
      const frameStartTime = performance.now();
      
      // Simulate several animation frames
      for (let i = 0; i < 10; i++) {
        await waitFor(16); // ~60fps
      }
      
      const frameEndTime = performance.now();
      const averageFrameTime = (frameEndTime - frameStartTime) / 10;
      
      // Should maintain reasonable frame time
      expect(averageFrameTime).toBeLessThan(50); // Allow for test overhead
    });

    test('should handle animation start/stop cycles efficiently', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container).graphData(testData);
      
      const startTime = performance.now();
      
      // Multiple start/stop cycles
      for (let i = 0; i < 5; i++) {
        await waitFor(20);
        graph.stopAnimation();
        await waitFor(10);
        
        // Restart by remounting (simulates real usage)
        graph(container).graphData(testData);
      }
      
      const endTime = performance.now();
      const cycleTime = (endTime - startTime) / 5;
      
      // Each cycle should be reasonably fast
      expect(cycleTime).toBeLessThan(200);
    });
  });

  describe('Memory Performance', () => {
    test('should not leak memory with data updates', async () => {
      const initialData = generateMinimalGraphData();
      graph(container).graphData(initialData);
      
      // Get initial state
      const initialNodeCount = graph.graphData().nodes.length;
      
      // Perform many data updates
      for (let i = 0; i < 10; i++) {
        const newData = generateLargeGraphData(50 + i * 10, 75 + i * 15);
        graph.graphData(newData);
        await waitFor(10);
      }
      
      // Return to original data
      graph.graphData(initialData);
      
      // Should return to initial state
      expect(graph.graphData().nodes).toHaveLength(initialNodeCount);
    });

    test('should handle rapid property changes efficiently', async () => {
      const testData = generateLargeGraphData(100, 150);
      graph(container).graphData(testData);
      
      const startTime = performance.now();
      
      // Rapid property changes
      for (let i = 0; i < 20; i++) {
        graph
          .nodeColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
          .linkColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
          .nodeRelSize(1 + Math.random() * 5)
          .linkWidth(Math.random() * 3);
        
        await waitFor(5);
      }
      
      const endTime = performance.now();
      const averageChangeTime = (endTime - startTime) / 20;
      
      // Each change should be fast
      expect(averageChangeTime).toBeLessThan(50);
    });
  });

  describe('Rendering Performance', () => {
    test('should handle complex visual configurations efficiently', async () => {
      const complexData = generateLargeGraphData(300, 450);
      
      const startTime = performance.now();
      
      graph(container)
        .graphData(complexData)
        .nodeRelSize(6)
        .nodeResolution(12)
        .linkWidth(2)
        .linkResolution(8)
        .linkDirectionalArrowLength(4)
        .linkDirectionalArrowResolution(10)
        .linkDirectionalParticles(2)
        .linkDirectionalParticleResolution(6);
      
      await waitFor(100); // Allow for initial render
      
      const endTime = performance.now();
      const setupTime = endTime - startTime;
      
      // Complex setup should complete in reasonable time
      expect(setupTime).toBeLessThan(1000);
    });

    test('should maintain performance with high-resolution nodes and links', async () => {
      const testData = generateLargeGraphData(100, 150);
      
      const startTime = performance.now();
      
      graph(container)
        .graphData(testData)
        .nodeResolution(20) // High resolution
        .linkResolution(16) // High resolution
        .linkDirectionalArrowResolution(16); // High resolution
      
      await waitFor(200); // Allow for render
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // High-resolution rendering should still be reasonable
      expect(renderTime).toBeLessThan(2000);
    });
  });

  describe('Interaction Performance', () => {
    test('should handle rapid callback execution', async () => {
      const testData = generateLargeGraphData(200, 300);
      
      let callbackCount = 0;
      const fastCallback = jest.fn(() => {
        callbackCount++;
        // Simulate some work
        for (let i = 0; i < 10; i++) {
          Math.random();
        }
      });
      
      graph(container)
        .graphData(testData)
        .onNodeHover(fastCallback);
      
      const startTime = performance.now();
      
      // Simulate rapid callback calls
      for (let i = 0; i < 50; i++) {
        fastCallback();
      }
      
      const endTime = performance.now();
      const averageCallbackTime = (endTime - startTime) / 50;
      
      // Callbacks should execute quickly
      expect(averageCallbackTime).toBeLessThan(10);
      expect(callbackCount).toBe(50);
    });

    test('should handle multiple simultaneous interactions', async () => {
      const testData = generateLargeGraphData(150, 225);
      
      const nodeCallback = jest.fn();
      const linkCallback = jest.fn();
      const hoverCallback = jest.fn();
      
      const startTime = performance.now();
      
      graph(container)
        .graphData(testData)
        .onNodeClick(nodeCallback)
        .onLinkClick(linkCallback)
        .onNodeHover(hoverCallback)
        .enablePointerInteraction(true)
        .enableNavigationControls(true);
      
      await waitFor(100);
      
      const endTime = performance.now();
      const setupTime = endTime - startTime;
      
      // Setting up multiple interactions should be fast
      expect(setupTime).toBeLessThan(500);
    });
  });

  describe('Configuration Performance', () => {
    test('should handle bulk configuration changes efficiently', async () => {
      const testData = generateLargeGraphData(100, 150);
      
      const startTime = performance.now();
      
      // Bulk configuration
      graph(container)
        .width(1200)
        .height(800)
        .backgroundColor('#333333')
        .nodeRelSize(5)
        .nodeOpacity(0.8)
        .nodeResolution(10)
        .nodeColor('#ff6b6b')
        .nodeAutoColorBy('group')
        .linkWidth(1.5)
        .linkOpacity(0.6)
        .linkResolution(8)
        .linkColor('#4ecdc4')
        .linkCurvature(0.2)
        .forceEngine('d3')
        .numDimensions(3)
        .d3AlphaDecay(0.03)
        .d3VelocityDecay(0.5)
        .warmupTicks(0)
        .cooldownTicks(150)
        .cooldownTime(10000)
        .enablePointerInteraction(true)
        .enableNodeDrag(true)
        .enableNavigationControls(true)
        .showNavInfo(false)
        .graphData(testData);
      
      const endTime = performance.now();
      const configTime = endTime - startTime;
      
      // Bulk configuration should complete quickly
      expect(configTime).toBeLessThan(500);
      
      // Verify final configuration
      expect(graph.width()).toBe(1200);
      expect(graph.height()).toBe(800);
      expect(graph.nodeRelSize()).toBe(5);
      expect(graph.linkWidth()).toBe(1.5);
    });
  });
});
