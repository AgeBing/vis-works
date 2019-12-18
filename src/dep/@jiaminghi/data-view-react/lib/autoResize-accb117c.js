'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var index = require('./index-491bd57d.js');
var _babelHelpers = require('./_babelHelpers-1c35d3ad.js');

function useAutoResize() {
  var _useState = React.useState({ width: 0, height: 0 }),
      _useState2 = _babelHelpers.slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var domRef = React.useRef(null);
  var domObserverRef = React.useRef(null);
  var debounceSetWHFunRef = React.useRef(null);

  var setWH = React.useCallback(function () {
    var _domRef$current = domRef.current,
        clientWidth = _domRef$current.clientWidth,
        clientHeight = _domRef$current.clientHeight;


    setState({ width: clientWidth, height: clientHeight });
  }, []);

  var bindDomResizeCallback = React.useCallback(function () {
    domObserverRef.current = index.observerDomResize(domRef.current, debounceSetWHFunRef.current);

    window.addEventListener('resize', debounceSetWHFunRef.current);
  }, []);

  var unbindDomResizeCallback = React.useCallback(function () {
    var domObserver = domObserverRef.current;


    domObserver.disconnect();
    domObserver.takeRecords();
    domObserverRef.current = null;

    window.removeEventListener('resize', debounceSetWHFunRef.current);
  }, []);

  React.useEffect(function () {
    debounceSetWHFunRef.current = index.debounce(setWH, 100);

    debounceSetWHFunRef.current();

    bindDomResizeCallback();

    // 组件销毁时，清除事件
    return unbindDomResizeCallback;
  }, []);

  return _babelHelpers._extends({}, state, { domRef: domRef });
}

exports.useAutoResize = useAutoResize;
//# sourceMappingURL=autoResize-accb117c.js.map
