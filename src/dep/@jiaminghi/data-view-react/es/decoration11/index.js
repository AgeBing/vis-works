import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';
import { l as lib_9 } from '../index-08be7313.js';

var css = ".dv-decoration-11 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n.dv-decoration-11 .decoration-content {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n";
styleInject(css);

var defaultColor = ['#1a98fc', '#2cf7fe'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var _useAutoResize = useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = useMemo(function () {
    return classnames('dv-decoration-11', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      { width: width, height: height },
      React.createElement('polygon', {
        fill: lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: '20 10, 25 4, 55 4 60 10'
      }),
      React.createElement('polygon', {
        fill: lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: '20 ' + (height - 10) + ', 25 ' + (height - 4) + ', 55 ' + (height - 4) + ' 60 ' + (height - 10)
      }),
      React.createElement('polygon', {
        fill: lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: width - 20 + ' 10, ' + (width - 25) + ' 4, ' + (width - 55) + ' 4 ' + (width - 60) + ' 10'
      }),
      React.createElement('polygon', {
        fill: lib_9(mergedColor[1] || defaultColor[1], 10),
        stroke: mergedColor[1],
        points: width - 20 + ' ' + (height - 10) + ', ' + (width - 25) + ' ' + (height - 4) + ', ' + (width - 55) + ' ' + (height - 4) + ' ' + (width - 60) + ' ' + (height - 10)
      }),
      React.createElement('polygon', {
        fill: lib_9(mergedColor[0] || defaultColor[0], 20),
        stroke: mergedColor[0],
        points: '\n            20 10, 5 ' + height / 2 + ' 20 ' + (height - 10) + '\n            ' + (width - 20) + ' ' + (height - 10) + ' ' + (width - 5) + ' ' + height / 2 + ' ' + (width - 20) + ' 10\n          '
      }),
      React.createElement('polyline', {
        fill: 'transparent',
        stroke: lib_9(mergedColor[0] || defaultColor[0], 70),
        points: '25 18, 15 ' + height / 2 + ' 25 ' + (height - 18)
      }),
      React.createElement('polyline', {
        fill: 'transparent',
        stroke: lib_9(mergedColor[0] || defaultColor[0], 70),
        points: width - 25 + ' 18, ' + (width - 15) + ' ' + height / 2 + ' ' + (width - 25) + ' ' + (height - 18)
      })
    ),
    React.createElement(
      'div',
      { className: 'decoration-content' },
      children
    )
  );
};

BorderBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
};

export default BorderBox;
//# sourceMappingURL=index.js.map
