import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-2 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-2 .dv-border-svg-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n.dv-border-box-2 .dv-border-svg-container polyline {\n  fill: none;\n  stroke-width: 1;\n}\n.dv-border-box-2 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var defaultColor = ['#fff', 'rgba(255, 255, 255, 0.6)'];

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
    return classnames('dv-border-box-2', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      { className: 'dv-border-svg-container', width: width, height: height },
      React.createElement('polyline', {
        stroke: mergedColor[0],
        points: '2, 2 ' + (width - 2) + ' ,2 ' + (width - 2) + ', ' + (height - 2) + ' 2, ' + (height - 2) + ' 2, 2'
      }),
      React.createElement('polyline', {
        stroke: mergedColor[1],
        points: '6, 6 ' + (width - 6) + ', 6 ' + (width - 6) + ', ' + (height - 6) + ' 6, ' + (height - 6) + ' 6, 6'
      }),
      React.createElement('circle', { fill: mergedColor[0], cx: '11', cy: '11', r: '1' }),
      React.createElement('circle', { fill: mergedColor[0], cx: width - 11, cy: '11', r: '1' }),
      React.createElement('circle', { fill: mergedColor[0], cx: width - 11, cy: height - 11, r: '1' }),
      React.createElement('circle', { fill: mergedColor[0], cx: '11', cy: height - 11, r: '1' })
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
