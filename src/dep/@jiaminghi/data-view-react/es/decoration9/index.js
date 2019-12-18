import React, { useRef, useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';
import { l as lib_9 } from '../index-08be7313.js';

var css = ".dv-decoration-9 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.dv-decoration-9 svg {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  transform-origin: left top;\n}\n";
styleInject(css);

var defaultColor = ['rgba(3, 166, 224, 0.8)', 'rgba(3, 166, 224, 0.5)'];

var svgWH = [100, 100];

var Decoration = function Decoration(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color,
      _ref$dur = _ref.dur,
      dur = _ref$dur === undefined ? 3 : _ref$dur;

  var _useAutoResize = useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var polygonIdRef = useRef('decoration-9-polygon-' + Date.now());

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var svgScale = useMemo(function () {
    var w = svgWH[0],
        h = svgWH[1];


    return [width / w, height / h];
  }, [width, height]);

  var classNames = useMemo(function () {
    return classnames('dv-decoration-9', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React.createElement(
      'svg',
      {
        width: svgWH[0] + 'px',
        height: svgWH[1] + 'px',
        style: { transform: 'scale(' + svgScale[0] + ',' + svgScale[1] + ')' }
      },
      React.createElement(
        'defs',
        null,
        React.createElement('polygon', {
          id: polygonIdRef.current,
          points: '15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5'
        })
      ),
      React.createElement(
        'circle',
        {
          cx: '50',
          cy: '50',
          r: '45',
          fill: 'transparent',
          stroke: mergedColor[1],
          strokeWidth: '10',
          strokeDasharray: '80, 100, 30, 100'
        },
        React.createElement('animateTransform', {
          attributeName: 'transform',
          type: 'rotate',
          values: '0 50 50;360 50 50',
          dur: dur + 's',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement(
        'circle',
        {
          cx: '50',
          cy: '50',
          r: '45',
          fill: 'transparent',
          stroke: mergedColor[0],
          strokeWidth: '6',
          strokeDasharray: '50, 66, 100, 66'
        },
        React.createElement('animateTransform', {
          attributeName: 'transform',
          type: 'rotate',
          values: '0 50 50;-360 50 50',
          dur: dur + 's',
          repeatCount: 'indefinite'
        })
      ),
      React.createElement('circle', {
        cx: '50',
        cy: '50',
        r: '38',
        fill: 'transparent',
        stroke: lib_9(mergedColor[1] || defaultColor[1], 30),
        strokeWidth: '1',
        strokeDasharray: '5, 1'
      }),
      new Array(20).fill(0).map(function (foo, i) {
        return React.createElement(
          'use',
          {
            key: i,
            href: '#' + polygonIdRef.current,
            stroke: mergedColor[1],
            fill: Math.random() > 0.4 ? 'transparent' : mergedColor[0]
          },
          React.createElement('animateTransform', {
            attributeName: 'transform',
            type: 'rotate',
            values: '0 50 50;360 50 50',
            dur: dur + 's',
            begin: i * dur / 20 + 's',
            repeatCount: 'indefinite'
          })
        );
      }),
      React.createElement('circle', {
        cx: '50',
        cy: '50',
        r: '26',
        fill: 'transparent',
        stroke: lib_9(mergedColor[1] || defaultColor[1], 30),
        strokeWidth: '1',
        strokeDasharray: '5, 1'
      })
    ),
    children
  );
};

Decoration.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array,
  dur: PropTypes.number
};

export default Decoration;
//# sourceMappingURL=index.js.map
