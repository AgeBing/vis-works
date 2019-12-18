import React, { useRef, useEffect, useMemo } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import { s as slicedToArray } from '../_babelHelpers-a63acad8.js';
import { c as classnames } from '../index-183d4825.js';
import { u as util_2, a as util_1 } from '../index-986f40ca.js';
import '../index-08be7313.js';
import { C as CRender } from '../index-4ffa622f.js';
import '../index-79efb260.js';

var css = ".dv-digital-flop canvas {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

var defaultConfig = {
  /**
   * @description Number for digital flop
   * @type {Array<Number>}
   * @default number = []
   * @example number = [10]
   */
  number: [],
  /**
   * @description Content formatter
   * @type {String}
   * @default content = ''
   * @example content = '{nt}个'
   */
  content: '',
  /**
   * @description Number toFixed
   * @type {Number}
   * @default toFixed = 0
   */
  toFixed: 0,
  /**
   * @description Text align
   * @type {String}
   * @default textAlign = 'center'
   * @example textAlign = 'center' | 'left' | 'right'
   */
  textAlign: 'center',
  /**
   * @description Text style configuration
   * @type {Object} {CRender Class Style}
   */
  style: {
    fontSize: 30,
    fill: '#3de7c9'
  },
  /**
   * @description CRender animationCurve
   * @type {String}
   * @default animationCurve = 'easeOutCubic'
   */
  animationCurve: 'easeOutCubic',
  /**
   * @description CRender animationFrame
   * @type {String}
   * @default animationFrame = 50
   */
  animationFrame: 50
};

var DigitalFlop = function DigitalFlop(_ref) {
  var _ref$config = _ref.config,
      config = _ref$config === undefined ? {} : _ref$config,
      className = _ref.className,
      style = _ref.style;

  var domRef = useRef(null);
  var rendererRef = useRef(null);
  var graphRef = useRef(null);

  function getGraph(mergedConfig) {
    var animationCurve = mergedConfig.animationCurve,
        animationFrame = mergedConfig.animationFrame;


    return rendererRef.current.add({
      name: 'numberText',
      animationCurve: animationCurve,
      animationFrame: animationFrame,
      shape: getShape(mergedConfig),
      style: getStyle(mergedConfig)
    });
  }

  function getShape(_ref2) {
    var number = _ref2.number,
        content = _ref2.content,
        toFixed = _ref2.toFixed,
        textAlign = _ref2.textAlign;

    var _rendererRef$current$ = slicedToArray(rendererRef.current.area, 2),
        w = _rendererRef$current$[0],
        h = _rendererRef$current$[1];

    var position = [w / 2, h / 2];

    if (textAlign === 'left') position[0] = 0;
    if (textAlign === 'right') position[0] = w;

    return { number: number, content: content, toFixed: toFixed, position: position };
  }

  function getStyle(_ref3) {
    var style = _ref3.style,
        textAlign = _ref3.textAlign;

    return util_2(style, {
      textAlign: textAlign,
      textBaseline: 'middle'
    });
  }

  useEffect(function () {
    var mergedConfig = util_2(util_1(defaultConfig, true), config || {});

    if (!rendererRef.current) {
      rendererRef.current = new CRender(domRef.current);

      graphRef.current = getGraph(mergedConfig);
    }

    var graph = graphRef.current;
    graph.animationEnd();

    var shape = getShape(mergedConfig);

    var cacheNum = graph.shape.number.length;
    var shapeNum = shape.number.length;

    cacheNum !== shapeNum && (graph.shape.number = shape.number);

    var animationCurve = mergedConfig.animationCurve,
        animationFrame = mergedConfig.animationFrame;


    Object.assign(graph, { animationCurve: animationCurve, animationFrame: animationFrame });

    graph.animation('style', getStyle(mergedConfig), true);
    graph.animation('shape', shape);
  }, [config]);

  var classNames = useMemo(function () {
    return classnames('dv-digital-flop', className);
  }, [className]);

  return React.createElement(
    'div',
    { className: classNames, style: style },
    React.createElement('canvas', { ref: domRef })
  );
};

DigitalFlop.propTypes = {
  config: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object

  // 指定 props 的默认值：
};DigitalFlop.defaultProps = {
  config: {}
};

export default DigitalFlop;
//# sourceMappingURL=index.js.map
