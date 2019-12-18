import React, { useState, useRef, useMemo, useEffect } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import { c as co } from '../index-8dc41d20.js';
import { s as slicedToArray, t as toConsumableArray } from '../_babelHelpers-a63acad8.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';
import '../index-08be7313.js';
import { C as CRender } from '../index-4ffa622f.js';

var css = ".dv-water-pond-level {\n  position: relative;\n}\n.dv-water-pond-level svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n.dv-water-pond-level text {\n  font-size: 25px;\n  font-weight: bold;\n  text-anchor: middle;\n  dominant-baseline: middle;\n}\n.dv-water-pond-level ellipse,\n.dv-water-pond-level rect {\n  fill: none;\n  stroke-width: 3;\n}\n.dv-water-pond-level canvas {\n  margin-top: 8px;\n  margin-left: 8px;\n  width: calc(100% - 16px);\n  height: calc(100% - 16px);\n  box-sizing: border-box;\n}\n";
styleInject(css);

var _marked = /*#__PURE__*/regeneratorRuntime.mark(animationWave);

var defaultConfig = {
  /**
   * @description Data
   * @type {Array<Number>}
   * @default data = []
   * @example data = [60, 40]
   */
  data: [],
  /**
   * @description Shape of wanter level pond
   * @type {String}
   * @default shape = 'rect'
   * @example shape = 'rect' | 'roundRect' | 'round'
   */
  shape: 'rect',
  /**
   * @description Water wave number
   * @type {Number}
   * @default waveNum = 3
   */
  waveNum: 3,
  /**
   * @description Water wave height (px)
   * @type {Number}
   * @default waveHeight = 40
   */
  waveHeight: 40,
  /**
   * @description Wave opacity
   * @type {Number}
   * @default waveOpacity = 0.4
   */
  waveOpacity: 0.4,
  /**
   * @description Colors (hex|rgb|rgba|color keywords)
   * @type {Array<String>}
   * @default colors = ['#00BAFF', '#3DE7C9']
   * @example colors = ['#000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
   */
  colors: ['#3DE7C9', '#00BAFF'],
  /**
   * @description Formatter
   * @type {String}
   * @default formatter = '{value}%'
   */
  formatter: '{value}%'
};

function drawed(_ref, _ref2) {
  var points = _ref.shape.points;
  var ctx = _ref2.ctx,
      area = _ref2.area;

  var firstPoint = points[0];
  var lastPoint = points.slice(-1)[0];

  var h = area[1];

  ctx.lineTo(lastPoint[0], h);
  ctx.lineTo(firstPoint[0], h);

  ctx.closePath();

  ctx.fill();
}

function mergeOffset(_ref3, _ref4) {
  var _ref6 = slicedToArray(_ref3, 2),
      x = _ref6[0],
      y = _ref6[1];

  var _ref5 = slicedToArray(_ref4, 2),
      ox = _ref5[0],
      oy = _ref5[1];

  return [x + ox, y + oy];
}

function calcSvgBorderGradient(_ref7) {
  var colors = _ref7.colors;

  var colorNum = colors.length;

  var colorOffsetGap = 100 / (colorNum - 1);

  return colors.map(function (c, i) {
    return [colorOffsetGap * i, c];
  });
}

function calcDetails(_ref8) {
  var data = _ref8.data,
      formatter = _ref8.formatter;

  if (!data.length) {
    return '';
  }

  var maxValue = Math.max.apply(Math, toConsumableArray(data));

  return formatter.replace('{value}', maxValue);
}

function getWaveShapes(_ref9, _ref10) {
  var waveNum = _ref9.waveNum,
      waveHeight = _ref9.waveHeight,
      data = _ref9.data;

  var _ref11 = slicedToArray(_ref10, 2),
      w = _ref11[0],
      h = _ref11[1];

  var pointsNum = waveNum * 4 + 4;

  var pointXGap = w / waveNum / 2;

  return data.map(function (v) {
    var points = new Array(pointsNum).fill(0).map(function (foo, j) {
      var x = w - pointXGap * j;

      var startY = (1 - v / 100) * h;

      var y = j % 2 === 0 ? startY : startY - waveHeight;

      return [x, y];
    });

    points = points.map(function (p) {
      return mergeOffset(p, [pointXGap * 2, 0]);
    });

    return { points: points };
  });
}

function getWaveStyle(_ref12, area) {
  var colors = _ref12.colors,
      waveOpacity = _ref12.waveOpacity;

  return {
    gradientColor: colors,
    gradientType: 'linear',
    gradientParams: [0, 0, 0, area[1]],
    gradientWith: 'fill',
    opacity: waveOpacity,
    translate: [0, 0]
  };
}

