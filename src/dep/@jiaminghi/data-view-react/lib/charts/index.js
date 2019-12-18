'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styleInject_es = require('../style-inject.es-df9d6d42.js');
require('../index-491bd57d.js');
require('../_babelHelpers-1c35d3ad.js');
var autoResize = require('../autoResize-accb117c.js');
var index$1 = require('../index-6753d2bc.js');
require('../index-c70d5130.js');
require('../index-f2264849.js');
require('../index-c21ace42.js');
require('../index-b652a004.js');
var index$5 = require('../index-7a77d038.js');

var css = ".dv-charts-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.dv-charts-container .charts-canvas-container {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject_es.styleInject(css);

var Charts = function Charts(_ref) {
  var _ref$option = _ref.option,
      option = _ref$option === undefined ? {} : _ref$option,
      className = _ref.className,
      style = _ref.style;

  var _useAutoResize = autoResize.useAutoResize(),
      width = _useAutoResize.width,
      height = _useAutoResize.height,
      domRef = _useAutoResize.domRef;

  var chartRef = React.useRef(null);

  var chartInstanceofRef = React.useRef(null);

  React.useEffect(function () {
    chartInstanceofRef.current || (chartInstanceofRef.current = new index$5.Charts(chartRef.current));

    chartInstanceofRef.current.setOption(option || {}, true);
  }, [option]);

  React.useEffect(function () {
    chartInstanceofRef.current.resize();
  }, [width, height]);

  var classNames = React.useMemo(function () {
    return index$1.classnames('dv-charts-container', className);
  }, [className]);

  return React__default.createElement(
    'div',
    { className: classNames, style: style, ref: domRef },
    React__default.createElement('div', { className: 'charts-canvas-container', ref: chartRef })
  );
};

Charts.propTypes = {
  option: styleInject_es.PropTypes.object,
  className: styleInject_es.PropTypes.string,
  style: styleInject_es.PropTypes.object

  // 指定 props 的默认值：
};Charts.defaultProps = {
  option: {}
};

module.exports = Charts;
//# sourceMappingURL=index.js.map
