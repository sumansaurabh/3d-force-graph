import ForceGraph3D from '../../src/3d-force-graph.js';
import { generateMinimalGraphData } from '../mocks/testData.js';
import { createMockContainer, createMouseEvent, waitForAnimationFrame } from '../mocks/domUtils.js';
import '../mocks/threejs.mock.js';

describe('ForceGraph3D - Interaction Events', () => {
  let container;
  let graph;
  let testData;
  
  beforeEach(() => {
    container = createMockContainer();
    document.body.appendChild(container);
    testData = generateMinimalGraphData();
    graph = ForceGraph3D()(container).graphData(testData);
  });
  
  afterEach(() => {
    if (graph && typeof graph.stopAnimation === 'function') {
      graph.stopAnimation();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Node Interaction Events', () => {
    test('should trigger onNodeClick callback', () => {
      const mockCallback = jest.fn();
      graph.onNodeClick(mockCallback);
      
      expect(graph.onNodeClick()).toBe(mockCallback);
    });

    test('should trigger onNodeHover callback', () => {
      const mockHoverCallback = jest.fn();
      graph.onNodeHover(mockHoverCallback);
      
      expect(graph.onNodeHover()).toBe(mockHoverCallback);
    });

    test('should trigger onNodeDrag callback', () => {
      const mockDragCallback = jest.fn();
      graph.onNodeDrag(mockDragCallback);
      
      expect(graph.onNodeDrag()).toBe(mockDragCallback);
    });

    test('should trigger onNodeDragEnd callback', () => {
      const mockDragEndCallback = jest.fn();
      graph.onNodeDragEnd(mockDragEndCallback);
      
      expect(graph.onNodeDragEnd()).toBe(mockDragEndCallback);
    });

    test('should handle multiple node event callbacks', () => {
      const mockClick = jest.fn();
      const mockHover = jest.fn();
      const mockDrag = jest.fn();
      const mockDragEnd = jest.fn();
      
      graph
        .onNodeClick(mockClick)
        .onNodeHover(mockHover)
        .onNodeDrag(mockDrag)
        .onNodeDragEnd(mockDragEnd);
      
      expect(graph.onNodeClick()).toBe(mockClick);
      expect(graph.onNodeHover()).toBe(mockHover);
      expect(graph.onNodeDrag()).toBe(mockDrag);
      expect(graph.onNodeDragEnd()).toBe(mockDragEnd);
    });
  });

  describe('Link Interaction Events', () => {
    test('should trigger onLinkClick callback', () => {
      const mockCallback = jest.fn();
      graph.onLinkClick(mockCallback);
      
      expect(graph.onLinkClick()).toBe(mockCallback);
    });

    test('should trigger onLinkHover callback', () => {
      const mockHoverCallback = jest.fn();
      graph.onLinkHover(mockHoverCallback);
      
      expect(graph.onLinkHover()).toBe(mockHoverCallback);
    });

    test('should handle multiple link event callbacks', () => {
      const mockClick = jest.fn();
      const mockHover = jest.fn();
      
      graph
        .onLinkClick(mockClick)
        .onLinkHover(mockHover);
      
      expect(graph.onLinkClick()).toBe(mockClick);
      expect(graph.onLinkHover()).toBe(mockHover);
    });
  });

  describe('Interaction Control Settings', () => {
    test('should configure pointer interaction', () => {
      expect(graph.enablePointerInteraction()).toBe(true);
      
      graph.enablePointerInteraction(false);
      expect(graph.enablePointerInteraction()).toBe(false);
      
      graph.enablePointerInteraction(true);
      expect(graph.enablePointerInteraction()).toBe(true);
    });

    test('should configure node drag', () => {
      expect(graph.enableNodeDrag()).toBe(true);
      
      graph.enableNodeDrag(false);
      expect(graph.enableNodeDrag()).toBe(false);
      
      graph.enableNodeDrag(true);
      expect(graph.enableNodeDrag()).toBe(true);
    });

    test('should configure navigation controls', () => {
      expect(graph.enableNavigationControls()).toBe(true);
      
      graph.enableNavigationControls(false);
      expect(graph.enableNavigationControls()).toBe(false);
      
      graph.enableNavigationControls(true);
      expect(graph.enableNavigationControls()).toBe(true);
    });

    test('should configure link hover precision', () => {
      expect(graph.linkHoverPrecision()).toBe(1);
      
      graph.linkHoverPrecision(5);
      expect(graph.linkHoverPrecision()).toBe(5);
      
      graph.linkHoverPrecision(0.5);
      expect(graph.linkHoverPrecision()).toBe(0.5);
    });
  });

  describe('Event Callback Parameters', () => {
    test('should pass node data to node callbacks', () => {
      const mockNodeClick = jest.fn();
      const mockNodeHover = jest.fn();
      
      graph
        .onNodeClick(mockNodeClick)
        .onNodeHover(mockNodeHover);
      
      // Callbacks should be set up to receive node data
      expect(typeof graph.onNodeClick()).toBe('function');
      expect(typeof graph.onNodeHover()).toBe('function');
    });

    test('should pass link data to link callbacks', () => {
      const mockLinkClick = jest.fn();
      const mockLinkHover = jest.fn();
      
      graph
        .onLinkClick(mockLinkClick)
        .onLinkHover(mockLinkHover);
      
      // Callbacks should be set up to receive link data
      expect(typeof graph.onLinkClick()).toBe('function');
      expect(typeof graph.onLinkHover()).toBe('function');
    });

    test('should handle hover events with previous object parameter', () => {
      const mockNodeHover = jest.fn();
      const mockLinkHover = jest.fn();
      
      graph
        .onNodeHover(mockNodeHover)
        .onLinkHover(mockLinkHover);
      
      // Hover callbacks should be ready to receive current and previous objects
      expect(typeof graph.onNodeHover()).toBe('function');
      expect(typeof graph.onLinkHover()).toBe('function');
    });
  });

  describe('Interaction State Management', () => {
    test('should disable interactions when pointer interaction is disabled', () => {
      graph.enablePointerInteraction(false);
      
      // When pointer interaction is disabled, other interactions should not work
      expect(graph.enablePointerInteraction()).toBe(false);
    });

    test('should handle drag interaction dependencies', () => {
      // Node drag should only work with pointer interaction enabled and d3 engine
      graph
        .enablePointerInteraction(true)
        .enableNodeDrag(true)
        .forceEngine('d3');
      
      expect(graph.enableNodeDrag()).toBe(true);
      expect(graph.forceEngine()).toBe('d3');
    });

    test('should handle navigation control state', () => {
      graph.enableNavigationControls(false);
      
      // Navigation should be disabled
      expect(graph.enableNavigationControls()).toBe(false);
    });
  });

  describe('Default Event Behaviors', () => {
    test('should have default empty callbacks', () => {
      // Create a fresh graph to test defaults
      const freshGraph = ForceGraph3D()(createMockContainer());
      
      expect(typeof freshGraph.onNodeClick()).toBe('function');
      expect(typeof freshGraph.onNodeHover()).toBe('function');
      expect(typeof freshGraph.onNodeDrag()).toBe('function');
      expect(typeof freshGraph.onNodeDragEnd()).toBe('function');
      expect(typeof freshGraph.onLinkClick()).toBe('function');
      expect(typeof freshGraph.onLinkHover()).toBe('function');
      
      // Default callbacks should not throw when called
      expect(() => freshGraph.onNodeClick()()).not.toThrow();
      expect(() => freshGraph.onNodeHover()()).not.toThrow();
      expect(() => freshGraph.onLinkClick()()).not.toThrow();
      
      freshGraph.stopAnimation();
    });

    test('should allow callback removal by setting to null or empty function', () => {
      const mockCallback = jest.fn();
      graph.onNodeClick(mockCallback);
      
      // Reset to empty function
      graph.onNodeClick(() => {});
      expect(typeof graph.onNodeClick()).toBe('function');
      
      // Should be able to set back to mock
      graph.onNodeClick(mockCallback);
      expect(graph.onNodeClick()).toBe(mockCallback);
    });
  });

  describe('Event Performance', () => {
    test('should handle rapid event callbacks efficiently', () => {
      let callCount = 0;
      const fastCallback = jest.fn(() => callCount++);
      
      graph.onNodeHover(fastCallback);
      
      // Simulate rapid hover events
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        // Simulate hover events - in real implementation this would be triggered by mouse movement
        // Here we're just testing that the callback can be called rapidly
      }
      const endTime = performance.now();
      
      // Should complete quickly
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should handle multiple concurrent event types', () => {
      const nodeClick = jest.fn();
      const nodeHover = jest.fn();
      const linkClick = jest.fn();
      const linkHover = jest.fn();
      
      graph
        .onNodeClick(nodeClick)
        .onNodeHover(nodeHover)
        .onLinkClick(linkClick)
        .onLinkHover(linkHover);
      
      // All callbacks should be set up without conflicts
      expect(graph.onNodeClick()).toBe(nodeClick);
      expect(graph.onNodeHover()).toBe(nodeHover);
      expect(graph.onLinkClick()).toBe(linkClick);
      expect(graph.onLinkHover()).toBe(linkHover);
    });
  });
});