function getWave(mergedConfig, renderer) {
  var area = renderer.area;
  var shapes = getWaveShapes(mergedConfig, area);
  var style = getWaveStyle(mergedConfig, area);

  return shapes.map(function (shape) {
    return renderer.add({
      name: 'smoothline',
      animationFrame: 300,
      shape: shape,
      style: style,
      drawed: drawed
    });
  });
}

function animationWave(waves, renderer) {
  return regeneratorRuntime.wrap(function animationWave$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          waves.forEach(function (graph) {
            graph.attr('style', { translate: [0, 0] });

            graph.animation('style', {
              translate: [renderer.area[0], 0]
            }, true);
          });

          _context.next = 3;
          return renderer.launchAnimation();

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var WaterLevelPond = function WaterLevelPond(_ref13) {
  var config = _ref13.config,
      className = _ref13.className,
      style = _ref13.style;

  var _useState = useState(null),
      _useState2 = slicedToArray(_useState, 2),
      renderer = _useState2[0],
      setRenderer = _useState2[1];

  var gradientId = useRef('water-level-pond-' + Date.now()).current;

  var domRef = useRef(null);

  var mergedConfig = useMemo(function () {
    return util_2(util_1(defaultConfig, true), config);
  }, [config]);

  var svgBorderGradient = useMemo(function () {
    return calcSvgBorderGradient(mergedConfig);
  }, [mergedConfig]);

  var details = useMemo(function () {
    return calcDetails(mergedConfig);
  }, [mergedConfig]);

  var radius = useMemo(function () {
    var shape = mergedConfig.shape;


    if (shape === 'round') return '50%';

    if (shape === 'rect') return '0';

    if (shape === 'roundRect') return '10px';

    return '0';
  }, [mergedConfig]);

  var shape = useMemo(function () {
    var shape = mergedConfig.shape;


    return shape || 'rect';
  }, [mergedConfig]);

  useEffect(function () {
    var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(loop);

    var innerRenderer = renderer;

    if (!renderer) {
      innerRenderer = new CRender(domRef.current);

      setRenderer(innerRenderer);
    }

    function loop() {
      var wave;
      return regeneratorRuntime.wrap(function loop$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 30);
              });

            case 2:
              wave = getWave(mergedConfig, innerRenderer);

            case 3:

              return _context2.delegateYield(animationWave(wave, innerRenderer), 't0', 5);

            case 5:
              if (innerRenderer.graphs.length) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return');

            case 7:
              _context2.next = 3;
              break;

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _marked2, this);
    }

    var undescribe = co(loop);

    return function () {
      innerRenderer.delAllGraph();

      undescribe();
    };
  }, [mergedConfig]);

  var classNames = useMemo(function () {
    return classnames('dv-water-pond-level', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style },
    !!renderer && React.createElement(
      'svg',
      null,
      React.createElement(
        'defs',
        null,
        React.createElement(
          'linearGradient',
          { id: gradientId, x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
          svgBorderGradient.map(function (lc) {
            return React.createElement('stop', { key: lc[0], offset: lc[0], stopColor: lc[1] });
          })
        )
      ),
      React.createElement(
        'text',
        {
          stroke: 'url(#' + gradientId + ')',
          fill: 'url(#' + gradientId + ')',
          x: renderer.area[0] / 2 + 8,
          y: renderer.area[1] / 2 + 8
        },
        details
      ),
      !shape || shape === 'round' ? React.createElement('ellipse', {
        cx: renderer.area[0] / 2 + 8,
        cy: renderer.area[1] / 2 + 8,
        rx: renderer.area[0] / 2 + 5,
        ry: renderer.area[1] / 2 + 5,
        stroke: 'url(#' + gradientId + ')'
      }) : React.createElement('rect', {
        x: '2',
        y: '2',
        rx: shape === 'roundRect' ? 10 : 0,
        ry: shape === 'roundRect' ? 10 : 0,
        width: renderer.area[0] + 12,
        height: renderer.area[1] + 12,
        stroke: 'url(#' + gradientId + ')'
      })
    ),
    React.createElement('canvas', { ref: domRef, style: { borderRadius: '' + radius } })
  );
};

WaterLevelPond.propTypes = {
  config: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object

  // 指定 props 的默认值：
};WaterLevelPond.defaultProps = {
  config: {}
};

export default WaterLevelPond;
//# sourceMappingURL=index.js.map
