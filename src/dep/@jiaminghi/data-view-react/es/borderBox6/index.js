import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-6 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-6 .dv-svg-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-6 .dv-svg-container polyline {\n  fill: none;\n  stroke-width: 1;\n}\n.dv-border-box-6 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var defaultColor = ['rgba(255, 255, 255, 0.35)', 'gray'];

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
    return classnames('dv-border-box-6', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      { className: 'dv-svg-container', width: width, height: height },
      React.createElement('circle', { fill: mergedColor[1], cx: '5', cy: '5', r: '2' }),
      React.createElement('circle', { fill: mergedColor[1], cx: width - 5, cy: '5', r: '2' }),
      React.createElement('circle', { fill: mergedColor[1], cx: width - 5, cy: height - 5, r: '2' }),
      React.createElement('circle', { fill: mergedColor[1], cx: '5', cy: height - 5, r: '2' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '10, 4 ' + (width - 10) + ', 4' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '10, ' + (height - 4) + ' ' + (width - 10) + ', ' + (height - 4) }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '5, 70 5, ' + (height - 70) }),
      React.createElement('polyline', { stroke: mergedColor[0], points: width - 5 + ', 70 ' + (width - 5) + ', ' + (height - 70) }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '3, 10, 3, 50' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '7, 30 7, 80' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: width - 3 + ', 10 ' + (width - 3) + ', 50' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: width - 7 + ', 30 ' + (width - 7) + ', 80' }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '3, ' + (height - 10) + ' 3, ' + (height - 50) }),
      React.createElement('polyline', { stroke: mergedColor[0], points: '7, ' + (height - 30) + ' 7, ' + (height - 80) }),
      React.createElement('polyline', {
        stroke: mergedColor[0],
        points: width - 3 + ', ' + (height - 10) + ' ' + (width - 3) + ', ' + (height - 50)
      }),
      React.createElement('polyline', {
        stroke: mergedColor[0],
        points: width - 7 + ', ' + (height - 30) + ' ' + (width - 7) + ', ' + (height - 80)
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
  color: PropTypes.array
};

export default BorderBox;
//# sourceMappingURL=index.js.map
