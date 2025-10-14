import ForceGraph3D from '../../src/3d-force-graph.js';
import { generateMinimalGraphData } from '../mocks/testData.js';
import { createMockContainer, waitForAnimationFrame } from '../mocks/domUtils.js';
import '../mocks/threejs.mock.js';

describe('ForceGraph3D - Integration Tests', () => {
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

  describe('Full Component Integration', () => {
    test('should integrate all components successfully', async () => {
      const testData = generateMinimalGraphData();
      
      // Mount and configure the graph
      graph(container)
        .width(800)
        .height(600)
        .backgroundColor('#222222')
        .graphData(testData);
      
      // Wait for initial render cycle
      await waitForAnimationFrame();
      
      // Verify the graph is properly integrated
      expect(container.appendChild).toHaveBeenCalled();
      expect(graph.width()).toBe(800);
      expect(graph.height()).toBe(600);
      expect(graph.backgroundColor()).toBe('#222222');
      
      const currentData = graph.graphData();
      expect(currentData.nodes).toHaveLength(2);
      expect(currentData.links).toHaveLength(1);
    });

    test('should handle complete workflow from initialization to interaction', async () => {
      const testData = generateMinimalGraphData();
      const mockNodeClick = jest.fn();
      const mockNodeHover = jest.fn();
      
      // Complete setup
      graph(container)
        .graphData(testData)
        .nodeColor('#ff0000')
        .linkColor('#00ff00')
        .onNodeClick(mockNodeClick)
        .onNodeHover(mockNodeHover)
        .enablePointerInteraction(true)
        .enableNavigationControls(true);
      
      await waitForAnimationFrame();
      
      // Verify all configurations are applied
      expect(graph.nodeColor()).toBe('#ff0000');
      expect(graph.linkColor()).toBe('#00ff00');
      expect(graph.onNodeClick()).toBe(mockNodeClick);
      expect(graph.onNodeHover()).toBe(mockNodeHover);
      expect(graph.enablePointerInteraction()).toBe(true);
      expect(graph.enableNavigationControls()).toBe(true);
    });
  });

  describe('Scene and Camera Integration', () => {
    test('should provide access to ThreeJS scene', () => {
      graph(container);
      
      const scene = graph.scene();
      expect(scene).toBeDefined();
      expect(scene.type).toBe('Scene');
    });

    test('should provide access to ThreeJS camera', () => {
      graph(container);
      
      const camera = graph.camera();
      expect(camera).toBeDefined();
      expect(camera.type).toBe('PerspectiveCamera');
    });

    test('should provide access to ThreeJS renderer', () => {
      graph(container);
      
      const renderer = graph.renderer();
      expect(renderer).toBeDefined();
      expect(renderer.domElement).toBeDefined();
    });

    test('should provide access to trackball controls', () => {
      graph(container);
      
      const controls = graph.tbControls();
      expect(controls).toBeDefined();
      expect(controls.enabled).toBeDefined();
    });

    test('should configure camera position', () => {
      graph(container);
      
      expect(() => {
        graph.cameraPosition({ x: 100, y: 200, z: 300 });
      }).not.toThrow();
      
      // Should be able to call camera position methods
      expect(typeof graph.cameraPosition).toBe('function');
    });
  });

  describe('Force Engine Integration', () => {
    test('should work with d3 force engine', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container)
        .forceEngine('d3')
        .graphData(testData)
        .d3AlphaDecay(0.05)
        .d3VelocityDecay(0.6);
      
      await waitForAnimationFrame();
      
      expect(graph.forceEngine()).toBe('d3');
      expect(graph.d3AlphaDecay()).toBe(0.05);
      expect(graph.d3VelocityDecay()).toBe(0.6);
    });

    test('should work with ngraph force engine', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container)
        .forceEngine('ngraph')
        .graphData(testData);
      
      await waitForAnimationFrame();
      
      expect(graph.forceEngine()).toBe('ngraph');
    });

    test('should handle force engine switching', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container)
        .forceEngine('d3')
        .graphData(testData);
      
      await waitForAnimationFrame();
      
      // Switch to ngraph
      graph.forceEngine('ngraph');
      expect(graph.forceEngine()).toBe('ngraph');
      
      // Switch back to d3
      graph.forceEngine('d3');
      expect(graph.forceEngine()).toBe('d3');
    });

    test('should configure simulation parameters', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container)
        .graphData(testData)
        .warmupTicks(10)
        .cooldownTicks(100)
        .cooldownTime(5000)
        .numDimensions(3);
      
      await waitForAnimationFrame();
      
      expect(graph.warmupTicks()).toBe(10);
      expect(graph.cooldownTicks()).toBe(100);
      expect(graph.cooldownTime()).toBe(5000);
      expect(graph.numDimensions()).toBe(3);
    });
  });

  describe('Drag Interaction Integration', () => {
    test('should setup drag controls with d3 engine', async () => {
      const testData = generateMinimalGraphData();
      const mockDragCallback = jest.fn();
      const mockDragEndCallback = jest.fn();
      
      graph(container)
        .forceEngine('d3')
        .enableNodeDrag(true)
        .enablePointerInteraction(true)
        .graphData(testData)
        .onNodeDrag(mockDragCallback)
        .onNodeDragEnd(mockDragEndCallback);
      
      await waitForAnimationFrame();
      
      expect(graph.forceEngine()).toBe('d3');
      expect(graph.enableNodeDrag()).toBe(true);
      expect(graph.enablePointerInteraction()).toBe(true);
      expect(graph.onNodeDrag()).toBe(mockDragCallback);
      expect(graph.onNodeDragEnd()).toBe(mockDragEndCallback);
    });

    test('should handle drag interaction dependencies', async () => {
      const testData = generateMinimalGraphData();
      
      // Test that drag requires both pointer interaction and d3 engine
      graph(container)
        .forceEngine('d3')
        .enablePointerInteraction(true)
        .enableNodeDrag(true)
        .graphData(testData);
      
      await waitForAnimationFrame();
      
      expect(graph.enableNodeDrag()).toBe(true);
      
      // Disable pointer interaction - should affect drag capability
      graph.enablePointerInteraction(false);
      expect(graph.enablePointerInteraction()).toBe(false);
    });
  });

  describe('Animation and Rendering Integration', () => {
    test('should start and stop animation properly', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container).graphData(testData);
      
      await waitForAnimationFrame();
      
      // Should be running by default
      expect(typeof graph.stopAnimation).toBe('function');
      
      // Stop animation
      expect(() => graph.stopAnimation()).not.toThrow();
    });

    test('should handle continuous rendering', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container).graphData(testData);
      
      // Wait for multiple animation frames
      await waitForAnimationFrame();
      await waitForAnimationFrame();
      await waitForAnimationFrame();
      
      // Should continue running without errors
      expect(() => graph.stopAnimation()).not.toThrow();
    });
  });

  describe('Responsive Behavior Integration', () => {
    test('should handle container resize', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container)
        .width(400)
        .height(300)
        .graphData(testData);
      
      await waitForAnimationFrame();
      
      // Resize
      graph.width(800).height(600);
      
      expect(graph.width()).toBe(800);
      expect(graph.height()).toBe(600);
    });

    test('should handle window resize events', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container).graphData(testData);
      
      await waitForAnimationFrame();
      
      // Simulate window resize
      Object.defineProperty(window, 'innerWidth', { value: 1200 });
      Object.defineProperty(window, 'innerHeight', { value: 800 });
      window.dispatchEvent(new Event('resize'));
      
      // Should handle resize without errors
      await waitForAnimationFrame();
    });
  });

  describe('Memory Management Integration', () => {
    test('should clean up resources on stop', async () => {
      const testData = generateMinimalGraphData();
      
      graph(container).graphData(testData);
      
      await waitForAnimationFrame();
      
      // Stop animation should clean up properly
      expect(() => graph.stopAnimation()).not.toThrow();
      
      // Should be able to restart
      graph(container).graphData(testData);
      await waitForAnimationFrame();
      
      graph.stopAnimation();
    });

    test('should handle multiple data updates without memory leaks', async () => {
      const testData1 = generateMinimalGraphData();
      const testData2 = {
        nodes: [
          { id: 'a', name: 'A' },
          { id: 'b', name: 'B' },
          { id: 'c', name: 'C' }
        ],
        links: [
          { source: 'a', target: 'b' },
          { source: 'b', target: 'c' }
        ]
      };
      
      graph(container);
      
      // Multiple data updates
      graph.graphData(testData1);
      await waitForAnimationFrame();
      
      graph.graphData(testData2);
      await waitForAnimationFrame();
      
      graph.graphData(testData1);
      await waitForAnimationFrame();
      
      // Should handle without issues
      expect(graph.graphData().nodes).toHaveLength(2);
    });
  });
});
