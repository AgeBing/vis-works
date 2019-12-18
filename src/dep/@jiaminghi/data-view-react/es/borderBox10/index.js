import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import { _ as _extends } from '../_babelHelpers-a63acad8.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-10 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border-radius: 6px;\n}\n.dv-border-box-10 .border {\n  position: absolute;\n  display: block;\n}\n.dv-border-box-10 .right-top {\n  right: 0px;\n  transform: rotateY(180deg);\n}\n.dv-border-box-10 .left-bottom {\n  bottom: 0px;\n  transform: rotateX(180deg);\n}\n.dv-border-box-10 .right-bottom {\n  right: 0px;\n  bottom: 0px;\n  transform: rotateX(180deg) rotateY(180deg);\n}\n.dv-border-box-10 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];
var defaultColor = ['#1d48c4', '#d3e1f8'];

var BorderBox = function BorderBox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var classNames = useMemo(function () {
    return classnames('dv-border-box-10', className);
  }, [className]);

  var styles = useMemo(function () {
    return _extends({
      boxShadow: 'inset 0 0 25px 3px ' + mergedColor[0]
    }, style);
  }, [style, mergedColor]);

  return React.createElement(
    'div',
    { className: classNames, style: styles },
    border.map(function (borderName) {
      return React.createElement(
        'svg',
        {
          width: '150px',
          height: '150px',
          key: borderName,
          className: borderName + ' border'
        },
        React.createElement('polygon', {
          fill: mergedColor[1],
          points: '40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3'
        })
      );
    }),
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
