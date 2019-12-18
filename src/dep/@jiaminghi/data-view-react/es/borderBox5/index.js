import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-5 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-5 .dv-reverse {\n  transform: rotate(180deg);\n}\n.dv-border-box-5 .dv-svg-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-5 .dv-svg-container polyline {\n  fill: none;\n}\n.dv-border-box-5 .dv-bb5-line-1,\n.dv-border-box-5 .dv-bb5-line-2 {\n  stroke-width: 1;\n}\n.dv-border-box-5 .dv-bb5-line-3,\n.dv-border-box-5 .dv-bb5-line-6 {\n  stroke-width: 5;\n}\n.dv-border-box-5 .dv-bb5-line-4,\n.dv-border-box-5 .dv-bb5-line-5 {\n  stroke-width: 2;\n}\n.dv-border-box-5 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var defaultColor = ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
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
    return classnames('dv-border-box-5', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      {
        className: 'dv-svg-container  ' + (reverse && 'dv-reverse'),
        width: width,
        height: height
      },
      React.createElement('polyline', {
        className: 'dv-bb5-line-1',
        stroke: mergedColor[0],
        points: '8, 5 ' + (width - 5) + ', 5 ' + (width - 5) + ', ' + (height - 100) + '\n          ' + (width - 100) + ', ' + (height - 5) + ' 8, ' + (height - 5) + ' 8, 5'
      }),
      React.createElement('polyline', {
        className: 'dv-bb5-line-2',
        stroke: mergedColor[1],
        points: '3, 5 ' + (width - 20) + ', 5 ' + (width - 20) + ', ' + (height - 60) + '\n          ' + (width - 74) + ', ' + (height - 5) + ' 3, ' + (height - 5) + ' 3, 5'
      }),
      React.createElement('polyline', {
        className: 'dv-bb5-line-3',
        stroke: mergedColor[1],
        points: '50, 13 ' + (width - 35) + ', 13'
      }),
      React.createElement('polyline', {
        className: 'dv-bb5-line-4',
        stroke: mergedColor[1],
        points: '15, 20 ' + (width - 35) + ', 20'
      }),
      React.createElement('polyline', {
        className: 'dv-bb5-line-5',
        stroke: mergedColor[1],
        points: '15, ' + (height - 20) + ' ' + (width - 110) + ', ' + (height - 20)
      }),
      React.createElement('polyline', {
        className: 'dv-bb5-line-6',
        stroke: mergedColor[1],
        points: '15, ' + (height - 13) + ' ' + (width - 110) + ', ' + (height - 13)
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
  reverse: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array

  // 指定 props 的默认值：
};BorderBox.defaultProps = {
  reverse: false
};

export default BorderBox;
//# sourceMappingURL=index.js.map
