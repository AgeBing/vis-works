import React, { useLayoutEffect } from 'react';
import { s as styleInject, P as PropTypes } from '../style-inject.es-4766d9ed.js';
import '../index-8dc41d20.js';
import '../_babelHelpers-a63acad8.js';
import { u as useAutoResize } from '../autoResize-6a8eac7c.js';

var css = "#dv-full-screen-container {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  overflow: hidden;\n  transform-origin: left top;\n  z-index: 999;\n}\n";
styleInject(css);

var FullScreenContainer = function FullScreenContainer(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style;

  var _useAutoResize = useAutoResize(),
      domRef = _useAutoResize.domRef;

  useLayoutEffect(function () {
    var _window$screen = window.screen,
        width = _window$screen.width,
        height = _window$screen.height;


    Object.assign(domRef.current.style, {
      width: width + 'px',
      height: height + 'px'
    });

    domRef.current.style.transform = 'scale(' + document.body.clientWidth / width + ')';
  });

  return React.createElement(
    'div',
    {
      id: 'dv-full-screen-container',
      className: className,
      style: style,
      ref: domRef
    },
    children
  );
};

FullScreenContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default FullScreenContainer;
//# sourceMappingURL=index.js.map
