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

var css = ".dv-border-box-6 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-6 .dv-svg-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-6 .dv-svg-container polyline {\n  fill: none;\n  stroke-width: 1;\n}\n.dv-border-box-6 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['rgba(255, 255, 255, 0.35)', 'gray'];

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
    return index$1.classnames('dv-border-box-6', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      { className: 'dv-svg-container', width: width, height: height },
      React__default.createElement('circle', { fill: mergedColor[1], cx: '5', cy: '5', r: '2' }),
      React__default.createElement('circle', { fill: mergedColor[1], cx: width - 5, cy: '5', r: '2' }),
      React__default.createElement('circle', { fill: mergedColor[1], cx: width - 5, cy: height - 5, r: '2' }),
      React__default.createElement('circle', { fill: mergedColor[1], cx: '5', cy: height - 5, r: '2' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '10, 4 ' + (width - 10) + ', 4' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '10, ' + (height - 4) + ' ' + (width - 10) + ', ' + (height - 4) }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '5, 70 5, ' + (height - 70) }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: width - 5 + ', 70 ' + (width - 5) + ', ' + (height - 70) }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '3, 10, 3, 50' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '7, 30 7, 80' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: width - 3 + ', 10 ' + (width - 3) + ', 50' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: width - 7 + ', 30 ' + (width - 7) + ', 80' }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '3, ' + (height - 10) + ' 3, ' + (height - 50) }),
      React__default.createElement('polyline', { stroke: mergedColor[0], points: '7, ' + (height - 30) + ' 7, ' + (height - 80) }),
      React__default.createElement('polyline', {
        stroke: mergedColor[0],
        points: width - 3 + ', ' + (height - 10) + ' ' + (width - 3) + ', ' + (height - 50)
      }),
      React__default.createElement('polyline', {
        stroke: mergedColor[0],
        points: width - 7 + ', ' + (height - 30) + ' ' + (width - 7) + ', ' + (height - 80)
      })
    ),
    React__default.createElement(
      'div',
      { className: 'border-box-content' },
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
