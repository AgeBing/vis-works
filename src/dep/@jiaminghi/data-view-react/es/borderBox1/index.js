import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-border-box-1 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-border-box-1 .border {\n  position: absolute;\n  display: block;\n}\n.dv-border-box-1 .right-top {\n  right: 0px;\n  transform: rotateY(180deg);\n}\n.dv-border-box-1 .left-bottom {\n  bottom: 0px;\n  transform: rotateX(180deg);\n}\n.dv-border-box-1 .right-bottom {\n  right: 0px;\n  bottom: 0px;\n  transform: rotateX(180deg) rotateY(180deg);\n}\n.dv-border-box-1 .border-box-content {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];
var defaultColor = ['#4fd2dd', '#235fa7'];

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
    return classnames('dv-border-box-1', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style },
    border.map(function (borderName) {
      return React.createElement(
        'svg',
        {
          width: '150px',
          height: '150px',
          key: borderName,
          className: borderName + ' border'
        },
        React.createElement(
          'polygon',
          {
            fill: mergedColor[0],
            points: '6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63'
          },
          React.createElement('animate', {
            attributeName: 'fill',
            values: mergedColor[0] + ';' + mergedColor[1] + ';' + mergedColor[0],
            dur: '0.5s',
            begin: '0s',
            repeatCount: 'indefinite'
          })
        ),
        React.createElement(
          'polygon',
          {
            fill: mergedColor[1],
            points: '27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8'
          },
          React.createElement('animate', {
            attributeName: 'fill',
            values: mergedColor[1] + ';' + mergedColor[0] + ';' + mergedColor[1],
            dur: '0.5s',
            begin: '0s',
            repeatCount: 'indefinite'
          })
        ),
        React.createElement(
          'polygon',
          {
            fill: mergedColor[0],
            points: '9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54'
          },
          React.createElement('animate', {
            attributeName: 'fill',
            values: mergedColor[0] + ';' + mergedColor[1] + ';transparent',
            dur: '1s',
            begin: '0s',
            repeatCount: 'indefinite'
          })
        )
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
