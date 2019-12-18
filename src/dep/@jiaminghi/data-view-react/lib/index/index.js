'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styleInject_es = require('../style-inject.es-df9d6d42.js');
var index = require('../index-491bd57d.js');
require('../_babelHelpers-1c35d3ad.js');
var autoResize = require('../autoResize-accb117c.js');
var fullScreenContainer = require('../fullScreenContainer/index.js');
var index$1 = require('../index-6753d2bc.js');
var loading = require('../loading/index.js');
var index$1$1 = require('../index-c70d5130.js');
var borderBox1 = require('../borderBox1/index.js');
var borderBox2 = require('../borderBox2/index.js');
var borderBox3 = require('../borderBox3/index.js');
var borderBox4 = require('../borderBox4/index.js');
var borderBox5 = require('../borderBox5/index.js');
var borderBox6 = require('../borderBox6/index.js');
var borderBox7 = require('../borderBox7/index.js');
var borderBox8 = require('../borderBox8/index.js');
var borderBox9 = require('../borderBox9/index.js');
var borderBox10 = require('../borderBox10/index.js');
var index$2 = require('../index-f2264849.js');
var borderBox11 = require('../borderBox11/index.js');
var borderBox12 = require('../borderBox12/index.js');
var borderBox13 = require('../borderBox13/index.js');
var decoration1 = require('../decoration1/index.js');
var decoration2 = require('../decoration2/index.js');
var decoration3 = require('../decoration3/index.js');
var decoration4 = require('../decoration4/index.js');
var decoration5 = require('../decoration5/index.js');
var decoration6 = require('../decoration6/index.js');
var decoration7 = require('../decoration7/index.js');
var decoration8 = require('../decoration8/index.js');
var decoration9 = require('../decoration9/index.js');
var decoration10 = require('../decoration10/index.js');
require('../index-c21ace42.js');
require('../index-b652a004.js');
require('../index-7a77d038.js');
var charts = require('../charts/index.js');
var digitalFlop = require('../digitalFlop/index.js');
var activeRingChart = require('../activeRingChart/index.js');
var capsuleChart = require('../capsuleChart/index.js');
var waterLevelPond = require('../waterLevelPond/index.js');
var percentPond = require('../percentPond/index.js');
var flylineChart = require('../flylineChart/index.js');
var conicalColumnChart = require('../conicalColumnChart/index.js');
var scrollBoard = require('../scrollBoard/index.js');
var scrollRankingBoard = require('../scrollRankingBoard/index.js');

var css = ".dv-decoration-11 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n.dv-decoration-11 .decoration-content {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['#1a98fc', '#2cf7fe'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var _useAutoResize = autoResize.useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var mergedColor = React.useMemo(function () {
    return index$1$1.util_2(index$1$1.util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-decoration-11', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      { width: width, height: height },
      React__default.createElement('polygon', {
        fill: index$2.lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: '20 10, 25 4, 55 4 60 10'
      }),
      React__default.createElement('polygon', {
        fill: index$2.lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: '20 ' + (height - 10) + ', 25 ' + (height - 4) + ', 55 ' + (height - 4) + ' 60 ' + (height - 10)
      }),
      React__default.createElement('polygon', {
        fill: index$2.lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: width - 20 + ' 10, ' + (width - 25) + ' 4, ' + (width - 55) + ' 4 ' + (width - 60) + ' 10'
      }),
      React__default.createElement('polygon', {
        fill: index$2.lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: width - 20 + ' ' + (height - 10) + ', ' + (width - 25) + ' ' + (height - 4) + ', ' + (width - 55) + ' ' + (height - 4) + ' ' + (width - 60) + ' ' + (height - 10)
      }),
      React__default.createElement('polygon', {
        fill: index$2.lib_9(mergedColor[0] || defaultColor[0], 20),
        stroke: mergedColor[0],
        points: '\n            20 10, 5 ' + height / 2 + ' 20 ' + (height - 10) + '\n            ' + (width - 20) + ' ' + (height - 10) + ' ' + (width - 5) + ' ' + height / 2 + ' ' + (width - 20) + ' 10\n          '
      }),
      React__default.createElement('polyline', {
        fill: 'transparent',
        stroke: index$2.lib_9(mergedColor[0] || defaultColor[0], 70),
        points: '25 18, 15 ' + height / 2 + ' 25 ' + (height - 18)
      }),
      React__default.createElement('polyline', {
        fill: 'transparent',
        stroke: index$2.lib_9(mergedColor[0] || defaultColor[0], 70),
        points: width - 25 + ' 18, ' + (width - 15) + ' ' + height / 2 + ' ' + (width - 25) + ' ' + (height - 18)
      })
    ),
    React__default.createElement(
      'div',
      { className: 'decoration-content' },
      children
    )
  );
};

BorderBox.propTypes = {
  children: styleInject_es.PropTypes.node,
  className: styleInject_es.PropTypes.string,
  style: styleInject_es.PropTypes.object,
  color: styleInject_es.PropTypes.array
};

exports.co = index.co;
exports.useAutoResize = autoResize.useAutoResize;
exports.FullScreenContainer = fullScreenContainer;
exports.Loading = loading;
exports.BorderBox1 = borderBox1;
exports.BorderBox2 = borderBox2;
exports.BorderBox3 = borderBox3;
exports.BorderBox4 = borderBox4;
exports.BorderBox5 = borderBox5;
exports.BorderBox6 = borderBox6;
exports.BorderBox7 = borderBox7;
exports.BorderBox8 = borderBox8;
exports.BorderBox9 = borderBox9;
exports.BorderBox10 = borderBox10;
exports.BorderBox11 = borderBox11;
exports.BorderBox12 = borderBox12;
exports.BorderBox13 = borderBox13;
exports.Decoration1 = decoration1;
exports.Decoration2 = decoration2;
exports.Decoration3 = decoration3;
exports.Decoration4 = decoration4;
exports.Decoration5 = decoration5;
exports.Decoration6 = decoration6;
exports.Decoration7 = decoration7;
exports.Decoration8 = decoration8;
exports.Decoration9 = decoration9;
exports.Decoration10 = decoration10;
exports.Charts = charts;
exports.DigitalFlop = digitalFlop;
exports.ActiveRingChart = activeRingChart;
exports.CapsuleChart = capsuleChart;
exports.WaterLevelPond = waterLevelPond;
exports.PercentPond = percentPond;
exports.FlylineChart = flylineChart;
exports.ConicalColumnChart = conicalColumnChart;
exports.ScrollBoard = scrollBoard;
exports.ScrollRankingBoard = scrollRankingBoard;
exports.Decoration11 = BorderBox;
//# sourceMappingURL=index.js.map
