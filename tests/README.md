# 3D Force Graph Test Documentation

## Overview
This test suite provides comprehensive testing for the 3D Force Graph component, covering unit tests, integration tests, performance tests, and visual regression tests.

## Test Structure

### `/tests/setup/`
- **jest.setup.js** - Main Jest configuration with mocks for WebGL, canvas, and browser APIs

### `/tests/mocks/`
- **threejs.mock.js** - Mock implementations of Three.js objects and classes
- **testData.js** - Data generators for creating test graph datasets
- **domUtils.js** - DOM utilities and event mocking helpers

### `/tests/unit/`
- **core.test.js** - Core functionality and initialization tests
- **dataHandling.test.js** - Data loading, validation, and manipulation tests  
- **interactions.test.js** - Event handling and user interaction tests

### `/tests/integration/`
- **fullComponent.test.js** - End-to-end component integration tests

### `/tests/performance/`
- **largeSets.test.js** - Performance tests with large datasets

### `/tests/fixtures/`
- Sample data files for consistent testing

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI Tests
```bash
npm run test:ci
```

## Test Categories

### 1. Unit Tests
- Component initialization and mounting
- Property getters and setters
- Data input validation
- Accessor configuration
- Force engine configuration
- Event callback setup
- Method availability

### 2. Integration Tests
- Full component workflow
- ThreeJS integration
- Force engine switching
- Animation lifecycle
- Drag interaction setup
- Memory management

### 3. Performance Tests
- Large dataset handling (1k+ nodes)
- Animation frame performance
- Memory leak detection
- Rapid property changes
- Complex visual configurations

### 4. Visual/Rendering Tests (Future)
- Screenshot comparison
- Node/link rendering accuracy
- Color application
- Custom geometries

## Mock Strategy

### WebGL/Canvas Mocking
The test setup includes comprehensive mocks for:
- WebGL context and methods
- Canvas element APIs
- Browser APIs (ResizeObserver, requestAnimationFrame)

### ThreeJS Mocking
Complete mock implementations of:
- Scene, Camera, Renderer objects
- Geometry and Material classes
- Vector math utilities
- Control systems

### Data Mocking
Flexible data generators for:
- Minimal test datasets
- Large performance datasets
- Malformed/invalid data
- Custom property structures

## Writing New Tests

### Test File Structure
```javascript
import ForceGraph3D from '../../src/3d-force-graph.js';
import { testDataGenerator } from '../mocks/testData.js';
import { createMockContainer } from '../mocks/domUtils.js';
import '../mocks/threejs.mock.js';

describe('TestCategory - Feature', () => {
  let container, graph;
  
  beforeEach(() => {
    container = createMockContainer();
    graph = ForceGraph3D();
  });
  
  afterEach(() => {
    if (graph?.stopAnimation) graph.stopAnimation();
    container.remove();
  });
  
  test('should do something', () => {
    // Test implementation
  });
});
```

### Best Practices
1. Always clean up resources in `afterEach`
2. Use data generators instead of hardcoded data
3. Test both success and failure cases
4. Mock external dependencies appropriately
5. Use descriptive test names
6. Group related tests in `describe` blocks

## Configuration

### Jest Configuration
- **Environment**: jsdom for DOM APIs
- **Setup**: Automatic mock loading
- **Coverage**: Source files only, excluding entry points
- **Timeout**: 10 seconds for async operations

### Mock Configuration
- WebGL context with all required methods
- Canvas with proper dimensions and methods
- Performance APIs for timing tests
- Event system for interaction tests

## Troubleshooting

### Common Issues
1. **WebGL errors**: Ensure threejs.mock.js is imported
2. **Canvas not found**: Use createMockContainer() helper
3. **Animation not stopping**: Call stopAnimation() in afterEach
4. **Async test failures**: Use proper await/waitFor utilities

### Performance Test Guidelines
- Use realistic but manageable dataset sizes
- Allow for test environment overhead
- Focus on relative performance, not absolute values
- Test scalability patterns

## Coverage Goals
- **Unit Tests**: >90% coverage of core functionality
- **Integration Tests**: All major component interactions
- **Performance Tests**: Key performance characteristics
- **Error Handling**: All error conditions and edge cases

## Future Enhancements
- Visual regression testing with screenshot comparison
- Cross-browser compatibility tests
- Mobile/touch interaction tests
- Accessibility testing
- WebGL performance profiling
