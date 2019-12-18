import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-decoration-7 {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n";
styleInject(css);

var defaultColor = ['#1dc1f5', '#1dc1f5'];

var Decoration = function Decoration(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = useMemo(function () {
    return classnames('dv-decoration-7', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style },
    React.createElement(
      'svg',
      { width: '21px', height: '20px' },
      React.createElement('polyline', {
        strokeWidth: '4',
        fill: 'transparent',
        stroke: mergedColor[0],
        points: '10, 0 19, 10 10, 20'
      }),
      React.createElement('polyline', {
        strokeWidth: '2',
        fill: 'transparent',
        stroke: mergedColor[1],
        points: '2, 0 11, 10 2, 20'
      })
    ),
    children,
    React.createElement(
      'svg',
      { width: '21px', height: '20px' },
      React.createElement('polyline', {
        strokeWidth: '4',
        fill: 'transparent',
        stroke: mergedColor[0],
        points: '11, 0 2, 10 11, 20'
      }),
      React.createElement('polyline', {
        strokeWidth: '2',
        fill: 'transparent',
        stroke: mergedColor[1],
        points: '19, 0 10, 10 19, 20'
      })
    )
  );
};

Decoration.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
};

export default Decoration;
//# sourceMappingURL=index.js.map
