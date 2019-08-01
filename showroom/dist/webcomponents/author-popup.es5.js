// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-popup v1.0.0 available at github.com/author-elements/popup
// Last Build: 7/31/2019, 7:18:42 PM
var AuthorPopupElement = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  if (!window.hasOwnProperty('AuthorBaseElement')) {
    console.error('[ERROR] <author-popup> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  (function () {
    var missingDependencies = Array.from(new Set([])).filter(function (dep) {
      return !customElements.get(dep);
    });

    if (missingDependencies.length > 0) {
      console.error("[ERROR] <author-popup> Required dependenc".concat(missingDependencies.length !== 1 ? 'ies' : 'y', " not found: ").concat(missingDependencies.map(function (d) {
        return "<".concat(d, ">");
      }).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])));
      missingDependencies.forEach(function (dep, i) {
        return console.info("".concat(i + 1, ". <").concat(dep, "> is available at ").concat('https://github.com/author-elements/popup'.replace('popup', dep.replace('author-', ''))));
      });
    }
  })();

  var AuthorPopupElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorPopupElement, _AuthorBaseElement);

    function AuthorPopupElement() {
      var _this;

      _classCallCheck(this, AuthorPopupElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorPopupElement).call(this, "<template><style>@charset \"UTF-8\"; :host{position:fixed;display:block}:host([hidden]){display:none}:host *,:host :after,:host :before{box-sizing:border-box}author-popup{position:fixed;display:block}author-popup[hidden]{display:none}author-popup *,author-popup :after,author-popup :before{box-sizing:border-box}</style><slot></slot></template>"));

      _this.UTIL.defineProperties({
        annotatedElement: {
          private: true,
          readonly: true,
          get: function get() {
            return document.getElementById(_this.getAttribute('for')) || null;
          }
        },
        position: {
          private: true,
          default: []
        },
        positionValues: {
          readonly: true,
          private: true,
          default: ['left', 'center', 'right', 'top', 'bottom']
        }
      });

      _this.UTIL.defineAttributes({
        hidden: true,
        position: {
          default: 'center top',
          get: function get() {
            return _this.PRIVATE.position ? _this.PRIVATE.position.join(' ') : null;
          },
          set: function set(value) {
            var positionValues = _this.PRIVATE.positionValues;
            var array = value.trim().split(' ');
            _this.PRIVATE.position = array.filter(function (term) {
              var isValid = positionValues.includes(term);

              if (!isValid) {
                _this.UTIL.printToConsole("Invalid position value \"".concat(term, "\". Accepted values: ").concat(_this.PRIVATE.positionValues.join(', ')), 'error');
              }

              return isValid;
            });
          }
        }
      });

      _this.UTIL.definePrivateMethods({
        annotatedElementEnterHandler: function annotatedElementEnterHandler(evt) {
          if (evt.defaultPrevented) {
            return;
          }

          _this.show();
        },
        annotatedElementLeaveHandler: function annotatedElementLeaveHandler(evt) {
          if (evt.defaultPrevented) {
            return;
          }

          _this.hide();
        }
      });

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        connected: function connected() {
          _this.hide();

          if (!_this.PRIVATE.annotatedElement) {
            return;
          }

          _this.UTIL.registerListeners(_this.PRIVATE.annotatedElement, {
            pointerenter: function pointerenter(evt) {
              _this.on('annotated-element.enter', _this.PRIVATE.annotatedElementEnterHandler);

              _this.off('annotated-element.leave', _this.PRIVATE.annotatedElementLeaveHandler);

              _this.emit({
                name: 'annotated-element.enter',
                cfg: {
                  cancelable: true
                }
              });
            },
            pointerleave: function pointerleave(evt) {
              _this.off('annotated-element.enter', _this.PRIVATE.annotatedElementEnterHandler);

              _this.on('annotated-element.leave', _this.PRIVATE.annotatedElementLeaveHandler);

              _this.emit({
                name: 'annotated-element.leave',
                cfg: {
                  cancelable: true
                }
              });
            }
          });
        }
      });

      return _this;
    }

    _createClass(AuthorPopupElement, [{
      key: "hide",
      value: function hide() {
        this.setAttribute('hidden', '');
      }
    }, {
      key: "show",
      value: function show() {
        this.removeAttribute('hidden');
      }
    }, {
      key: "annotatedElement",
      get: function get() {
        return this.PRIVATE.annotatedElement;
      }
    }, {
      key: "isHidden",
      get: function get() {
        return this.hasAttribute('hidden');
      }
    }, {
      key: "isVisible",
      get: function get() {
        return !this.isHidden;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['for', 'hidden', 'position'];
      }
    }]);

    return AuthorPopupElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-popup', AuthorPopupElement);

  return AuthorPopupElement;

}());
//# sourceMappingURL=author-popup.es5.js.map
