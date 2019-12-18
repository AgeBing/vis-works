import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import { _ as _extends } from '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-7 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-7 .dv-svg-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-7 .dv-svg-container polyline {\n  fill: none;\n  stroke-linecap: round;\n}\n.dv-border-box-7 .dv-bb7-line-width-2 {\n  stroke-width: 2;\n}\n.dv-border-box-7 .dv-bb7-line-width-5 {\n  stroke-width: 5;\n}\n.dv-border-box-7 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var defaultColor = ['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)'];

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
    return classnames('dv-border-box-7', className);
  }, [className]);

  var styles = useMemo(function () {
    return _extends({
      boxShadow: 'inset 0 0 40px ' + mergedColor[0],
      border: '1px solid ' + mergedColor[0]
    }, style);
  }, [style, mergedColor]);

  return React.createElement(
    'div',
    { className: classNames, style: styles, ref: domRef },
    React.createElement(
      'svg',
      { className: 'dv-svg-container', width: width, height: height },
      React.createElement('polyline', { className: 'dv-bb7-line-width-2', stroke: mergedColor[0], points: '0, 25 0, 0 25, 0' }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-2',
        stroke: mergedColor[0],
        points: width - 25 + ', 0 ' + width + ', 0 ' + width + ', 25'
      }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-2',
        stroke: mergedColor[0],
        points: width - 25 + ', ' + height + ' ' + width + ', ' + height + ' ' + width + ', ' + (height - 25)
      }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-2',
        stroke: mergedColor[0],
        points: '0, ' + (height - 25) + ' 0, ' + height + ' 25, ' + height
      }),
      React.createElement('polyline', { className: 'dv-bb7-line-width-5', stroke: mergedColor[1], points: '0, 10 0, 0 10, 0' }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-5',
        stroke: mergedColor[1],
        points: width - 10 + ', 0 ' + width + ', 0 ' + width + ', 10'
      }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-5',
        stroke: mergedColor[1],
        points: width - 10 + ', ' + height + ' ' + width + ', ' + height + ' ' + width + ', ' + (height - 10)
      }),
      React.createElement('polyline', {
        className: 'dv-bb7-line-width-5',
        stroke: mergedColor[1],
        points: '0, ' + (height - 10) + ' 0, ' + height + ' 10, ' + height
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
