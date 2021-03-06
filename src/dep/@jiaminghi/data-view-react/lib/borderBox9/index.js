'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styleInject_es = require('../style-inject.es-df9d6d42.js');
require('../index-491bd57d.js');
var _babelHelpers = require('../_babelHelpers-1c35d3ad.js');
var autoResize = require('../autoResize-accb117c.js');
var index$1 = require('../index-6753d2bc.js');
var index$1$1 = require('../index-c70d5130.js');

var css = ".dv-border-box-9 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-9 svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0px;\n  top: 0px;\n}\n.dv-border-box-9 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['#11eefd', '#0078d2'];

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

  var _useState = React.useState(function () {
    var timestamp = Date.now();

    return {
      gradientId: 'border-box-9-gradient-' + timestamp,
      maskId: 'border-box-9-mask-' + timestamp
    };
  }),
      _useState2 = _babelHelpers.slicedToArray(_useState, 1),
      _useState2$ = _useState2[0],
      gradientId = _useState2$.gradientId,
      maskId = _useState2$.maskId;

  var mergedColor = React.useMemo(function () {
    return index$1$1.util_2(index$1$1.util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-border-box-9', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      { className: 'dv-svg-container', width: width, height: height },
      React__default.createElement(
        'defs',
        null,
        React__default.createElement(
          'linearGradient',
          { id: gradientId, x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
          React__default.createElement('animate', {
            attributeName: 'x1',
            values: '0%;100%;0%',
            dur: '10s',
            begin: '0s',
            repeatCount: 'indefinite'
          }),
          React__default.createElement('animate', {
            attributeName: 'x2',
            values: '100%;0%;100%',
            dur: '10s',
            begin: '0s',
            repeatCount: 'indefinite'
          }),
          React__default.createElement(
            'stop',
            { offset: '0%', stopColor: mergedColor[0] },
            React__default.createElement('animate', {
              attributeName: 'stop-color',
              values: mergedColor[0] + ';' + mergedColor[1] + ';' + mergedColor[0],
              dur: '10s',
              begin: '0s',
              repeatCount: 'indefinite'
            })
          ),
          React__default.createElement(
            'stop',
            { offset: '100%', stopColor: mergedColor[1] },
            React__default.createElement('animate', {
              attributeName: 'stop-color',
              values: mergedColor[1] + ';' + mergedColor[0] + ';' + mergedColor[1],
              dur: '10s',
              begin: '0s',
              repeatCount: 'indefinite'
            })
          )
        ),
        React__default.createElement(
          'mask',
          { id: maskId },
          React__default.createElement('polyline', {
            stroke: '#fff',
            strokeWidth: '3',
            fill: 'transparent',
            points: '8, ' + height * 0.4 + ' 8, 3, ' + (width * 0.4 + 7) + ', 3'
          }),
          React__default.createElement('polyline', {
            fill: '#fff',
            points: '8, ' + height * 0.15 + ' 8, 3, ' + (width * 0.1 + 7) + ', 3\n                ' + width * 0.1 + ', 8 14, 8 14, ' + (height * 0.15 - 7) + '\n              '
          }),
          React__default.createElement('polyline', {
            stroke: '#fff',
            strokeWidth: '3',
            fill: 'transparent',
            points: width * 0.5 + ', 3 ' + (width - 3) + ', 3, ' + (width - 3) + ', ' + height * 0.25
          }),
          React__default.createElement('polyline', {
            fill: '#fff',
            points: '\n                ' + width * 0.52 + ', 3 ' + width * 0.58 + ', 3\n                ' + (width * 0.58 - 7) + ', 9 ' + (width * 0.52 + 7) + ', 9\n              '
          }),
          React__default.createElement('polyline', {
            fill: '#fff',
            points: '\n                ' + width * 0.9 + ', 3 ' + (width - 3) + ', 3 ' + (width - 3) + ', ' + height * 0.1 + '\n                ' + (width - 9) + ', ' + (height * 0.1 - 7) + ' ' + (width - 9) + ', 9 ' + (width * 0.9 + 7) + ', 9\n              '
          }),
          React__default.createElement('polyline', {
            stroke: '#fff',
            strokeWidth: '3',
            fill: 'transparent',
            points: '8, ' + height * 0.5 + ' 8, ' + (height - 3) + ' ' + (width * 0.3 + 7) + ', ' + (height - 3)
          }),
          React__default.createElement('polyline', {
            fill: '#fff',
            points: '\n                8, ' + height * 0.55 + ' 8, ' + height * 0.7 + '\n                2, ' + (height * 0.7 - 7) + ' 2, ' + (height * 0.55 + 7) + '\n              '
          }),
          React__default.createElement('polyline', {
            stroke: '#fff',
            strokeWidth: '3',
            fill: 'transparent',
            points: width * 0.35 + ', ' + (height - 3) + ' ' + (width - 3) + ', ' + (height - 3) + ' ' + (width - 3) + ', ' + height * 0.35
          }),
          React__default.createElement('polyline', {
            fill: '#fff',
            points: '\n                ' + width * 0.92 + ', ' + (height - 3) + ' ' + (width - 3) + ', ' + (height - 3) + ' ' + (width - 3) + ', ' + height * 0.8 + '\n                ' + (width - 9) + ', ' + (height * 0.8 + 7) + ' ' + (width - 9) + ', ' + (height - 9) + ' ' + (width * 0.92 + 7) + ', ' + (height - 9) + '\n              '
          })
        )
      ),
      React__default.createElement('rect', {
        x: '0',
        y: '0',
        width: width,
        height: height,
        fill: 'url(#' + gradientId + ')',
        mask: 'url(#' + maskId + ')'
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
