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

var css = ".dv-border-box-11 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-11 .dv-border-svg-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n.dv-border-box-11 .dv-border-svg-container polyline {\n  fill: none;\n  stroke-width: 1;\n}\n.dv-border-box-11 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var defaultColor = ['#8aaafb', '#1f33a2'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color,
      _ref$titleWidth = _ref.titleWidth,
      titleWidth = _ref$titleWidth === undefined ? 250 : _ref$titleWidth,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title;

  var filterId = React.useRef('borderr-box-11-filterId-' + Date.now()).current;

  var _useAutoResize = autoResize.useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var mergedColor = React.useMemo(function () {
    return index$1$1.util_2(index$1$1.util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-border-box-11', className);
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
          React__default.createElement('feMorphology', { operator: 'dilate', radius: '2', 'in': 'SourceAlpha', result: 'thicken' }),
          React__default.createElement('feGaussianBlur', { 'in': 'thicken', stdDeviation: '3', result: 'blurred' }),
          React__default.createElement('feFlood', { floodColor: mergedColor[1], result: 'glowColor' }),
          React__default.createElement('feComposite', { 'in': 'glowColor', in2: 'blurred', operator: 'in', result: 'softGlowColored' }),
          React__default.createElement(
            'feMerge',
            null,
            React__default.createElement('feMergeNode', { 'in': 'softGlowColored' }),
            React__default.createElement('feMergeNode', { 'in': 'SourceGraphic' })
          )
        )
      ),
      React__default.createElement('polyline', {
        stroke: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + (width - titleWidth) / 2 + ', 30\n          20, 30 7, 50 7, ' + (50 + (height - 167) / 2) + '\n          13, ' + (55 + (height - 167) / 2) + ' 13, ' + (135 + (height - 167) / 2) + '\n          7, ' + (140 + (height - 167) / 2) + ' 7, ' + (height - 27) + '\n          20, ' + (height - 7) + ' ' + (width - 20) + ', ' + (height - 7) + ' ' + (width - 7) + ', ' + (height - 27) + '\n          ' + (width - 7) + ', ' + (140 + (height - 167) / 2) + ' ' + (width - 13) + ', ' + (135 + (height - 167) / 2) + '\n          ' + (width - 13) + ', ' + (55 + (height - 167) / 2) + ' ' + (width - 7) + ', ' + (50 + (height - 167) / 2) + '\n          ' + (width - 7) + ', 50 ' + (width - 20) + ', 30 ' + (width + titleWidth) / 2 + ', 30\n          ' + ((width + titleWidth) / 2 - 20) + ', 7 ' + ((width - titleWidth) / 2 + 20) + ', 7\n          ' + (width - titleWidth) / 2 + ', 30 ' + ((width - titleWidth) / 2 + 20) + ', 52\n          ' + ((width + titleWidth) / 2 - 20) + ', 52 ' + (width + titleWidth) / 2 + ', 30\n        '
      }),
      React__default.createElement('polygon', {
        stroke: mergedColor[0],
        fill: 'transparent',
        points: '\n          ' + ((width + titleWidth) / 2 - 5) + ', 30 ' + ((width + titleWidth) / 2 - 21) + ', 11\n          ' + ((width + titleWidth) / 2 - 27) + ', 11 ' + ((width + titleWidth) / 2 - 8) + ', 34\n        '
      }),
      React__default.createElement('polygon', {
        stroke: mergedColor[0],
        fill: 'transparent',
        points: '\n          ' + ((width - titleWidth) / 2 + 5) + ', 30 ' + ((width - titleWidth) / 2 + 22) + ', 49\n          ' + ((width - titleWidth) / 2 + 28) + ', 49 ' + ((width - titleWidth) / 2 + 8) + ', 26\n        '
      }),
      React__default.createElement('polygon', {
        stroke: mergedColor[0],
        fill: index$2.lib_9(mergedColor[1] || defaultColor[1], 30),
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + ((width + titleWidth) / 2 - 11) + ', 37 ' + ((width + titleWidth) / 2 - 32) + ', 11\n          ' + ((width - titleWidth) / 2 + 23) + ', 11 ' + ((width - titleWidth) / 2 + 11) + ', 23\n          ' + ((width - titleWidth) / 2 + 33) + ', 49 ' + ((width + titleWidth) / 2 - 22) + ', 49\n        '
      }),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '1',
          points: '\n          ' + ((width - titleWidth) / 2 - 10) + ', 37 ' + ((width - titleWidth) / 2 - 31) + ', 37\n          ' + ((width - titleWidth) / 2 - 25) + ', 46 ' + ((width - titleWidth) / 2 - 4) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '1;0.7;1',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.7',
          points: '\n          ' + ((width - titleWidth) / 2 - 40) + ', 37 ' + ((width - titleWidth) / 2 - 61) + ', 37\n          ' + ((width - titleWidth) / 2 - 55) + ', 46 ' + ((width - titleWidth) / 2 - 34) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '0.7;0.4;0.7',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.5',
          points: '\n          ' + ((width - titleWidth) / 2 - 70) + ', 37 ' + ((width - titleWidth) / 2 - 91) + ', 37\n          ' + ((width - titleWidth) / 2 - 85) + ', 46 ' + ((width - titleWidth) / 2 - 64) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '0.5;0.2;0.5',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '1',
          points: '\n          ' + ((width + titleWidth) / 2 + 30) + ', 37 ' + ((width + titleWidth) / 2 + 9) + ', 37\n          ' + ((width + titleWidth) / 2 + 3) + ', 46 ' + ((width + titleWidth) / 2 + 24) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '1;0.7;1',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.7',
          points: '\n          ' + ((width + titleWidth) / 2 + 60) + ', 37 ' + ((width + titleWidth) / 2 + 39) + ', 37\n          ' + ((width + titleWidth) / 2 + 33) + ', 46 ' + ((width + titleWidth) / 2 + 54) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '0.7;0.4;0.7',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.5',
          points: '\n          ' + ((width + titleWidth) / 2 + 90) + ', 37 ' + ((width + titleWidth) / 2 + 69) + ', 37\n          ' + ((width + titleWidth) / 2 + 63) + ', 46 ' + ((width + titleWidth) / 2 + 84) + ', 46\n        '
        },
        React__default.createElement('animate', {
          attributeName: 'opacity',
          values: '0.5;0.2;0.5',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React__default.createElement(
        'text',
        {
          className: 'dv-border-box-11-title',
          x: '' + width / 2,
          y: '32',
          fill: '#fff',
          fontSize: '18',
          textAnchor: 'middle',
          dominantBaseline: 'middle'
        },
        title
      ),
      React__default.createElement('polygon', {
        fill: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          7, ' + (53 + (height - 167) / 2) + ' 11, ' + (57 + (height - 167) / 2) + '\n          11, ' + (133 + (height - 167) / 2) + ' 7, ' + (137 + (height - 167) / 2) + '\n        '
      }),
      React__default.createElement('polygon', {
        fill: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + (width - 7) + ', ' + (53 + (height - 167) / 2) + ' ' + (width - 11) + ', ' + (57 + (height - 167) / 2) + '\n          ' + (width - 11) + ', ' + (133 + (height - 167) / 2) + ' ' + (width - 7) + ', ' + (137 + (height - 167) / 2) + '\n        '
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
  color: styleInject_es.PropTypes.array,
  titleWidth: styleInject_es.PropTypes.number,
  title: styleInject_es.PropTypes.string
};

module.exports = BorderBox;
//# sourceMappingURL=index.js.map
