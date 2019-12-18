'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styleInject_es = require('../style-inject.es-df9d6d42.js');
require('../index-491bd57d.js');
require('../_babelHelpers-1c35d3ad.js');
var autoResize = require('../autoResize-accb117c.js');
var index$1 = require('../index-6753d2bc.js');
var index$1$1 = require('../index-c70d5130.js');

var css = ".dv-decoration-5 {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['#3f96a5', '#3f96a5'];

var Decoration = function Decoration(_ref) {
  var className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var _useAutoResize = autoResize.useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  function calcSVGData() {
    var line1Points = [[0, height * 0.2], [width * 0.18, height * 0.2], [width * 0.2, height * 0.4], [width * 0.25, height * 0.4], [width * 0.27, height * 0.6], [width * 0.72, height * 0.6], [width * 0.75, height * 0.4], [width * 0.8, height * 0.4], [width * 0.82, height * 0.2], [width, height * 0.2]];

    var line2Points = [[width * 0.3, height * 0.8], [width * 0.7, height * 0.8]];

    var line1Length = index$1$1.util_7(line1Points);
    var line2Length = index$1$1.util_7(line2Points);

    line1Points = line1Points.map(function (point) {
      return point.join(',');
    }).join(' ');
    line2Points = line2Points.map(function (point) {
      return point.join(',');
    }).join(' ');

    return { line1Points: line1Points, line2Points: line2Points, line1Length: line1Length, line2Length: line2Length };
  }

  var mergedColor = React.useMemo(function () {
    return index$1$1.util_2(index$1$1.util_1(defaultColor, true), color || []);
  }, [color]);

  var _useMemo = React.useMemo(calcSVGData, [width, height]),
      line1Points = _useMemo.line1Points,
      line2Points = _useMemo.line2Points,
      line1Length = _useMemo.line1Length,
      line2Length = _useMemo.line2Length;

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-decoration-5', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      { width: width, height: height },
      React__default.createElement(
        'polyline',
        {
          fill: 'transparent',
          stroke: mergedColor[0],
          strokeWidth: '3',
          points: line1Points
        },
        React__default.createElement('animate', {
          attributeName: 'stroke-dasharray',
          attributeType: 'XML',
          from: '0, ' + line1Length / 2 + ', 0, ' + line1Length / 2,
          to: '0, 0, ' + line1Length + ', 0',
          dur: '1.2s',
          begin: '0s',
          calcMode: 'spline',
          keyTimes: '0;1',
          keySplines: '0.4,1,0.49,0.98',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polyline',
        {
          fill: 'transparent',
          stroke: mergedColor[1],
          strokeWidth: '2',
          points: line2Points
        },
        React__default.createElement('animate', {
          attributeName: 'stroke-dasharray',
          attributeType: 'XML',
          from: '0, ' + line2Length / 2 + ', 0, ' + line2Length / 2,
          to: '0, 0, ' + line2Length + ', 0',
          dur: '1.2s',
          begin: '0s',
          calcMode: 'spline',
          keyTimes: '0;1',
          keySplines: '.4,1,.49,.98',
          repeatCount: 'indefinite'
        })
      )
    )
  );
};

Decoration.propTypes = {
  className: styleInject_es.PropTypes.string,
  style: styleInject_es.PropTypes.object,
  color: styleInject_es.PropTypes.array
};

module.exports = Decoration;
//# sourceMappingURL=index.js.map
