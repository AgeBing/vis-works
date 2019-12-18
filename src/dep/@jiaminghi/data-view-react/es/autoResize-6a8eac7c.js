import { useState, useRef, useCallback, useEffect } from 'react';
import { o as observerDomResize, d as debounce } from './index-8dc41d20.js';
import { s as slicedToArray, _ as _extends } from './_babelHelpers-a63acad8.js';

function useAutoResize() {
  var _useState = useState({ width: 0, height: 0 }),
      _useState2 = slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var domRef = useRef(null);
  var domObserverRef = useRef(null);
  var debounceSetWHFunRef = useRef(null);

  var setWH = useCallback(function () {
    var _domRef$current = domRef.current,
        clientWidth = _domRef$current.clientWidth,
        clientHeight = _domRef$current.clientHeight;


    setState({ width: clientWidth, height: clientHeight });
  }, []);

  var bindDomResizeCallback = useCallback(function () {
    domObserverRef.current = observerDomResize(domRef.current, debounceSetWHFunRef.current);

    window.addEventListener('resize', debounceSetWHFunRef.current);
  }, []);

  var unbindDomResizeCallback = useCallback(function () {
    var domObserver = domObserverRef.current;


    domObserver.disconnect();
    domObserver.takeRecords();
    domObserverRef.current = null;

    window.removeEventListener('resize', debounceSetWHFunRef.current);
  }, []);

  useEffect(function () {
    debounceSetWHFunRef.current = debounce(setWH, 100);

    debounceSetWHFunRef.current();

    bindDomResizeCallback();

    // 组件销毁时，清除事件
    return unbindDomResizeCallback;
  }, []);

  return _extends({}, state, { domRef: domRef });
}

export { useAutoResize as u };
//# sourceMappingURL=autoResize-6a8eac7c.js.map
