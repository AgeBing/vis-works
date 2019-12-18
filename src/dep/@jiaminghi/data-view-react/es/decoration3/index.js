import React, { useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import { t as toConsumableArray } from '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';

var css = ".dv-decoration-3 {\n  width: 100%;\n  height: 100%;\n}\n.dv-decoration-3 svg {\n  transform-origin: left top;\n}\n";
styleInject(css);

var defaultColor = ['#7acaec', 'transparent'];

var pointSideLength = 7;

var svgWH = [300, 35];

var rowNum = 2;

var rowPoints = 25;

var halfPointSideLength = pointSideLength / 2;

function getPoints() {
  var w = svgWH[0],
      h = svgWH[1];


  var horizontalGap = w / (rowPoints + 1);
  var verticalGap = h / (rowNum + 1);

  var points = new Array(rowNum).fill(0).map(function (foo, i) {
    return new Array(rowPoints).fill(0).map(function (foo, j) {
      return [horizontalGap * (j + 1), verticalGap * (i + 1)];
    });
  });

  return points.reduce(function (all, item) {
    return [].concat(toConsumableArray(all), toConsumableArray(item));
  }, []);
}

var Decoration = function Decoration(_ref) {
  var className = _ref.className,
      style = _ref.style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? [] : _ref$color;

  var _useAutoResize = useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  function calcSVGData() {
    return {
      points: getPoints(),
      svgScale: [width / svgWH[0], height / svgWH[1]]
    };
  }

  var mergedColor = useMemo(function () {
    return util_2(util_1(defaultColor, true), color || []);
  }, [color]);

  var _useMemo = useMemo(calcSVGData, [width, height]),
      svgScale = _useMemo.svgScale,
      points = _useMemo.points;

  var classNames = useMemo(function () {
    return classnames('dv-decoration-3', className);
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
      points.map(function (point, i) {
        return React.createElement(
          'rect',
          {
            key: i,
            fill: mergedColor[0],
            x: point[0] - halfPointSideLength,
            y: point[1] - halfPointSideLength,
            width: pointSideLength,
            height: pointSideLength
          },
          Math.random() > 0.6 && React.createElement('animate', {
            attributeName: 'fill',
            values: '' + mergedColor.join(';'),
            dur: Math.random() + 1 + 's',
            begin: Math.random() * 2,
            repeatCount: 'indefinite'
          })
        );
      })
    )
  );
};

Decoration.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
};

export default Decoration;
//# sourceMappingURL=index.js.map
