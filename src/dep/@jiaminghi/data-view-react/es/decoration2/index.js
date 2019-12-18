import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-decoration-2 {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n";
styleInject(css);

var defaultColor = ['#3faacb', '#fff'];

var Decoration = function Decoration(_ref) {
  var _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var _useAutoResize = useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  function calcSVGData() {
    return reverse ? { w: 1, h: height, x: width / 2, y: 0 } : { w: width, h: 1, x: 0, y: height / 2 };
  }

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var _useMemo = useMemo(calcSVGData, [reverse, width, height]),
      x = _useMemo.x,
      y = _useMemo.y,
      w = _useMemo.w,
      h = _useMemo.h;

  var classNames = useMemo(function () {
    return classnames('dv-decoration-2', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      { width: width + 'px', height: height + 'px' },
      React.createElement(
        'rect',
        { x: x, y: y, width: w, height: h, fill: mergedColor[0] },
        React.createElement('animate', {
          attributeName: reverse ? 'height' : 'width',
          from: '0',
          to: reverse ? height : width,
          dur: '6s',
          calcMode: 'spline',
          keyTimes: '0;1',
          keySplines: '.42,0,.58,1',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'rect',
        { x: x, y: y, width: '1', height: '1', fill: mergedColor[1] },
        React.createElement('animate', {
          attributeName: reverse ? 'y' : 'x',
          from: '0',
          to: reverse ? height : width,
          dur: '6s',
          calcMode: 'spline',
          keyTimes: '0;1',
          keySplines: '0.42,0,0.58,1',
          repeatCount: 'indefinite'
        })
      )
    )
  );
};

Decoration.propTypes = {
  reverse: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array

  // 指定 props 的默认值：
};Decoration.defaultProps = {
  reverse: false
};

export default Decoration;
//# sourceMappingURL=index.js.map
