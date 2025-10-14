require('@testing-library/jest-dom');

// Mock canvas and WebGL context for headless testing
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: function(contextType) {
    if (contextType === 'webgl' || contextType === 'webgl2') {
      return {
        clearColor: jest.fn(),
        clear: jest.fn(),
        drawArrays: jest.fn(),
        drawElements: jest.fn(),
        enable: jest.fn(),
        disable: jest.fn(),
        viewport: jest.fn(),
        createProgram: jest.fn(() => ({})),
        createShader: jest.fn(() => ({})),
        shaderSource: jest.fn(),
        compileShader: jest.fn(),
        attachShader: jest.fn(),
        linkProgram: jest.fn(),
        useProgram: jest.fn(),
        getAttribLocation: jest.fn(() => 0),
        getUniformLocation: jest.fn(() => {}),
        enableVertexAttribArray: jest.fn(),
        vertexAttribPointer: jest.fn(),
        createBuffer: jest.fn(() => ({})),
        bindBuffer: jest.fn(),
        bufferData: jest.fn(),
        uniform1f: jest.fn(),
        uniform2f: jest.fn(),
        uniform3f: jest.fn(),
        uniform4f: jest.fn(),
        uniformMatrix4fv: jest.fn(),
        createTexture: jest.fn(() => ({})),
        bindTexture: jest.fn(),
        texParameteri: jest.fn(),
        texImage2D: jest.fn(),
        VERTEX_SHADER: 35633,
        FRAGMENT_SHADER: 35632,
        ARRAY_BUFFER: 34962,
        STATIC_DRAW: 35044,
        COLOR_BUFFER_BIT: 16384,
        DEPTH_BUFFER_BIT: 256,
        DEPTH_TEST: 2929,
        BLEND: 3042,
        SRC_ALPHA: 770,
        ONE_MINUS_SRC_ALPHA: 771,
        TEXTURE_2D: 3553,
        TEXTURE_MAG_FILTER: 10240,
        TEXTURE_MIN_FILTER: 10241,
        LINEAR: 9729,
        RGBA: 6408,
        UNSIGNED_BYTE: 5121
      };
    }
    return null;
  }
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(clearTimeout);

// Mock performance.now
global.performance = global.performance || {};
global.performance.now = jest.fn(() => Date.now());

// Mock window dimensions
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock console methods for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  // Suppress Three.js warnings during tests
  console.warn = jest.fn((message) => {
    if (!message.includes('THREE.') && !message.includes('WebGL')) {
      originalWarn(message);
    }
  });
  
  console.error = jest.fn((message) => {
    if (!message.includes('THREE.') && !message.includes('WebGL')) {
      originalError(message);
    }
  });
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
  jest.clearAllMocks();
});
