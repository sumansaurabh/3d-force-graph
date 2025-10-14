// Mock ThreeJS objects for testing
export const mockThreeJS = {
  AmbientLight: jest.fn().mockImplementation(() => ({
    type: 'AmbientLight',
    color: { setHex: jest.fn() },
    intensity: 0.4,
  })),
  
  DirectionalLight: jest.fn().mockImplementation(() => ({
    type: 'DirectionalLight',
    color: { setHex: jest.fn() },
    intensity: 0.6,
    position: { set: jest.fn() },
  })),
  
  Scene: jest.fn().mockImplementation(() => ({
    type: 'Scene',
    add: jest.fn(),
    remove: jest.fn(),
    children: [],
    traverse: jest.fn(),
    background: null,
  })),
  
  PerspectiveCamera: jest.fn().mockImplementation(() => ({
    type: 'PerspectiveCamera',
    position: { x: 0, y: 0, z: 500, set: jest.fn() },
    rotation: { x: 0, y: 0, z: 0 },
    lookAt: jest.fn(),
    updateProjectionMatrix: jest.fn(),
    fov: 75,
    aspect: 1,
    near: 0.1,
    far: 1000,
  })),
  
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    domElement: document.createElement('canvas'),
    setSize: jest.fn(),
    render: jest.fn(),
    setClearColor: jest.fn(),
    setPixelRatio: jest.fn(),
    dispose: jest.fn(),
    shadowMap: {
      enabled: false,
      type: null,
    },
  })),
  
  SphereGeometry: jest.fn().mockImplementation(() => ({
    type: 'SphereGeometry',
    dispose: jest.fn(),
  })),
  
  MeshBasicMaterial: jest.fn().mockImplementation(() => ({
    type: 'MeshBasicMaterial',
    color: { setHex: jest.fn(), getHex: jest.fn(() => 0xff0000) },
    opacity: 1,
    transparent: false,
    dispose: jest.fn(),
  })),
  
  Mesh: jest.fn().mockImplementation(() => ({
    type: 'Mesh',
    position: { x: 0, y: 0, z: 0, set: jest.fn() },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1, set: jest.fn() },
    visible: true,
    material: null,
    geometry: null,
  })),
  
  Vector3: jest.fn().mockImplementation((x = 0, y = 0, z = 0) => ({
    x, y, z,
    set: jest.fn(),
    copy: jest.fn(),
    add: jest.fn(),
    sub: jest.fn(),
    multiply: jest.fn(),
    length: jest.fn(() => Math.sqrt(x*x + y*y + z*z)),
    normalize: jest.fn(),
    clone: jest.fn(),
  })),
  
  Raycaster: jest.fn().mockImplementation(() => ({
    setFromCamera: jest.fn(),
    intersectObjects: jest.fn(() => []),
  })),
  
  Vector2: jest.fn().mockImplementation((x = 0, y = 0) => ({
    x, y,
    set: jest.fn(),
  })),
  
  Color: jest.fn().mockImplementation(() => ({
    r: 1, g: 1, b: 1,
    setHex: jest.fn(),
    getHex: jest.fn(() => 0xffffff),
    set: jest.fn(),
  })),
};

// Mock Three.js modules
jest.mock('three', () => mockThreeJS);

// Mock ThreeJS addons
jest.mock('three-dragcontrols', () => {
  return jest.fn().mockImplementation(() => ({
    enabled: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

jest.mock('three-render-objects', () => {
  return jest.fn().mockImplementation(() => ({
    objects: jest.fn().mockReturnThis(),
    scene: jest.fn(() => new mockThreeJS.Scene()),
    camera: jest.fn(() => new mockThreeJS.PerspectiveCamera()),
    renderer: jest.fn(() => new mockThreeJS.WebGLRenderer()),
    tbControls: jest.fn(() => ({
      enabled: true,
      addEventListener: jest.fn(),
    })),
    tick: jest.fn(),
    hoverOrderComparator: jest.fn().mockReturnThis(),
    tooltipContent: jest.fn().mockReturnThis(),
    onHover: jest.fn().mockReturnThis(),
    onClick: jest.fn().mockReturnThis(),
    lineHoverPrecision: jest.fn().mockReturnThis(),
    cameraPosition: jest.fn().mockReturnThis(),
  }));
});

jest.mock('three-forcegraph', () => {
  return jest.fn().mockImplementation(() => ({
    graphData: jest.fn().mockReturnValue({ nodes: [], links: [] }),
    onLoading: jest.fn().mockReturnThis(),
    onFinishLoading: jest.fn().mockReturnThis(),
    tickFrame: jest.fn(),
    position: { x: 0, y: 0, z: 0 },
    d3AlphaTarget: jest.fn().mockReturnThis(),
    resetCountdown: jest.fn().mockReturnThis(),
    nodeRelSize: jest.fn().mockReturnThis(),
    nodeVal: jest.fn().mockReturnThis(),
    nodeColor: jest.fn().mockReturnThis(),
    linkColor: jest.fn().mockReturnThis(),
    linkWidth: jest.fn().mockReturnThis(),
    forceEngine: jest.fn().mockReturnThis(),
    numDimensions: jest.fn().mockReturnThis(),
    d3AlphaDecay: jest.fn().mockReturnThis(),
    d3VelocityDecay: jest.fn().mockReturnThis(),
    warmupTicks: jest.fn().mockReturnThis(),
    cooldownTicks: jest.fn().mockReturnThis(),
    cooldownTime: jest.fn().mockReturnThis(),
  }));
});

export default mockThreeJS;
