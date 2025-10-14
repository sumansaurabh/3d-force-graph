const ForceGraph3D = require('../../src/3d-force-graph.js');
const { generateMinimalGraphData, generateEmptyGraphData } = require('../mocks/testData.js');
const { createMockContainer } = require('../mocks/domUtils.js');
require('../mocks/threejs.mock.js');

describe('ForceGraph3D - Core Functionality', () => {
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

  describe('Initialization', () => {
    test('should create a ForceGraph3D instance', () => {
      expect(graph).toBeDefined();
      expect(typeof graph).toBe('function');
    });

    test('should initialize with default properties', () => {
      expect(graph.nodeRelSize()).toBe(4);
      expect(graph.nodeOpacity()).toBe(0.75);
      expect(graph.linkOpacity()).toBe(0.2);
      expect(graph.backgroundColor()).toBe('#000011');
      expect(graph.showNavInfo()).toBe(true);
    });

    test('should mount to DOM element', () => {
      graph(container);
      
      // Check if container has been modified
      expect(container.appendChild).toHaveBeenCalled();
    });

    test('should create required internal elements when mounted', () => {
      graph(container);
      
      // The graph should create internal structure
      expect(container.appendChild).toHaveBeenCalled();
    });
  });

  describe('Data Input and Validation', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should accept valid graph data', () => {
      const testData = generateMinimalGraphData();
      
      expect(() => {
        graph.graphData(testData);
      }).not.toThrow();
      
      const retrievedData = graph.graphData();
      expect(retrievedData).toBeDefined();
    });

    test('should handle empty graph data', () => {
      const emptyData = generateEmptyGraphData();
      
      expect(() => {
        graph.graphData(emptyData);
      }).not.toThrow();
      
      const retrievedData = graph.graphData();
      expect(retrievedData.nodes).toEqual([]);
      expect(retrievedData.links).toEqual([]);
    });

    test('should return current graph data when called without arguments', () => {
      const testData = generateMinimalGraphData();
      graph.graphData(testData);
      
      const currentData = graph.graphData();
      expect(currentData).toBeDefined();
      expect(currentData.nodes).toBeDefined();
      expect(currentData.links).toBeDefined();
    });

    test('should support jsonUrl property', () => {
      expect(() => {
        graph.jsonUrl('https://example.com/data.json');
      }).not.toThrow();
      
      expect(graph.jsonUrl()).toBe('https://example.com/data.json');
    });
  });

  describe('Accessor Properties', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure node accessor properties', () => {
      expect(graph.nodeId('customId').nodeId()).toBe('customId');
      expect(graph.nodeVal('customVal').nodeVal()).toBe('customVal');
      expect(graph.nodeLabel('customLabel').nodeLabel()).toBe('customLabel');
      expect(graph.nodeColor('customColor').nodeColor()).toBe('customColor');
    });

    test('should configure link accessor properties', () => {
      expect(graph.linkSource('src').linkSource()).toBe('src');
      expect(graph.linkTarget('tgt').linkTarget()).toBe('tgt');
      expect(graph.linkLabel('customLinkLabel').linkLabel()).toBe('customLinkLabel');
      expect(graph.linkColor('customLinkColor').linkColor()).toBe('customLinkColor');
    });

    test('should support alias properties for backwards compatibility', () => {
      // Test that aliases work
      expect(graph.idField('testId').nodeId()).toBe('testId');
      expect(graph.nameField('testName').nodeLabel()).toBe('testName');
      expect(graph.valField('testVal').nodeVal()).toBe('testVal');
      expect(graph.colorField('testColor').nodeColor()).toBe('testColor');
    });
  });

  describe('Container Layout Configuration', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure canvas dimensions', () => {
      expect(graph.width(1200).width()).toBe(1200);
      expect(graph.height(800).height()).toBe(800);
    });

    test('should configure background color', () => {
      expect(graph.backgroundColor('#ff0000').backgroundColor()).toBe('#ff0000');
    });

    test('should configure navigation info visibility', () => {
      expect(graph.showNavInfo(false).showNavInfo()).toBe(false);
      expect(graph.showNavInfo(true).showNavInfo()).toBe(true);
    });
  });

  describe('Node Styling Properties', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure node size properties', () => {
      expect(graph.nodeRelSize(8).nodeRelSize()).toBe(8);
      expect(graph.nodeResolution(16).nodeResolution()).toBe(16);
    });

    test('should configure node opacity', () => {
      expect(graph.nodeOpacity(0.5).nodeOpacity()).toBe(0.5);
    });

    test('should configure node auto-coloring', () => {
      expect(graph.nodeAutoColorBy('group').nodeAutoColorBy()).toBe('group');
    });
  });

  describe('Link Styling Properties', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure link visual properties', () => {
      expect(graph.linkWidth(2).linkWidth()).toBe(2);
      expect(graph.linkOpacity(0.8).linkOpacity()).toBe(0.8);
      expect(graph.linkResolution(12).linkResolution()).toBe(12);
    });

    test('should configure link curvature', () => {
      expect(graph.linkCurvature(0.5).linkCurvature()).toBe(0.5);
      expect(graph.linkCurveRotation(1.5).linkCurveRotation()).toBe(1.5);
    });

    test('should configure directional arrows', () => {
      expect(graph.linkDirectionalArrowLength(4).linkDirectionalArrowLength()).toBe(4);
      expect(graph.linkDirectionalArrowRelPos(0.8).linkDirectionalArrowRelPos()).toBe(0.8);
      expect(graph.linkDirectionalArrowResolution(12).linkDirectionalArrowResolution()).toBe(12);
    });

    test('should configure directional particles', () => {
      expect(graph.linkDirectionalParticles(3).linkDirectionalParticles()).toBe(3);
      expect(graph.linkDirectionalParticleSpeed(0.02).linkDirectionalParticleSpeed()).toBe(0.02);
      expect(graph.linkDirectionalParticleWidth(1).linkDirectionalParticleWidth()).toBe(1);
      expect(graph.linkDirectionalParticleResolution(6).linkDirectionalParticleResolution()).toBe(6);
    });
  });

  describe('Force Engine Configuration', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure force engine type', () => {
      expect(graph.forceEngine('ngraph').forceEngine()).toBe('ngraph');
      expect(graph.forceEngine('d3').forceEngine()).toBe('d3');
    });

    test('should configure simulation dimensions', () => {
      expect(graph.numDimensions(2).numDimensions()).toBe(2);
      expect(graph.numDimensions(3).numDimensions()).toBe(3);
    });

    test('should configure d3 force parameters', () => {
      expect(graph.d3AlphaDecay(0.05).d3AlphaDecay()).toBe(0.05);
      expect(graph.d3VelocityDecay(0.6).d3VelocityDecay()).toBe(0.6);
    });

    test('should configure simulation timing', () => {
      expect(graph.warmupTicks(10).warmupTicks()).toBe(10);
      expect(graph.cooldownTicks(200).cooldownTicks()).toBe(200);
      expect(graph.cooldownTime(5000).cooldownTime()).toBe(5000);
    });
  });

  describe('Interaction Configuration', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should configure interaction callbacks', () => {
      const mockCallback = jest.fn();
      
      graph.onNodeClick(mockCallback);
      graph.onNodeHover(mockCallback);
      graph.onNodeDrag(mockCallback);
      graph.onNodeDragEnd(mockCallback);
      graph.onLinkClick(mockCallback);
      graph.onLinkHover(mockCallback);
      
      expect(graph.onNodeClick()).toBe(mockCallback);
      expect(graph.onNodeHover()).toBe(mockCallback);
      expect(graph.onNodeDrag()).toBe(mockCallback);
      expect(graph.onNodeDragEnd()).toBe(mockCallback);
      expect(graph.onLinkClick()).toBe(mockCallback);
      expect(graph.onLinkHover()).toBe(mockCallback);
    });

    test('should configure interaction controls', () => {
      expect(graph.enablePointerInteraction(false).enablePointerInteraction()).toBe(false);
      expect(graph.enableNodeDrag(false).enableNodeDrag()).toBe(false);
      expect(graph.enableNavigationControls(false).enableNavigationControls()).toBe(false);
    });

    test('should configure hover precision', () => {
      expect(graph.linkHoverPrecision(5).linkHoverPrecision()).toBe(5);
    });
  });

  describe('Methods', () => {
    beforeEach(() => {
      graph(container);
    });

    test('should expose scene access method', () => {
      expect(typeof graph.scene).toBe('function');
      const scene = graph.scene();
      expect(scene).toBeDefined();
    });

    test('should expose camera access method', () => {
      expect(typeof graph.camera).toBe('function');
      const camera = graph.camera();
      expect(camera).toBeDefined();
    });

    test('should expose renderer access method', () => {
      expect(typeof graph.renderer).toBe('function');
      const renderer = graph.renderer();
      expect(renderer).toBeDefined();
    });

    test('should expose trackball controls method', () => {
      expect(typeof graph.tbControls).toBe('function');
      const controls = graph.tbControls();
      expect(controls).toBeDefined();
    });

    test('should have stopAnimation method', () => {
      expect(typeof graph.stopAnimation).toBe('function');
      expect(() => graph.stopAnimation()).not.toThrow();
    });

    test('should have cameraPosition method', () => {
      expect(typeof graph.cameraPosition).toBe('function');
      expect(() => graph.cameraPosition({ x: 100, y: 100, z: 100 })).not.toThrow();
    });
  });
});
