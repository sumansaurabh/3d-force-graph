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
* [大型图（约 4k 元素）](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [方向箭头](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [方向移动粒子](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [曲线和自链接](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [自动着色节点/链接](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [文本节点](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [自定义节点几何体](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [相机自动旋转](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [点击聚焦节点](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [高亮节点/链接](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [动态数据变化](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([源码](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
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
或者
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
| <b>graphData</b>([<i>data</i>]) | 图数据结构的 Getter/Setter（语法详情见下文）。也可用于应用[增量更新](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6)。 | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | 直接从中加载图数据的 JSON 文件的 URL，作为直接指定 <i>graphData</i> 的替代方案。 | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(别名: <i>idField</i>)</sub> | 用于唯一节点 ID 的节点对象访问器属性（在链接对象的 source/target 中使用）。 | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(别名: <i>linkSourceField</i>)</sub> | 引用源节点 ID 的链接对象访问器属性。 | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(别名: <i>linkTargetField</i>)</sub> | 引用目标节点 ID 的链接对象访问器属性。 | `target` |

### 容器布局
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | 画布宽度的 Getter/Setter。 | *&lt;窗口宽度&gt;* |
| <b>height</b>([<i>px</i>]) | 画布高度的 Getter/Setter。 | *&lt;窗口高度&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | 图表背景颜色的 Getter/Setter。 | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | 是否显示导航控件页脚信息的 Getter/Setter。 | `true` |

### 节点样式
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | 每个值单位的节点球体体积（立方像素）比率的 Getter/Setter。 | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) <br/><sub>(别名: <i>valField</i>)</sub> | 节点对象访问器函数、属性或数值常量，用于节点数值（影响球体体积）。 | `val` |
| <b>nodeLabel</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名: <i>nameField</i>)</sub> | 节点对象访问器函数或属性，用于名称（显示在标签中）。支持纯文本或 HTML 内容。 | `name` |
| <b>nodeColor</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名: <i>colorField</i>)</sub> | 节点对象访问器函数或属性，用于节点颜色（影响球体颜色）。 | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名: <i>autoColorBy</i>)</sub> | 节点对象访问器函数（`fn(node)`）或属性（例如 `'type'`），用于自动按组着色。仅影响没有颜色属性的节点。 | |
| <b>nodeOpacity</b>([<i>num</i>]) | 节点球体不透明度的 Getter/Setter，范围 [0,1]。 | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | 每个节点的几何分辨率的 Getter/Setter，表示为将圆周分成多少个切片段。值越高，球体越平滑。 | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> 或 <i>fn</i>]) | 节点对象访问器函数或属性，用于生成自定义 3D 对象以渲染为图节点。应返回 [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D) 的实例。如果返回 <i>falsy</i> 值，则该节点将使用默认 3D 对象类型。  | *默认节点对象是一个球体，根据 `val` 调整大小并根据 `color` 设置样式。* |

### 链接样式
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数或属性，用于名称（显示在标签中）。支持纯文本或 HTML 内容。 | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或布尔常量，用于是否显示链接线。值为 `false` 时保持链接力但不渲染它。 | `true` |
| <b>linkColor</b>([<i>str</i> 或 <i>fn</i>]) <br/><sub>(别名: <i>linkColorField</i>)</sub> | 链接对象访问器函数或属性，用于线条颜色。 | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数（`fn(link)`）或属性（例如 `'type'`），用于自动按组着色。仅影响没有颜色属性的链接。 | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(别名: <i>lineOpacity</i>)</sub> | 链接线条不透明度的 Getter/Setter，范围 [0,1]。 | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于链接线宽度。值为零将渲染 [ThreeJS Line](https://threejs.org/docs/#api/objects/Line)，其宽度恒定（`1px`），与距离无关。值四舍五入到最接近的小数以用于索引。 | 0 |
| <b>linkResolution</b>([<i>num</i>]) | 每个链接的几何分辨率的 Getter/Setter，表示为将圆柱体分成多少个径向段。值越高，圆柱体越平滑。仅适用于具有正宽度的链接。 | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于链接线的曲率半径。仅适用于使用 [ThreeJS Line](https://threejs.org/docs/#api/objects/Line)（`0` 宽度）的链接。曲线表示为 3D 贝塞尔曲线，接受任何数值。值为 `0` 渲染直线。`1` 表示半径等于线长度的一半，使曲线近似半圆。对于自引用链接（`source` 等于 `target`），曲线表示为围绕节点的循环，长度与曲率值成正比。正值顺时针弯曲线条，负值逆时针弯曲。请注意，渲染曲线纯粹是视觉效果，不影响底层力的行为。 | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于沿线轴应用于曲线的旋转。对直线无效。在 `0` 旋转时，曲线朝向与 `XY` 平面相交的方向。旋转角度（以弧度为单位）将从此参考方向围绕"起点到终点"轴顺时针旋转曲线。 | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数或属性，用于指定自定义材质以设置图链接样式。应返回 [ThreeJS Material](https://threejs.org/docs/#api/materials/Material) 的实例。如果返回 <i>falsy</i> 值，则该链接将使用默认材质。 | *默认链接材质是根据 `color` 和 `opacity` 设置样式的 [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)。* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于指示链接方向性的箭头头部长度。箭头直接显示在链接线上，并指向 `source` > `target` 的方向。值为 `0` 隐藏箭头。 | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数或属性，用于箭头头部的颜色。 | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于箭头头部沿链接线的纵向位置，表示为 `0` 和 `1` 之间的比率，其中 `0` 表示紧邻 `source` 节点，`1` 紧邻 `target` 节点，`0.5` 正好在中间。 | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | 箭头头部的几何分辨率的 Getter/Setter，表示为将锥底圆周分成多少个切片段。值越高，箭头越平滑。 | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于在链接线上显示的粒子（小球体）数量。粒子沿线等距分布，沿 `source` > `target` 方向移动，可用于指示链接方向性。 | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于方向粒子速度，表示为每帧行进的链接长度比率。不建议使用高于 `0.5` 的值。 | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数、属性或数值常量，用于方向粒子宽度。值四舍五入到最接近的小数以用于索引。 | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> 或 <i>fn</i>]) | 链接对象访问器函数或属性，用于方向粒子颜色。 | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | 每个方向粒子的几何分辨率的 Getter/Setter，表示为将圆周分成多少个切片段。值越高，粒子越平滑。 | 4 |

### 渲染控制
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>stopAnimation</b>() | 停止组件的渲染循环，有效地冻结当前视图并取消所有未来的用户交互。此方法可用于在静态图像足够的情况下节省性能。 | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | 相机位置的 Getter/Setter，以 `x`、`y`、`z` 坐标表示。每个坐标都是可选的，允许仅在某些维度上移动。可选的第二个参数可用于定义相机应瞄准的方向，以 3D 空间中的 `{x,y,z}` 点表示。第三个可选参数定义过渡的持续时间（以毫秒为单位）以动画化相机运动。值为 0（默认）将相机立即移动到最终位置。 | 默认情况下，相机将面向图的中心，`z` 距离与系统中的节点数量成正比。 |
| <b>scene</b>() | 访问内部 ThreeJS [Scene](https://threejs.org/docs/#api/scenes/Scene)。可用于使用与 3d-force-graph 无关的其他对象扩展当前场景。 | |
| <b>camera</b>() | 访问内部 ThreeJS [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera)。 | |
| <b>renderer</b>() | 访问内部 ThreeJS [WebGL 渲染器](https://threejs.org/docs/#api/renderers/WebGLRenderer)。 || 
| <b>tbControls</b>() | 访问内部 ThreeJS [轨迹球控件](https://threejs.org/examples/misc_controls_trackball.html)。 ||\

### 力引擎配置 
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | 使用哪个力模拟引擎的 Getter/Setter（[*d3*](https://github.com/vasturiano/d3-force-3d) 或 [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)）。 | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | 运行力模拟的维度数（1、2 或 3）的 Getter/Setter。 | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [模拟强度衰减](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay)参数的 Getter/Setter，仅在使用 d3 模拟引擎时适用。 | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | 模拟介质阻力的节点[速度衰减](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay)的 Getter/Setter，仅在使用 d3 模拟引擎时适用。 | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | 控制 d3 模拟引擎的内部力的 Getter/Setter。遵循与 `d3-force-3d` 的 [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force) 相同的接口。默认包含三个力：`'link'`（基于 [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)）、`'charge'`（基于 [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)）和 `'center'`（基于 [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)）。这些力中的每一个都可以重新配置，或者可以向系统添加新的力。此方法仅在使用 d3 模拟引擎时适用。 | |
| <b>warmupTicks</b>([<i>int</i>]) | 在开始渲染之前在点火时空运行的布局引擎周期数的 Getter/Setter。 | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | 在停止和冻结布局引擎之前要渲染多少个内置帧的 Getter/Setter。 | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | 在停止和冻结布局引擎之前渲染多长时间（毫秒）的 Getter/Setter。 | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | 在模拟引擎的每个滴答时调用的回调函数。 | - |
| <b>onEngineStop</b>(<i>fn</i>) | 当模拟引擎停止且布局被冻结时调用的回调函数。 | - |

### 交互
| 方法 | 描述 | 默认值 |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | 节点点击的回调函数。节点对象作为单个参数包含 `onNodeClick(node)`。 | - |
| <b>onNodeHover</b>(<i>fn</i>) | 节点鼠标悬停事件的回调函数。节点对象（如果鼠标视线下没有节点则为 `null`）作为第一个参数包含，前一个节点对象（或 null）作为第二个参数：`onNodeHover(node, prevNode)`。 | - |
| <b>onNodeDrag</b>(<i>fn</i>) | 节点拖动交互的回调函数。在拖动节点时，每次更新其位置时都会重复调用此函数。节点对象作为单个参数包含 `onNodeDrag(node)`。 | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | 节点拖动交互结束的回调函数。释放节点时调用此函数。节点对象作为单个参数包含 `onNodeDragEnd(node)`。 | - |
| <b>onLinkClick</b>(<i>fn</i>) | 链接点击的回调函数。链接对象作为单个参数包含 `onLinkClick(link)`。 | - |
| <b>onLinkHover</b>(<i>fn</i>) | 链接鼠标悬停事件的回调函数。链接对象（如果鼠标视线下没有链接则为 `null`）作为第一个参数包含，前一个链接对象（或 null）作为第二个参数：`onLinkHover(link, prevLink)`。 | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | 是否在近距离（低值）或远距离（高值）注视链接时显示链接标签。 | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | 是否启用鼠标跟踪事件的 Getter/Setter。这会激活画布鼠标位置的内部跟踪器，并启用对象悬停/点击和工具提示标签的功能，但会影响性能。如果您希望图性能达到最大增益，建议关闭此属性。 | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | 是否启用用户通过点击拖动来拖动节点的交互的 Getter/Setter。仅在 `d3` 力引擎上支持。如果启用，每次拖动节点时，模拟都会重新加热，以便其他节点对更改做出反应。仅在 enablePointerInteraction 为 `true` 且使用 `d3` 力引擎时适用。 | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | 是否启用用于使用鼠标交互（旋转/缩放/平移）移动相机的轨迹球导航控件的 Getter/Setter。 | `true` |

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
