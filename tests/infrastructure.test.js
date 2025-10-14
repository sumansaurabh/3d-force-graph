// Simple test to verify Jest setup is working
describe('Test Infrastructure', () => {
  test('Jest is configured correctly', () => {
    expect(1 + 1).toBe(2);
  });

  test('DOM environment is available', () => {
    const element = document.createElement('div');
    element.textContent = 'Test';
    expect(element.textContent).toBe('Test');
  });

  test('Canvas mock is working', () => {
    const canvas = document.createElement('canvas');
    expect(canvas).toBeDefined();
    expect(canvas.getContext).toBeDefined();
  });

  test('WebGL mock is working', () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    expect(gl).toBeDefined();
    expect(gl.clearColor).toBeDefined();
    expect(gl.clear).toBeDefined();
  });

  test('Animation frame mocks are working', () => {
    expect(global.requestAnimationFrame).toBeDefined();
    expect(global.cancelAnimationFrame).toBeDefined();
  });

  test('Performance mock is working', () => {
    expect(global.performance.now).toBeDefined();
    expect(typeof global.performance.now()).toBe('number');
  });
});
