import React, { useRef, useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';
import { l as lib_9 } from '../index-08be7313.js';

var css = ".dv-border-box-11 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-11 .dv-border-svg-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n.dv-border-box-11 .dv-border-svg-container polyline {\n  fill: none;\n  stroke-width: 1;\n}\n.dv-border-box-11 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

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

  var filterId = useRef('borderr-box-11-filterId-' + Date.now()).current;

  var _useAutoResize = useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = useMemo(function () {
    return classnames('dv-border-box-11', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      { className: 'dv-border-svg-container', width: width, height: height },
      React.createElement(
        'defs',
        null,
        React.createElement(
          'filter',
          { id: filterId, height: '150%', width: '150%', x: '-25%', y: '-25%' },
          React.createElement('feMorphology', { operator: 'dilate', radius: '2', 'in': 'SourceAlpha', result: 'thicken' }),
          React.createElement('feGaussianBlur', { 'in': 'thicken', stdDeviation: '3', result: 'blurred' }),
          React.createElement('feFlood', { floodColor: mergedColor[1], result: 'glowColor' }),
          React.createElement('feComposite', { 'in': 'glowColor', in2: 'blurred', operator: 'in', result: 'softGlowColored' }),
          React.createElement(
            'feMerge',
            null,
            React.createElement('feMergeNode', { 'in': 'softGlowColored' }),
            React.createElement('feMergeNode', { 'in': 'SourceGraphic' })
          )
        )
      ),
      React.createElement('polyline', {
        stroke: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + (width - titleWidth) / 2 + ', 30\n          20, 30 7, 50 7, ' + (50 + (height - 167) / 2) + '\n          13, ' + (55 + (height - 167) / 2) + ' 13, ' + (135 + (height - 167) / 2) + '\n          7, ' + (140 + (height - 167) / 2) + ' 7, ' + (height - 27) + '\n          20, ' + (height - 7) + ' ' + (width - 20) + ', ' + (height - 7) + ' ' + (width - 7) + ', ' + (height - 27) + '\n          ' + (width - 7) + ', ' + (140 + (height - 167) / 2) + ' ' + (width - 13) + ', ' + (135 + (height - 167) / 2) + '\n          ' + (width - 13) + ', ' + (55 + (height - 167) / 2) + ' ' + (width - 7) + ', ' + (50 + (height - 167) / 2) + '\n          ' + (width - 7) + ', 50 ' + (width - 20) + ', 30 ' + (width + titleWidth) / 2 + ', 30\n          ' + ((width + titleWidth) / 2 - 20) + ', 7 ' + ((width - titleWidth) / 2 + 20) + ', 7\n          ' + (width - titleWidth) / 2 + ', 30 ' + ((width - titleWidth) / 2 + 20) + ', 52\n          ' + ((width + titleWidth) / 2 - 20) + ', 52 ' + (width + titleWidth) / 2 + ', 30\n        '
      }),
      React.createElement('polygon', {
        stroke: mergedColor[0],
        fill: 'transparent',
        points: '\n          ' + ((width + titleWidth) / 2 - 5) + ', 30 ' + ((width + titleWidth) / 2 - 21) + ', 11\n          ' + ((width + titleWidth) / 2 - 27) + ', 11 ' + ((width + titleWidth) / 2 - 8) + ', 34\n        '
      }),
      React.createElement('polygon', {
        stroke: mergedColor[0],
        fill: 'transparent',
        points: '\n          ' + ((width - titleWidth) / 2 + 5) + ', 30 ' + ((width - titleWidth) / 2 + 22) + ', 49\n          ' + ((width - titleWidth) / 2 + 28) + ', 49 ' + ((width - titleWidth) / 2 + 8) + ', 26\n        '
      }),
      React.createElement('polygon', {
        stroke: mergedColor[0],
        fill: lib_9(mergedColor[1] || defaultColor[1], 30),
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + ((width + titleWidth) / 2 - 11) + ', 37 ' + ((width + titleWidth) / 2 - 32) + ', 11\n          ' + ((width - titleWidth) / 2 + 23) + ', 11 ' + ((width - titleWidth) / 2 + 11) + ', 23\n          ' + ((width - titleWidth) / 2 + 33) + ', 49 ' + ((width + titleWidth) / 2 - 22) + ', 49\n        '
      }),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '1',
          points: '\n          ' + ((width - titleWidth) / 2 - 10) + ', 37 ' + ((width - titleWidth) / 2 - 31) + ', 37\n          ' + ((width - titleWidth) / 2 - 25) + ', 46 ' + ((width - titleWidth) / 2 - 4) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '1;0.7;1',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.7',
          points: '\n          ' + ((width - titleWidth) / 2 - 40) + ', 37 ' + ((width - titleWidth) / 2 - 61) + ', 37\n          ' + ((width - titleWidth) / 2 - 55) + ', 46 ' + ((width - titleWidth) / 2 - 34) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '0.7;0.4;0.7',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.5',
          points: '\n          ' + ((width - titleWidth) / 2 - 70) + ', 37 ' + ((width - titleWidth) / 2 - 91) + ', 37\n          ' + ((width - titleWidth) / 2 - 85) + ', 46 ' + ((width - titleWidth) / 2 - 64) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '0.5;0.2;0.5',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '1',
          points: '\n          ' + ((width + titleWidth) / 2 + 30) + ', 37 ' + ((width + titleWidth) / 2 + 9) + ', 37\n          ' + ((width + titleWidth) / 2 + 3) + ', 46 ' + ((width + titleWidth) / 2 + 24) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '1;0.7;1',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.7',
          points: '\n          ' + ((width + titleWidth) / 2 + 60) + ', 37 ' + ((width + titleWidth) / 2 + 39) + ', 37\n          ' + ((width + titleWidth) / 2 + 33) + ', 46 ' + ((width + titleWidth) / 2 + 54) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '0.7;0.4;0.7',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'polygon',
        {
          filter: 'url(#' + filterId + ')',
          fill: mergedColor[0],
          opacity: '0.5',
          points: '\n          ' + ((width + titleWidth) / 2 + 90) + ', 37 ' + ((width + titleWidth) / 2 + 69) + ', 37\n          ' + ((width + titleWidth) / 2 + 63) + ', 46 ' + ((width + titleWidth) / 2 + 84) + ', 46\n        '
        },
        React.createElement('animate', {
          attributeName: 'opacity',
          values: '0.5;0.2;0.5',
          dur: '2s',
          begin: '0s',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
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
      React.createElement('polygon', {
        fill: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          7, ' + (53 + (height - 167) / 2) + ' 11, ' + (57 + (height - 167) / 2) + '\n          11, ' + (133 + (height - 167) / 2) + ' 7, ' + (137 + (height - 167) / 2) + '\n        '
      }),
      React.createElement('polygon', {
        fill: mergedColor[0],
        filter: 'url(#' + filterId + ')',
        points: '\n          ' + (width - 7) + ', ' + (53 + (height - 167) / 2) + ' ' + (width - 11) + ', ' + (57 + (height - 167) / 2) + '\n          ' + (width - 11) + ', ' + (133 + (height - 167) / 2) + ' ' + (width - 7) + ', ' + (137 + (height - 167) / 2) + '\n        '
      })
    ),
    React.createElement(
      'div',
      { className: 'border-box-content' },
      children
    )
  );
};

BorderBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array,
  titleWidth: PropTypes.number,
  title: PropTypes.string
};

export default BorderBox;
//# sourceMappingURL=index.js.map
