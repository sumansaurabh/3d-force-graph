// Mock DOM utilities for testing

export const createMockElement = (tagName = 'div', attributes = {}) => {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  
  // Add common methods that might be called
  element.appendChild = jest.fn();
  element.removeChild = jest.fn();
  element.addEventListener = jest.fn();
  element.removeEventListener = jest.fn();
  
  return element;
};

export const mockCanvas = () => {
  const canvas = createMockElement('canvas');
  
  // Mock canvas-specific properties and methods
  canvas.width = 800;
  canvas.height = 600;
  canvas.getContext = jest.fn();
  canvas.toDataURL = jest.fn(() => 'data:image/png;base64,mock');
  canvas.getBoundingClientRect = jest.fn(() => ({
    left: 0,
    top: 0,
    right: 800,
    bottom: 600,
    width: 800,
    height: 600,
    x: 0,
    y: 0,
  }));
  
  return canvas;
};

export const createMockContainer = (width = 800, height = 600) => {
  const container = createMockElement('div');
  
  container.style = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative'
  };
  
  container.getBoundingClientRect = jest.fn(() => ({
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height,
    x: 0,
    y: 0,
  }));
  
  container.clientWidth = width;
  container.clientHeight = height;
  
  return container;
};

export const createMouseEvent = (type, options = {}) => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0,
    ...options,
  });
  
  // Add methods that might be called
  event.preventDefault = jest.fn();
  event.stopPropagation = jest.fn();
  
  return event;
};

export const createTouchEvent = (type, touches = []) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  event.touches = touches;
  event.changedTouches = touches;
  event.targetTouches = touches;
  event.preventDefault = jest.fn();
  event.stopPropagation = jest.fn();
  
  return event;
};

export const createKeyboardEvent = (type, options = {}) => {
  const event = new KeyboardEvent(type, {
    bubbles: true,
    cancelable: true,
    key: 'Enter',
    code: 'Enter',
    ...options,
  });
  
  event.preventDefault = jest.fn();
  event.stopPropagation = jest.fn();
  
  return event;
};

export const mockIntersectionObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
  
  global.IntersectionObserver = jest.fn().mockImplementation(() => mockObserver);
  
  return mockObserver;
};

export const mockMutationObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(() => []),
  };
  
  global.MutationObserver = jest.fn().mockImplementation(() => mockObserver);
  
  return mockObserver;
};

export const waitForAnimationFrame = () => {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
};

export const waitFor = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const triggerResize = (width = 1024, height = 768) => {
  // Update window dimensions
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

export default {
  createMockElement,
  mockCanvas,
  createMockContainer,
  createMouseEvent,
  createTouchEvent,
  createKeyboardEvent,
  mockIntersectionObserver,
  mockMutationObserver,
  waitForAnimationFrame,
  waitFor,
  triggerResize,
};
