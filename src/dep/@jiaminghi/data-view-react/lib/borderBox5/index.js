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

var css = ".dv-border-box-5 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-5 .dv-reverse {\n  transform: rotate(180deg);\n}\n.dv-border-box-5 .dv-svg-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-5 .dv-svg-container polyline {\n  fill: none;\n}\n.dv-border-box-5 .dv-bb5-line-1,\n.dv-border-box-5 .dv-bb5-line-2 {\n  stroke-width: 1;\n}\n.dv-border-box-5 .dv-bb5-line-3,\n.dv-border-box-5 .dv-bb5-line-6 {\n  stroke-width: 5;\n}\n.dv-border-box-5 .dv-bb5-line-4,\n.dv-border-box-5 .dv-bb5-line-5 {\n  stroke-width: 2;\n}\n.dv-border-box-5 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
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
    return index$1.classnames('dv-border-box-5', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      {
        className: 'dv-svg-container  ' + (reverse && 'dv-reverse'),
        width: width,
        height: height
      },
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-1',
        stroke: mergedColor[0],
        points: '8, 5 ' + (width - 5) + ', 5 ' + (width - 5) + ', ' + (height - 100) + '\n          ' + (width - 100) + ', ' + (height - 5) + ' 8, ' + (height - 5) + ' 8, 5'
      }),
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-2',
        stroke: mergedColor[1],
        points: '3, 5 ' + (width - 20) + ', 5 ' + (width - 20) + ', ' + (height - 60) + '\n          ' + (width - 74) + ', ' + (height - 5) + ' 3, ' + (height - 5) + ' 3, 5'
      }),
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-3',
        stroke: mergedColor[1],
        points: '50, 13 ' + (width - 35) + ', 13'
      }),
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-4',
        stroke: mergedColor[1],
        points: '15, 20 ' + (width - 35) + ', 20'
      }),
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-5',
        stroke: mergedColor[1],
        points: '15, ' + (height - 20) + ' ' + (width - 110) + ', ' + (height - 20)
      }),
      React__default.createElement('polyline', {
        className: 'dv-bb5-line-6',
        stroke: mergedColor[1],
        points: '15, ' + (height - 13) + ' ' + (width - 110) + ', ' + (height - 13)
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
  reverse: styleInject_es.PropTypes.bool,
  className: styleInject_es.PropTypes.string,
  style: styleInject_es.PropTypes.object,
  color: styleInject_es.PropTypes.array

  // 指定 props 的默认值：
};BorderBox.defaultProps = {
  reverse: false
};

module.exports = BorderBox;
//# sourceMappingURL=index.js.map
