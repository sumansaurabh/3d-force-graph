# 3D 力导向图

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

一个用于在三维空间中使用力导向迭代布局表示图数据结构的 Web 组件。
使用 [ThreeJS](https://github.com/mrdoob/three.js/)/WebGL 进行 3D 渲染，并使用 [d3-force-3d](https://github.com/vasturiano/d3-force-3d) 或 [ngraph](https://github.com/anvaka/ngraph.forcelayout3d) 作为底层物理引擎。

查看示例：
* [基础示例](https://vasturiano.github.io/3d-force-graph/example/basic/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [异步加载](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [大型图（约 4k 个元素）](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [方向箭头](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [方向移动粒子](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [曲线和自连接](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [自动着色节点/连接](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [文本作为节点](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [自定义节点几何体](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [相机自动旋转](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [点击聚焦节点](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [高亮节点/连接](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [动态数据更改](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [节点碰撞检测](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [向场景添加外部对象](https://vasturiano.github.io/3d-force-graph/example/scene/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

另请参阅 [VR 版本](https://github.com/vasturiano/3d-force-graph-vr) 和 [2D 画布版本](https://github.com/vasturiano/force-graph)。

并查看 [React 绑定](https://github.com/vasturiano/react-force-graph)。

## 快速开始

```
import ForceGraph3D from '3d-force-graph';
```
或
```
var ForceGraph3D = require('3d-force-graph');
```
甚至
```
<script src="//unpkg.com/3d-force-graph"></script>
```
然后
```
var myGraph = ForceGraph3D();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## API 参考

### 数据输入
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | 图数据结构的获取器/设置器（语法详细信息见下文）。也可用于应用[增量更新](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6)。 | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | 用于直接从中加载图数据的 JSON 文件的 URL，作为直接指定 <i>graphData</i> 的替代方案。 | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(别名：<i>idField</i>)</sub> | 用于唯一节点 ID 的节点对象访问器属性（在连接对象 source/target 中使用）。 | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(别名：<i>linkSourceField</i>)</sub> | 引用源节点 ID 的连接对象访问器属性。 | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(别名：<i>linkTargetField</i>)</sub> | 引用目标节点 ID 的连接对象访问器属性。 | `target` |

### 容器布局
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | 画布宽度的获取器/设置器。 | *&lt;窗口宽度&gt;* |
| <b>height</b>([<i>px</i>]) | 画布高度的获取器/设置器。 | *&lt;窗口高度&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | 图表背景颜色的获取器/设置器。 | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | 是否显示导航控制页脚信息的获取器/设置器。 | `true` |

### 节点样式
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | 每个值单位的节点球体体积（立方像素）比率的获取器/设置器。 | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) <br/><sub>(别名：<i>valField</i>)</sub> | 节点数值的节点对象访问器函数、属性或数值常量（影响球体体积）。 | `val` |
| <b>nodeLabel</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名：<i>nameField</i>)</sub> | 名称（显示在标签中）的节点对象访问器函数或属性。支持纯文本或 HTML 内容。 | `name` |
| <b>nodeColor</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名：<i>colorField</i>)</sub> | 节点颜色的节点对象访问器函数或属性（影响球体颜色）。 | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名：<i>autoColorBy</i>)</sub> | 用于自动分组颜色的节点对象访问器函数（`fn(node)`）或属性（例如 `'type'`）。仅影响没有颜色属性的节点。 | |
| <b>nodeOpacity</b>([<i>num</i>]) | 节点球体不透明度的获取器/设置器，介于 [0,1] 之间。 | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | 每个节点的几何分辨率的获取器/设置器，表示为将圆周分成多少个切片段。较高的值产生更平滑的球体。 | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> 或 <i>fn</i>]) | 用于生成自定义 3D 对象作为图节点呈现的节点对象访问器函数或属性。应返回 [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D) 的实例。如果返回 <i>假值</i>，则该节点将使用默认的 3D 对象类型。  | *默认节点对象是球体，根据 `val` 调整大小并根据 `color` 设置样式。* |

### 连接样式
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> 或 <i>fn</i>]) | 名称（显示在标签中）的连接对象访问器函数或属性。支持纯文本或 HTML 内容。 | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> 或 <i>fn</i>]) | 用于是否显示连接线的连接对象访问器函数、属性或布尔常量。值为 `false` 会保持连接力但不渲染它。 | `true` |
| <b>linkColor</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名：<i>linkColorField</i>)</sub> | 线条颜色的连接对象访问器函数或属性。 | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> 或 <i>fn</i>]) | 用于自动分组颜色的连接对象访问器函数（`fn(link)`）或属性（例如 `'type'`）。仅影响没有颜色属性的连接。 | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(别名：<i>lineOpacity</i>)</sub> | 连接线不透明度的获取器/设置器，介于 [0,1] 之间。 | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 连接线宽度的连接对象访问器函数、属性或数值常量。值为零将渲染宽度恒定（`1px`）的 [ThreeJS Line](https://threejs.org/docs/#api/objects/Line)，无论距离如何。值四舍五入到最接近的小数以用于索引目的。 | 0 |
| <b>linkResolution</b>([<i>num</i>]) | 每个连接的几何分辨率的获取器/设置器，表示为将圆柱体分成多少个径向段。较高的值产生更平滑的圆柱体。仅适用于宽度为正的连接。 | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 连接线曲率半径的连接对象访问器函数、属性或数值常量。仅适用于使用 [ThreeJS Line](https://threejs.org/docs/#api/objects/Line)（`0` 宽度）的连接。曲线表示为 3D 贝塞尔曲线，接受任何数值。值为 `0` 渲染直线。`1` 表示半径等于线长度的一半，使曲线近似半圆。对于自引用连接（`source` 等于 `target`），曲线表示为围绕节点的循环，长度与曲率值成正比。正值顺时针弯曲线条，负值逆时针弯曲。请注意，渲染曲线纯粹是视觉效果，不影响底层力的行为。 | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 沿线轴应用于曲线的旋转的连接对象访问器函数、属性或数值常量。对直线无效。在 `0` 旋转时，曲线朝向与 `XY` 平面相交的方向。旋转角度（以弧度为单位）将从此参考方向围绕"起点到终点"轴顺时针旋转曲线。 | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> 或 <i>fn</i>]) | 用于指定自定义材质以设置图连接样式的连接对象访问器函数或属性。应返回 [ThreeJS Material](https://threejs.org/docs/#api/materials/Material) 的实例。如果返回 <i>假值</i>，则该连接将使用默认材质。 | *默认连接材质是根据 `color` 和 `opacity` 设置样式的 [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)。* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 指示连接方向性的箭头头部长度的连接对象访问器函数、属性或数值常量。箭头直接显示在连接线上方，指向 `source` > `target` 的方向。值为 `0` 隐藏箭头。 | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> 或 <i>fn</i>]) | 箭头头部颜色的连接对象访问器函数或属性。 | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 箭头头部沿连接线的纵向位置的连接对象访问器函数、属性或数值常量，表示为 `0` 和 `1` 之间的比率，其中 `0` 表示紧邻 `source` 节点，`1` 紧邻 `target` 节点，`0.5` 正好在中间。 | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | 箭头头部的几何分辨率的获取器/设置器，表示为将锥底圆周分成多少个切片段。较高的值产生更平滑的箭头。 | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 要在连接线上显示的粒子（小球体）数量的连接对象访问器函数、属性或数值常量。粒子沿线等距分布，在 `source` > `target` 方向上移动，可用于指示连接方向性。 | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 方向粒子速度的连接对象访问器函数、属性或数值常量，表示为每帧行进的连接长度比率。不建议使用高于 `0.5` 的值。 | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 方向粒子宽度的连接对象访问器函数、属性或数值常量。值四舍五入到最接近的小数以用于索引目的。 | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> 或 <i>fn</i>]) | 方向粒子颜色的连接对象访问器函数或属性。 | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | 每个方向粒子的几何分辨率的获取器/设置器，表示为将圆周分成多少个切片段。较高的值产生更平滑的粒子。 | 4 |

### 渲染控制
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>stopAnimation</b>() | 停止组件的渲染周期，有效地冻结当前视图并取消所有未来的用户交互。此方法可用于在静态图像足够的情况下节省性能。 | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | 相机位置的获取器/设置器，以 `x`、`y`、`z` 坐标表示。每个坐标都是可选的，允许仅在某些维度上移动。可选的第二个参数可用于定义相机应瞄准的方向，以 3D 空间中的 `{x,y,z}` 点表示。第三个可选参数定义动画相机运动的过渡持续时间（以毫秒为单位）。值为 0（默认）会立即将相机移动到最终位置。 | 默认情况下，相机将面向图的中心，距离与系统中节点数量成正比。 |
| <b>scene</b>() | 访问内部 ThreeJS [场景](https://threejs.org/docs/#api/scenes/Scene)。可用于使用与 3d-force-graph 无关的其他对象扩展当前场景。 | |
| <b>camera</b>() | 访问内部 ThreeJS [相机](https://threejs.org/docs/#api/cameras/PerspectiveCamera)。 | |
| <b>renderer</b>() | 访问内部 ThreeJS [WebGL 渲染器](https://threejs.org/docs/#api/renderers/WebGLRenderer)。 ||
| <b>tbControls</b>() | 访问内部 ThreeJS [轨迹球控制](https://threejs.org/examples/misc_controls_trackball.html)。 ||

### 力引擎配置
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | 要使用哪个力模拟引擎（[*d3*](https://github.com/vasturiano/d3-force-3d) 或 [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)）的获取器/设置器。 | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | 运行力模拟的维数（1、2 或 3）的获取器/设置器。 | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [模拟强度衰减](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay)参数的获取器/设置器，仅在使用 d3 模拟引擎时适用。 | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | 模拟介质阻力的节点[速度衰减](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay)的获取器/设置器，仅在使用 d3 模拟引擎时适用。 | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | 控制 d3 模拟引擎的内部力的获取器/设置器。遵循与 `d3-force-3d` 的 [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force) 相同的接口。默认包括三个力：`'link'`（基于 [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)）、`'charge'`（基于 [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)）和 `'center'`（基于 [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)）。这些力中的每一个都可以重新配置，或者可以向系统添加新的力。此方法仅在使用 d3 模拟引擎时适用。 | |
| <b>warmupTicks</b>([<i>int</i>]) | 在开始渲染之前，在点火时空运行布局引擎周期数的获取器/设置器。 | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | 在停止和冻结布局引擎之前要渲染多少内置帧的获取器/设置器。 | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | 在停止和冻结布局引擎之前渲染多长时间（毫秒）的获取器/设置器。 | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | 在模拟引擎的每个滴答声时调用的回调函数。 | - |
| <b>onEngineStop</b>(<i>fn</i>) | 当模拟引擎停止且布局冻结时调用的回调函数。 | - |

### 交互
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | 节点点击的回调函数。节点对象作为单个参数 `onNodeClick(node)` 包含在内。 | - |
| <b>onNodeHover</b>(<i>fn</i>) | 节点鼠标悬停事件的回调函数。节点对象（如果鼠标视线下没有节点，则为 `null`）作为第一个参数包含在内，前一个节点对象（或 null）作为第二个参数：`onNodeHover(node, prevNode)`。 | - |
| <b>onNodeDrag</b>(<i>fn</i>) | 节点拖动交互的回调函数。在拖动节点时每次更新其位置时都会重复调用此函数。节点对象作为单个参数 `onNodeDrag(node)` 包含在内。 | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | 节点拖动交互结束的回调函数。释放节点时调用此函数。节点对象作为单个参数 `onNodeDragEnd(node)` 包含在内。 | - |
| <b>onLinkClick</b>(<i>fn</i>) | 连接点击的回调函数。连接对象作为单个参数 `onLinkClick(link)` 包含在内。 | - |
| <b>onLinkHover</b>(<i>fn</i>) | 连接鼠标悬停事件的回调函数。连接对象（如果鼠标视线下没有连接，则为 `null`）作为第一个参数包含在内，前一个连接对象（或 null）作为第二个参数：`onLinkHover(link, prevLink)`。 | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | 是否在近距离凝视连接时显示连接标签（低值）还是从远处显示（高值）。 | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | 是否启用鼠标跟踪事件的获取器/设置器。这会激活画布鼠标位置的内部跟踪器，并启用对象悬停/点击和工具提示标签的功能，但会影响性能。如果您正在寻求图性能的最大提升，建议关闭此属性。 | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | 是否启用用户通过点击拖动来拖动节点的交互的获取器/设置器。仅在 `d3` 力引擎上支持。如果启用，每次拖动节点时模拟都会重新加热，以便其他节点对更改做出反应。仅在 enablePointerInteraction 为 `true` 且使用 `d3` 力引擎时适用。 | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | 是否启用用于使用鼠标交互移动相机的轨迹球导航控制（旋转/缩放/平移）的获取器/设置器。 | `true` |

### 输入 JSON 语法
```
{
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "val": 1
        },
        {
          "id": "id2",
          "name": "name2",
          "val": 10
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}
```
