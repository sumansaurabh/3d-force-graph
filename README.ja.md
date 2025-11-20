# 3D 力指向グラフ

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

力指向反復レイアウトを使用して、グラフデータ構造を3次元空間で表現するWebコンポーネントです。
3Dレンダリングには [ThreeJS](https://github.com/mrdoob/three.js/)/WebGL を使用し、物理エンジンには [d3-force-3d](https://github.com/vasturiano/d3-force-3d) または [ngraph](https://github.com/anvaka/ngraph.forcelayout3d) を使用します。

サンプルをご覧ください：
* [基本](https://vasturiano.github.io/3d-force-graph/example/basic/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [非同期読み込み](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [大規模グラフ（約4k要素）](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [方向矢印](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [方向移動パーティクル](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [曲線と自己リンク](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [自動カラーノード/リンク](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [テキストノード](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [カスタムノードジオメトリ](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [カメラ自動回転](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [クリックでノードにフォーカス](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [ノード/リンクのハイライト](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [動的データ変更](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [ノード衝突検出](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [シーンに外部オブジェクトを追加](https://vasturiano.github.io/3d-force-graph/example/scene/) ([ソース](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

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
または
```
<script src="//unpkg.com/3d-force-graph"></script>
```
その後
```
var myGraph = ForceGraph3D();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## APIリファレンス

### データ入力
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | グラフデータ構造のゲッター/セッター（構文の詳細は以下を参照）。[増分更新](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6)の適用にも使用できます。 | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | <i>graphData</i>を直接指定する代わりに、グラフデータを直接読み込むJSONファイルのURL。 | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>idField</i>)</sub> | 一意のノードID用のノードオブジェクトアクセサ属性（リンクオブジェクトのsource/targetで使用）。 | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>linkSourceField</i>)</sub> | ソースノードのIDを参照するリンクオブジェクトアクセサ属性。 | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(エイリアス: <i>linkTargetField</i>)</sub> | ターゲットノードのIDを参照するリンクオブジェクトアクセサ属性。 | `target` |

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
| <b>nodeRelSize</b>([<i>num</i>]) | 値単位あたりのノード球体体積（立方px）の比率のゲッター/セッター。 | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>valField</i>)</sub> | ノード数値（球体体積に影響）のノードオブジェクトアクセサ関数、属性、または数値定数。 | `val` |
| <b>nodeLabel</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>nameField</i>)</sub> | 名前（ラベルに表示）のノードオブジェクトアクセサ関数または属性。プレーンテキストまたはHTMLコンテンツをサポート。 | `name` |
| <b>nodeColor</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>colorField</i>)</sub> | ノード色（球体色に影響）のノードオブジェクトアクセサ関数または属性。 | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>autoColorBy</i>)</sub> | 色を自動的にグループ化するためのノードオブジェクトアクセサ関数（`fn(node)`）または属性（例：`'type'`）。color属性のないノードにのみ影響します。 | |
| <b>nodeOpacity</b>([<i>num</i>]) | ノード球体の不透明度のゲッター/セッター、[0,1]の範囲。 | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | 各ノードの幾何学的解像度のゲッター/セッター、円周を分割するスライスセグメント数で表現。高い値ほど滑らかな球体になります。 | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> または <i>fn</i>]) | グラフノードとしてレンダリングするカスタム3dオブジェクトを生成するためのノードオブジェクトアクセサ関数または属性。[ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D)のインスタンスを返す必要があります。<i>falsy</i>値が返された場合、そのノードにはデフォルトの3dオブジェクトタイプが使用されます。  | *デフォルトのノードオブジェクトは球体で、`val`に応じてサイズが決まり、`color`に応じてスタイルが設定されます。* |

### リンクスタイリング
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> または <i>fn</i>]) | 名前（ラベルに表示）のリンクオブジェクトアクセサ関数または属性。プレーンテキストまたはHTMLコンテンツをサポート。 | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> または <i>fn</i>]) | リンクラインを表示するかどうかのリンクオブジェクトアクセサ関数、属性、またはブール定数。`false`の値は、レンダリングせずにリンク力を維持します。 | `true` |
| <b>linkColor</b>([<i>str</i> または <i>fn</i>]) <br/><sub>(エイリアス: <i>linkColorField</i>)</sub> | ライン色のリンクオブジェクトアクセサ関数または属性。 | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> または <i>fn</i>]) | 色を自動的にグループ化するためのリンクオブジェクトアクセサ関数（`fn(link)`）または属性（例：`'type'`）。color属性のないリンクにのみ影響します。 | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(エイリアス: <i>lineOpacity</i>)</sub> | リンクのライン不透明度のゲッター/セッター、[0,1]の範囲。 | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクライン幅のリンクオブジェクトアクセサ関数、属性、または数値定数。ゼロの値は、距離に関係なく幅が一定（`1px`）の[ThreeJS Line](https://threejs.org/docs/#api/objects/Line)をレンダリングします。値はインデックス化のために最も近い小数に丸められます。 | 0 |
| <b>linkResolution</b>([<i>num</i>]) | 各リンクの幾何学的解像度のゲッター/セッター、シリンダーを分割する放射状セグメント数で表現。高い値ほど滑らかなシリンダーになります。正の幅を持つリンクにのみ適用されます。 | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクラインの曲率半径のリンクオブジェクトアクセサ関数、属性、または数値定数。[ThreeJS Line](https://threejs.org/docs/#api/objects/Line)（`0`幅）を使用するリンクにのみ適用されます。曲線は3Dベジェ曲線として表現され、任意の数値が受け入れられます。`0`の値は直線をレンダリングします。`1`はライン長の半分に等しい半径を示し、曲線が半円に近似します。自己参照リンク（`source`が`target`と等しい）の場合、曲線は曲率値に比例した長さでノードの周りのループとして表現されます。ラインは正の値で時計回り、負の値で反時計回りに曲がります。曲線のレンダリングは純粋に視覚効果であり、基礎となる力の動作には影響しません。 | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 曲線に適用するライン軸に沿った回転のリンクオブジェクトアクセサ関数、属性、または数値定数。直線には影響しません。`0`回転では、曲線は`XY`平面との交差方向に向けられます。回転角度（ラジアン）は、この基準方向から「開始から終了」軸の周りに曲線を時計回りに回転させます。 | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> または <i>fn</i>]) | グラフリンクをスタイル設定するためのカスタムマテリアルを指定するリンクオブジェクトアクセサ関数または属性。[ThreeJS Material](https://threejs.org/docs/#api/materials/Material)のインスタンスを返す必要があります。<i>falsy</i>値が返された場合、そのリンクにはデフォルトのマテリアルが使用されます。 | *デフォルトのリンクマテリアルは、`color`と`opacity`に応じてスタイル設定された[MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)です。* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクの方向性を示す矢印ヘッドの長さのリンクオブジェクトアクセサ関数、属性、または数値定数。矢印はリンクラインの真上に表示され、`source` > `target`の方向を指します。`0`の値は矢印を非表示にします。 | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> または <i>fn</i>]) | 矢印ヘッドの色のリンクオブジェクトアクセサ関数または属性。 | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクラインに沿った矢印ヘッドの縦方向位置のリンクオブジェクトアクセサ関数、属性、または数値定数、`0`と`1`の間の比率で表現。`0`は`source`ノードのすぐ隣、`1`は`target`ノードの隣、`0.5`はちょうど中央を示します。 | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | 矢印ヘッドの幾何学的解像度のゲッター/セッター、円錐ベース円周を分割するスライスセグメント数で表現。高い値ほど滑らかな矢印になります。 | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | リンクライン上に表示するパーティクル（小さな球体）の数のリンクオブジェクトアクセサ関数、属性、または数値定数。パーティクルはライン上に等間隔で配置され、`source` > `target`の方向に移動し、リンクの方向性を示すために使用できます。 | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 方向性パーティクルの速度のリンクオブジェクトアクセサ関数、属性、または数値定数、フレームごとに移動するリンク長の比率で表現。`0.5`を超える値は推奨されません。 | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> または <i>fn</i>]) | 方向性パーティクルの幅のリンクオブジェクトアクセサ関数、属性、または数値定数。値はインデックス化のために最も近い小数に丸められます。 | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> または <i>fn</i>]) | 方向性パーティクルの色のリンクオブジェクトアクセサ関数または属性。 | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | 各方向性パーティクルの幾何学的解像度のゲッター/セッター、円周を分割するスライスセグメント数で表現。高い値ほど滑らかなパーティクルになります。 | 4 |

### レンダリング制御
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>stopAnimation</b>() | コンポーネントのレンダリングサイクルを停止し、現在のビューを効果的に凍結し、すべての将来のユーザーインタラクションをキャンセルします。このメソッドは、静的画像で十分な状況でパフォーマンスを節約するために使用できます。 | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | カメラ位置のゲッター/セッター、`x`、`y`、`z`座標で表現。各座標はオプションで、一部の次元のみでの動きを可能にします。オプションの2番目の引数は、カメラが向くべき方向を3D空間の`{x,y,z}`ポイントで定義するために使用できます。3番目のオプション引数は、カメラモーションをアニメーション化するトランジションの期間（ms）を定義します。`0`の値（デフォルト）は、カメラを最終位置に即座に移動します。 | デフォルトでは、カメラはシステム内のノード数に比例した`z`距離でグラフの中心を向きます。 |
| <b>scene</b>() | 内部ThreeJS [Scene](https://threejs.org/docs/#api/scenes/Scene)にアクセスします。3d-force-graphに関連しない追加のオブジェクトで現在のシーンを拡張するために使用できます。 | |
| <b>camera</b>() | 内部ThreeJS [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera)にアクセスします。 | |
| <b>renderer</b>() | 内部ThreeJS [WebGLレンダラー](https://threejs.org/docs/#api/renderers/WebGLRenderer)にアクセスします。 || 
| <b>tbControls</b>() | 内部ThreeJS [トラックボールコントロール](https://threejs.org/examples/misc_controls_trackball.html)にアクセスします。 |

### 力エンジン設定 
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | 使用する力シミュレーションエンジン（[*d3*](https://github.com/vasturiano/d3-force-3d)または[*ngraph*](https://github.com/anvaka/ngraph.forcelayout)）のゲッター/セッター。 | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | 力シミュレーションを実行する次元数（1、2、または3）のゲッター/セッター。 | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [シミュレーション強度減衰](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay)パラメータのゲッター/セッター、d3シミュレーションエンジンを使用する場合にのみ適用されます。 | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | 媒体抵抗をシミュレートするノードの[速度減衰](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay)のゲッター/セッター、d3シミュレーションエンジンを使用する場合にのみ適用されます。 | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | d3シミュレーションエンジンを制御する内部力のゲッター/セッター。`d3-force-3d`の[simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force)と同じインターフェースに従います。デフォルトで3つの力が含まれています：`'link'`（[forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)に基づく）、`'charge'`（[forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)に基づく）、`'center'`（[forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)に基づく）。これらの各力は再構成でき、新しい力をシステムに追加できます。このメソッドは、d3シミュレーションエンジンを使用する場合にのみ適用されます。 | |
| <b>warmupTicks</b>([<i>int</i>]) | レンダリングを開始する前に起動時にドライランするレイアウトエンジンサイクル数のゲッター/セッター。 | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | レイアウトエンジンを停止して凍結する前にレンダリングする組み込みフレーム数のゲッター/セッター。 | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | レイアウトエンジンを停止して凍結する前にレンダリングする時間（ms）のゲッター/セッター。 | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | シミュレーションエンジンの各ティックで呼び出されるコールバック関数。 | - |
| <b>onEngineStop</b>(<i>fn</i>) | シミュレーションエンジンが停止してレイアウトが凍結されたときに呼び出されるコールバック関数。 | - |

### インタラクション
| メソッド | 説明 | デフォルト |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | ノードクリックのコールバック関数。ノードオブジェクトが単一の引数として含まれます：`onNodeClick(node)`。 | - |
| <b>onNodeHover</b>(<i>fn</i>) | ノードマウスオーバーイベントのコールバック関数。ノードオブジェクト（またはマウスの視線下にノードがない場合は`null`）が最初の引数として、前のノードオブジェクト（またはnull）が2番目の引数として含まれます：`onNodeHover(node, prevNode)`。 | - |
| <b>onNodeDrag</b>(<i>fn</i>) | ノードドラッグインタラクションのコールバック関数。この関数は、ノードをドラッグしている間、位置が更新されるたびに繰り返し呼び出されます。ノードオブジェクトが単一の引数として含まれます：`onNodeDrag(node)`。 | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | ノードドラッグインタラクション終了のコールバック関数。この関数は、ノードが解放されたときに呼び出されます。ノードオブジェクトが単一の引数として含まれます：`onNodeDragEnd(node)`。 | - |
| <b>onLinkClick</b>(<i>fn</i>) | リンククリックのコールバック関数。リンクオブジェクトが単一の引数として含まれます：`onLinkClick(link)`。 | - |
| <b>onLinkHover</b>(<i>fn</i>) | リンクマウスオーバーイベントのコールバック関数。リンクオブジェクト（またはマウスの視線下にリンクがない場合は`null`）が最初の引数として、前のリンクオブジェクト（またはnull）が2番目の引数として含まれます：`onLinkHover(link, prevLink)`。 | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | リンクを近くから見つめたとき（低い値）または遠くから見つめたとき（高い値）にリンクラベルを表示するかどうか。 | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | マウストラッキングイベントを有効にするかどうかのゲッター/セッター。これにより、キャンバスマウス位置の内部トラッカーがアクティブになり、オブジェクトホバー/クリックおよびツールチップラベルの機能が有効になりますが、パフォーマンスが犠牲になります。グラフのパフォーマンスを最大限に向上させたい場合は、このプロパティをオフにすることをお勧めします。 | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | クリックドラッグでノードをドラッグするユーザーインタラクションを有効にするかどうかのゲッター/セッター。`d3`力エンジンでのみサポートされています。有効にすると、ノードがドラッグされるたびにシミュレーションが再加熱され、他のノードが変更に反応します。enablePointerInteractionが`true`で、`d3`力エンジンを使用している場合にのみ適用されます。 | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | マウスインタラクション（回転/ズーム/パン）を使用してカメラを移動するために使用されるトラックボールナビゲーションコントロールを有効にするかどうかのゲッター/セッター。 | `true` |

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
