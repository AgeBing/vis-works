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
var index$2 = require('../index-f2264849.js');

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

module.exports = BorderBox;
//# sourceMappingURL=index.js.map
