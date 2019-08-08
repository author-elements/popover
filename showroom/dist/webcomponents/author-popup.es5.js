// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-popup v1.0.0 available at github.com/author-elements/popup
// Last Build: 8/7/2019, 9:51:45 PM
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

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorPopupElement).call(this, "<template><style>@charset \"UTF-8\"; :host{display:block}:host *,:host :after,:host :before{box-sizing:border-box}author-popup{display:block}author-popup *,author-popup :after,author-popup :before{box-sizing:border-box}</style><slot></slot></template>"));

      _this.UTIL.defineProperties({
        annotatedElement: {
          private: true,
          readonly: true,
          get: function get() {
            return document.getElementById(_this.getAttribute('for')) || null;
          }
        },
        hidden: {
          private: true,
          default: true
        },
        position: {
          private: true,
          default: ['left', 'bottom']
        },
        validPositions: {
          readonly: true,
          private: true,
          default: ['left', 'center', 'right', 'top', 'bottom']
        },
        validModes: {
          private: true,
          readonly: true,
          default: ['hover', 'click', 'programmatic']
        }
      });

      _this.UTIL.defineAttributes({
        mode: 'programmatic' // position: {
        //   default: 'center top',
        //
        //   get: () => this.PRIVATE.position ? this.PRIVATE.position.join(' ') : null,
        //
        //   set: value => {
        //     if (Array.isArray(value)) {
        //       return
        //     }
        //
        //     let input = value.split(' ').map(term => {
        //       let isValid = this.PRIVATE.validPositions.includes(term.trim())
        //
        //       if (!isValid) {
        //         return this.UTIL.printToConsole(`Invalid position "${term}". Valid position values: "${this.PRIVATE.validPositions.join('", "')}"`, 'error')
        //       }
        //
        //       return term.trim()
        //     }).filter(Boolean)
        //
        //     this.PRIVATE.position = this.PRIVATE.validPositions.filter(term => input.includes(term))
        //     this.PRIVATE.reposition()
        //   }
        // }

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
        },
        pointerenterHandler: function pointerenterHandler(evt) {
          _this.on('annotated-element.enter', _this.PRIVATE.annotatedElementEnterHandler);

          _this.off('annotated-element.leave', _this.PRIVATE.annotatedElementLeaveHandler);

          _this.UTIL.setStyleProperty('visibilityRule');

          _this.emit({
            name: 'annotated-element.enter',
            cfg: {
              cancelable: true
            }
          });
        },
        pointerleaveHandler: function pointerleaveHandler(evt) {
          _this.off('annotated-element.enter', _this.PRIVATE.annotatedElementEnterHandler);

          _this.on('annotated-element.leave', _this.PRIVATE.annotatedElementLeaveHandler);

          _this.emit({
            name: 'annotated-element.leave',
            cfg: {
              cancelable: true
            }
          });
        },
        applyHoverListeners: function applyHoverListeners() {
          _this.PRIVATE.annotatedElement.addEventListener('pointerenter', _this.PRIVATE.pointerenterHandler);

          _this.PRIVATE.annotatedElement.addEventListener('pointerleave', _this.PRIVATE.pointerleaveHandler);
        },
        removeHoverListeners: function removeHoverListeners() {
          _this.off('annotated-element.enter', _this.PRIVATE.annotatedElementEnterHandler);

          _this.off('annotated-element.leave', _this.PRIVATE.annotatedElementLeaveHandler);

          _this.PRIVATE.annotatedElement.removeEventListener('pointerenter', _this.PRIVATE.pointerenterHandler);

          _this.PRIVATE.annotatedElement.removeEventListener('pointerleave', _this.PRIVATE.pointerleaveHandler);
        },
        applyClickListeners: function applyClickListeners() {
          _this.PRIVATE.annotatedElement.addEventListener('click', _this.PRIVATE.clickHandler);
        },
        removeClickListeners: function removeClickListeners() {
          document.removeEventListener('click', _this.PRIVATE.documentClickHandler);

          _this.PRIVATE.annotatedElement.removeEventListener('click', _this.PRIVATE.clickHandler);
        },
        clickHandler: function clickHandler(evt) {
          evt.stopPropagation();
          _this.hidden ? _this.show() : _this.hide();
        },
        documentClickHandler: function documentClickHandler(evt) {
          if (evt.target === _assertThisInitialized(_this) || _this.contains(evt.target)) {
            return;
          }

          _this.hide();
        } // reposition: evt => {
        //   let { annotatedElement, position } = this.PRIVATE
        //   // let reference = this.PRIVATE.annotatedElement.getBoundingClientRect()
        //
        //   this.UTIL.setStyleProperty('positionRule', 'top', `${annotatedElement.offsetTop}px`)
        //   this.UTIL.setStyleProperty('positionRule', 'top', `${annotatedElement.offsetTop}px`)
        //
        //   this.UTIL.removeStyleProperties('positionRule', ['top', 'right', 'bottom', 'left', 'transform'])
        //
        //   switch (position[0]) {
        //     case 'right': return this.UTIL.setStyleProperty('positionRule', 'left', `${annotatedElement.offsetRight}px`)
        //     case 'center': return this.UTIL.setStyleProperty('positionRule', 'left', `${(reference.left + reference.width / 2) - (this.clientWidth / 2)}`)
        //     case 'left': return this.UTIL.setStyleProperty('positionRule', 'left', `${annotatedElement.offsetLeft - this.clientWidth}px`)
        //   }
        //
        //   // switch (position[1]) {
        //   //   case 'top': return this.UTIL.setStyleProperty('positionRule', 'bottom', `${reference.top}px`)
        //   //   case 'center': return this.UTIL.setStyleProperty('positionRule', 'top', `${(reference.top + reference.height / 2) - (this.clientHeight / 2)}`)
        //   //   case 'bottom': return this.UTIL.setStyleProperty('positionRule', 'top', `${reference.bottom}px`)
        //   // }
        // }

      });

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        'attribute.change': function attributeChange(evt) {
          var _evt$detail = evt.detail,
              attribute = _evt$detail.attribute,
              oldValue = _evt$detail.oldValue,
              newValue = _evt$detail.newValue;

          if (newValue === oldValue) {
            return;
          }

          switch (attribute) {
            case 'mode':
              _this.hide();

              _this.PRIVATE.removeHoverListeners();

              _this.PRIVATE.removeClickListeners();

              switch (newValue) {
                case 'hover':
                  return _this.PRIVATE.applyHoverListeners();

                case 'click':
                  return _this.PRIVATE.applyClickListeners();

                default:
                  _this.UTIL.throwError({
                    message: "Invalid mode \"".concat(newValue, "\". Valid modes: \"").concat(_this.PRIVATE.validModes.join('", "'), "\"")
                  });

              }

              break;
            // case 'position':
            //   this.position = newValue
            //   break
          }
        },
        connected: function connected() {
          _this.UTIL.insertStyleRules({
            positionRule: ':host {}',
            visibilityRule: ':host {}'
          });

          _this.hide();
        }
      });

      return _this;
    }

    _createClass(AuthorPopupElement, [{
      key: "hide",
      // get position () {
      //   return this.PRIVATE.position.join(' ')
      // }
      //
      // set position (val) {
      //
      // }
      value: function hide() {
        if (!this.PRIVATE.styleRules.hasOwnProperty('visibilityRule')) {
          return;
        }

        if (this.mode === 'click') {
          document.removeEventListener('click', this.PRIVATE.documentClickHandler);
        }

        this.UTIL.setStyleProperty('visibilityRule', 'display', 'none');
        this.PRIVATE.hidden = true;
      }
    }, {
      key: "show",
      value: function show() {
        if (this.mode === 'click') {
          document.addEventListener('click', this.PRIVATE.documentClickHandler);
        }

        this.UTIL.removeStyleProperty('visibilityRule', 'display');
        this.PRIVATE.hidden = false;
      }
    }, {
      key: "annotatedElement",
      get: function get() {
        return this.PRIVATE.annotatedElement;
      }
    }, {
      key: "hidden",
      get: function get() {
        return this.PRIVATE.hidden;
      },
      set: function set(bool) {
        bool ? this.hide() : this.show();
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['for', 'position', 'mode'];
      }
    }]);

    return AuthorPopupElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-popup', AuthorPopupElement);

  return AuthorPopupElement;

}());
//# sourceMappingURL=author-popup.es5.js.map
