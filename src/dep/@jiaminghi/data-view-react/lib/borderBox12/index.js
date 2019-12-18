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

var css = ".dv-border-box-12 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-12 .dv-border-svg-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n.dv-border-box-12 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['#2e6099', '#7ce7fd'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var filterId = React.useRef('borderr-box-12-filterId-' + Date.now()).current;

  var _useAutoResize = autoResize.useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var mergedColor = React.useMemo(function () {
    return index$1$1.util_2(index$1$1.util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-border-box-12', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement(
      'svg',
      { className: 'dv-border-svg-container', width: width, height: height },
      React__default.createElement(
        'defs',
        null,
        React__default.createElement(
          'filter',
          { id: filterId, height: '150%', width: '150%', x: '-25%', y: '-25%' },
          React__default.createElement('feMorphology', { operator: 'dilate', radius: '1', 'in': 'SourceAlpha', result: 'thicken' }),
          React__default.createElement('feGaussianBlur', { 'in': 'thicken', stdDeviation: '2', result: 'blurred' }),
          React__default.createElement(
            'feFlood',
            { floodColor: index$2.lib_9(mergedColor[1] || defaultColor[1], 70), result: 'glowColor' },
            React__default.createElement('animate', {
              attributeName: 'flood-color',
              values: '\n                ' + index$2.lib_9(mergedColor[1] || defaultColor[1], 70) + ';\n                ' + index$2.lib_9(mergedColor[1] || defaultColor[1], 30) + ';\n                ' + index$2.lib_9(mergedColor[1] || defaultColor[1], 70) + ';\n              ',
              dur: '3s',
              begin: '0s',
              repeatCount: 'indefinite'
            })
          ),
          React__default.createElement('feComposite', { 'in': 'glowColor', in2: 'blurred', operator: 'in', result: 'softGlowColored' }),
          React__default.createElement(
            'feMerge',
            null,
            React__default.createElement('feMergeNode', { 'in': 'softGlowColored' }),
            React__default.createElement('feMergeNode', { 'in': 'SourceGraphic' })
          )
        )
      ),
      width && height && React__default.createElement('path', {
        fill: 'transparent',
        strokeWidth: '2',
        stroke: mergedColor[0],
        d: '\n            M15 5 L ' + (width - 15) + ' 5 Q ' + (width - 5) + ' 5, ' + (width - 5) + ' 15\n            L ' + (width - 5) + ' ' + (height - 15) + ' Q ' + (width - 5) + ' ' + (height - 5) + ', ' + (width - 15) + ' ' + (height - 5) + '\n            L 15, ' + (height - 5) + ' Q 5 ' + (height - 5) + ' 5 ' + (height - 15) + ' L 5 15\n            Q 5 5 15 5\n          '
      }),
      React__default.createElement('path', {
        strokeWidth: '2',
        fill: 'transparent',
        strokeLinecap: 'round',
        filter: 'url(#' + filterId + ')',
        stroke: mergedColor[1],
        d: 'M 20 5 L 15 5 Q 5 5 5 15 L 5 20'
      }),
      React__default.createElement('path', {
        strokeWidth: '2',
        fill: 'transparent',
        strokeLinecap: 'round',
        filter: 'url(#' + filterId + ')',
        stroke: mergedColor[1],
        d: 'M ' + (width - 20) + ' 5 L ' + (width - 15) + ' 5 Q ' + (width - 5) + ' 5 ' + (width - 5) + ' 15 L ' + (width - 5) + ' 20'
      }),
      React__default.createElement('path', {
        strokeWidth: '2',
        fill: 'transparent',
        strokeLinecap: 'round',
        filter: 'url(#' + filterId + ')',
        stroke: mergedColor[1],
        d: '\n          M ' + (width - 20) + ' ' + (height - 5) + ' L ' + (width - 15) + ' ' + (height - 5) + '\n          Q ' + (width - 5) + ' ' + (height - 5) + ' ' + (width - 5) + ' ' + (height - 15) + '\n          L ' + (width - 5) + ' ' + (height - 20) + '\n        '
      }),
      React__default.createElement('path', {
        strokeWidth: '2',
        fill: 'transparent',
        strokeLinecap: 'round',
        filter: 'url(#' + filterId + ')',
        stroke: mergedColor[1],
        d: '\n          M 20 ' + (height - 5) + ' L 15 ' + (height - 5) + '\n          Q 5 ' + (height - 5) + ' 5 ' + (height - 15) + '\n          L 5 ' + (height - 20) + '\n        '
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
