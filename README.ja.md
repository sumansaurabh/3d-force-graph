# 3D Force-Directed Graph

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

力指向反復レイアウトを使用して、3次元空間でグラフデータ構造を表現するWebコンポーネントです。
3Dレンダリングには[ThreeJS](https://github.com/mrdoob/three.js/)/WebGLを、物理エンジンには[d3-force-3d](https://github.com/vasturiano/d3-force-3d)または[ngraph](https://github.com/anvaka/ngraph.forcelayout3d)を使用しています。

サンプルをご覧ください:
* [基本](https://vasturiano.github.io/3d-force-graph/example/basic/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [非同期読み込み](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [大規模グラフ (~4k要素)](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [方向性のある矢印](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [方向性のある移動パーティクル](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [曲線とセルフリンク](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [自動カラーノード/リンク](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [テキストノード](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [カスタムノードジオメトリ](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [カメラの自動周回](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [ノードへのクリックフォーカス](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [ノード/リンクのハイライト](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [動的データ変更](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [ノード衝突検出](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [シーンへの外部オブジェクトの追加](https://vasturiano.github.io/3d-force-graph/example/scene/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

[VRバージョン](https://github.com/vasturiano/3d-force-graph-vr)と[2Dキャンバスバージョン](https://github.com/vasturiano/force-graph)もご覧ください。

また、[Reactバインディング](https://github.com/vasturiano/react-force-graph)もチェックしてください。

## クイックスタート

```
import ForceGraph3D from '3d-force-graph';
```
または
```
var ForceGraph3D = require('3d-force-graph');
```
さらに
```
<script src="//unpkg.com/3d-force-graph"></script>
```
そして
```
var myGraph = ForceGraph3D();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## APIリファレンス

### データ入力
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | グラフデータ構造のゲッター/セッター(構文の詳細は以下を参照)。[増分更新](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6)の適用にも使用できます。 | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | <i>graphData</i>を直接指定する代わりに、グラフデータを直接読み込むJSONファイルのURL。 | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>idField</i>)</sub> | 一意のノードIDのノードオブジェクトアクセサー属性(リンクオブジェクトのソース/ターゲットで使用)。 | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>linkSourceField</i>)</sub> | ソースノードのIDを参照するリンクオブジェクトアクセサー属性。 | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>linkTargetField</i>)</sub> | ターゲットノードのIDを参照するリンクオブジェクトアクセサー属性。 | `target` |

### コンテナレイアウト
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | キャンバス幅のゲッター/セッター。 | *&lt;ウィンドウ幅&gt;* |
| <b>height</b>([<i>px</i>]) | キャンバス高さのゲッター/セッター。 | *&lt;ウィンドウ高さ&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | チャート背景色のゲッター/セッター。 | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | ナビゲーションコントロールフッター情報を表示するかどうかのゲッター/セッター。 | `true` |

### ノードスタイリング
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | 値単位あたりのノード球体積(立方px)の比率のゲッター/セッター。 | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>valField</i>)</sub> | ノード数値(球体積に影響)のノードオブジェクトアクセサー関数、属性、または数値定数。 | `val` |
| <b>nodeLabel</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>nameField</i>)</sub> | 名前(ラベルに表示)のノードオブジェクトアクセサー関数または属性。プレーンテキストまたはHTMLコンテンツをサポート。 | `name` |
| <b>nodeColor</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>colorField</i>)</sub> | ノード色(球体色に影響)のノードオブジェクトアクセサー関数または属性。 | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>autoColorBy</i>)</sub> | 色を自動的にグループ化するためのノードオブジェクトアクセサー関数(`fn(node)`)または属性(例: `'type'`)。色属性のないノードにのみ影響します。 | |
| <b>nodeOpacity</b>([<i>num</i>]) | ノード球体の不透明度のゲッター/セッター、[0,1]の範囲。 | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | 各ノードの幾何学的解像度のゲッター/セッター、円周を分割するスライスセグメント数で表現。高い値はより滑らかな球体を生成します。 | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> または <i>fn</i>]) | グラフノードとしてレンダリングするカスタム3dオブジェクトを生成するためのノードオブジェクトアクセサー関数または属性。[ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D)のインスタンスを返す必要があります。<i>falsy</i>値が返された場合、そのノードにはデフォルトの3dオブジェクトタイプが使用されます。  | *デフォルトのノードオブジェクトは球体で、`val`に応じてサイズ調整され、`color`に応じてスタイル設定されます。* |

### リンクスタイリング
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> または <i>fn</i>]) | 名前(ラベルに表示)のリンクオブジェクトアクセサー関数または属性。プレーンテキストまたはHTMLコンテンツをサポート。 | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> または <i>fn</i>]) | リンク線を表示するかどうかのリンクオブジェクトアクセサー関数、属性、またはブール定数。`false`の値は、レンダリングせずにリンク力を維持します。 | `true` |
| <b>linkColor</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>linkColorField</i>)</sub> | 線の色のリンクオブジェクトアクセサー関数または属性。 | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> または <i>fn</i>]) | 色を自動的にグループ化するためのリンクオブジェクトアクセサー関数(`fn(link)`)または属性(例: `'type'`)。色属性のないリンクにのみ影響します。 | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(エイリアス: <i>lineOpacity</i>)</sub> | リンクの線の不透明度のゲッター/セッター、[0,1]の範囲。 | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンク線の幅のリンクオブジェクトアクセサー関数、属性、または数値定数。ゼロの値は、距離に関係なく幅が一定(`1px`)の[ThreeJS Line](https://threejs.org/docs/#api/objects/Line)をレンダリングします。値はインデックス化のために最も近い小数点に丸められます。 | 0 |
| <b>linkResolution</b>([<i>num</i>]) | 各リンクの幾何学的解像度のゲッター/セッター、シリンダーを分割する放射状セグメント数で表現。高い値はより滑らかなシリンダーを生成します。正の幅を持つリンクにのみ適用されます。 | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンク線の曲率半径のリンクオブジェクトアクセサー関数、属性、または数値定数。[ThreeJS Line](https://threejs.org/docs/#api/objects/Line)(`0`幅)を使用するリンクにのみ適用されます。曲線は3Dベジェ曲線として表現され、任意の数値が受け入れられます。`0`の値は直線をレンダリングします。`1`は線の長さの半分に等しい半径を示し、曲線が半円に近似します。セルフリファレンシングリンク(`source`が`target`と等しい)の場合、曲線はノードの周りのループとして表現され、曲率値に比例する長さになります。線は正の値で時計回り、負の値で反時計回りに曲げられます。曲線のレンダリングは純粋に視覚効果であり、基礎となる力の動作には影響しないことに注意してください。 | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 曲線に適用する線軸に沿った回転のリンクオブジェクトアクセサー関数、属性、または数値定数。直線には影響しません。`0`回転では、曲線は`XY`平面との交差方向に向けられます。回転角度(ラジアン)は、この基準方向から「始点から終点」軸の周りで曲線を時計回りに回転させます。 | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> または <i>fn</i>]) | グラフリンクをスタイル設定するためのカスタムマテリアルを指定するためのリンクオブジェクトアクセサー関数または属性。[ThreeJS Material](https://threejs.org/docs/#api/materials/Material)のインスタンスを返す必要があります。<i>falsy</i>値が返された場合、そのリンクにはデフォルトのマテリアルが使用されます。 | *デフォルトのリンクマテリアルは[MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)で、`color`と`opacity`に応じてスタイル設定されます。* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクの方向性を示す矢印の長さのリンクオブジェクトアクセサー関数、属性、または数値定数。矢印はリンク線の真上に表示され、`source` > `target`の方向を指します。`0`の値は矢印を非表示にします。 | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> または <i>fn</i>]) | 矢印の色のリンクオブジェクトアクセサー関数または属性。 | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンク線に沿った矢印の縦方向位置のリンクオブジェクトアクセサー関数、属性、または数値定数、`0`と`1`の間の比率で表現されます。`0`は`source`ノードのすぐ隣、`1`は`target`ノードの隣、`0.5`はちょうど中央を示します。 | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | 矢印の幾何学的解像度のゲッター/セッター、円錐底面の円周を分割するスライスセグメント数で表現。高い値はより滑らかな矢印を生成します。 | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンク線上に表示するパーティクル(小さな球体)の数のリンクオブジェクトアクセサー関数、属性、または数値定数。パーティクルは線に沿って等間隔に配置され、`source` > `target`の方向に移動し、リンクの方向性を示すために使用できます。 | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 方向性パーティクルの速度のリンクオブジェクトアクセサー関数、属性、または数値定数、フレームごとに移動するリンク長の比率で表現。`0.5`を超える値は推奨されません。 | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 方向性パーティクルの幅のリンクオブジェクトアクセサー関数、属性、または数値定数。値はインデックス化のために最も近い小数点に丸められます。 | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> または <i>fn</i>]) | 方向性パーティクルの色のリンクオブジェクトアクセサー関数または属性。 | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | 各方向性パーティクルの幾何学的解像度のゲッター/セッター、円周を分割するスライスセグメント数で表現。高い値はより滑らかなパーティクルを生成します。 | 4 |

### レンダリング制御
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>stopAnimation</b>() | コンポーネントのレンダリングサイクルを停止し、現在のビューを効果的に凍結し、今後のすべてのユーザーインタラクションをキャンセルします。このメソッドは、静的画像で十分な場合にパフォーマンスを節約するために使用できます。 | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | `x`、`y`、`z`座標に関するカメラ位置のゲッター/セッター。各座標はオプションで、一部の次元でのみ動作を可能にします。オプションの2番目の引数は、3D空間の`{x,y,z}`ポイントの観点から、カメラが狙う方向を定義するために使用できます。3番目のオプション引数は、カメラの動きをアニメーション化するためのトランジション期間(ms)を定義します。`0`の値(デフォルト)は、カメラを最終位置にすぐに移動させます。 | デフォルトでは、カメラはシステム内のノード数に比例する`z`距離でグラフの中心を向きます。 |
| <b>scene</b>() | 内部ThreeJS [Scene](https://threejs.org/docs/#api/scenes/Scene)にアクセスします。3d-force-graphに関連しない追加のオブジェクトで現在のシーンを拡張するために使用できます。 | |
| <b>camera</b>() | 内部ThreeJS [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera)にアクセスします。 | |
| <b>renderer</b>() | 内部ThreeJS [WebGLレンダラー](https://threejs.org/docs/#api/renderers/WebGLRenderer)にアクセスします。 ||
| <b>tbControls</b>() | 内部ThreeJS [トラックボールコントロール](https://threejs.org/examples/misc_controls_trackball.html)にアクセスします。 ||

### 力エンジン設定
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | 使用する力シミュレーションエンジン([*d3*](https://github.com/vasturiano/d3-force-3d)または[*ngraph*](https://github.com/anvaka/ngraph.forcelayout))のゲッター/セッター。 | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | 力シミュレーションを実行する次元数(1、2、または3)のゲッター/セッター。 | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [シミュレーション強度減衰](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay)パラメータのゲッター/セッター、d3シミュレーションエンジンを使用している場合にのみ適用されます。 | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | 媒体抵抗をシミュレートするノードの[速度減衰](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay)のゲッター/セッター、d3シミュレーションエンジンを使用している場合にのみ適用されます。 | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | d3シミュレーションエンジンを制御する内部力のゲッター/セッター。`d3-force-3d`の[simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force)と同じインターフェースに従います。デフォルトで3つの力が含まれています: `'link'`([forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)に基づく)、`'charge'`([forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)に基づく)、`'center'`([forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)に基づく)。これらの各力は再構成でき、新しい力をシステムに追加できます。このメソッドは、d3シミュレーションエンジンを使用している場合にのみ適用されます。 | |
| <b>warmupTicks</b>([<i>int</i>]) | レンダリングを開始する前に、起動時にドライランするレイアウトエンジンサイクル数のゲッター/セッター。 | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | レイアウトエンジンを停止および凍結する前にレンダリングするビルトインフレーム数のゲッター/セッター。 | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | レイアウトエンジンを停止および凍結する前にレンダリングする時間(ms)のゲッター/セッター。 | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | シミュレーションエンジンの各ティックで呼び出されるコールバック関数。 | - |
| <b>onEngineStop</b>(<i>fn</i>) | シミュレーションエンジンが停止し、レイアウトが凍結されたときに呼び出されるコールバック関数。 | - |

### インタラクション
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | ノードクリックのコールバック関数。ノードオブジェクトが単一の引数`onNodeClick(node)`として含まれます。 | - |
| <b>onNodeHover</b>(<i>fn</i>) | ノードマウスオーバーイベントのコールバック関数。ノードオブジェクト(またはマウスの視線下にノードがない場合は`null`)が最初の引数として、前のノードオブジェクト(またはnull)が2番目の引数として含まれます: `onNodeHover(node, prevNode)`。 | - |
| <b>onNodeDrag</b>(<i>fn</i>) | ノードドラッグインタラクションのコールバック関数。この関数は、ノードをドラッグしている間、位置が更新されるたびに繰り返し呼び出されます。ノードオブジェクトが単一の引数`onNodeDrag(node)`として含まれます。 | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | ノードドラッグインタラクション終了のコールバック関数。この関数は、ノードが解放されたときに呼び出されます。ノードオブジェクトが単一の引数`onNodeDragEnd(node)`として含まれます。 | - |
| <b>onLinkClick</b>(<i>fn</i>) | リンククリックのコールバック関数。リンクオブジェクトが単一の引数`onLinkClick(link)`として含まれます。 | - |
| <b>onLinkHover</b>(<i>fn</i>) | リンクマウスオーバーイベントのコールバック関数。リンクオブジェクト(またはマウスの視線下にリンクがない場合は`null`)が最初の引数として、前のリンクオブジェクト(またはnull)が2番目の引数として含まれます: `onLinkHover(link, prevLink)`。 | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | リンクを間近で見つめたとき(低い値)または遠くから見たとき(高い値)にリンクラベルを表示するかどうか。 | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | マウストラッキングイベントを有効にするかどうかのゲッター/セッター。これにより、キャンバスマウス位置の内部トラッカーがアクティブになり、オブジェクトのホバー/クリックおよびツールチップラベルの機能が有効になりますが、パフォーマンスのコストがかかります。グラフのパフォーマンスで最大の利益を求める場合は、このプロパティをオフにすることをお勧めします。 | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | クリックドラッグによってノードをドラッグするユーザーインタラクションを有効にするかどうかのゲッター/セッター。`d3`力エンジンでのみサポートされています。有効にすると、ノードがドラッグされるたびにシミュレーションが再加熱され、他のノードが変更に反応します。enablePointerInteractionが`true`で、`d3`力エンジンを使用している場合にのみ適用されます。 | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | マウスインタラクション(回転/ズーム/パン)を使用してカメラを移動するために使用されるトラックボールナビゲーションコントロールを有効にするかどうかのゲッター/セッター。 | `true` |

### 入力JSON構文
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
