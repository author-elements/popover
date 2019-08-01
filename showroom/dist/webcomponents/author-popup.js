// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-popup v1.0.0 available at github.com/author-elements/popup
// Last Build: 7/31/2019, 7:18:42 PM
var AuthorPopupElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-popup> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          (function () {
            let missingDependencies = Array.from(new Set([])).filter(dep => !customElements.get(dep));
            if (missingDependencies.length > 0) {
              console.error(`[ERROR] <author-popup> Required dependenc${missingDependencies.length !== 1 ? 'ies' : 'y'} not found: ${missingDependencies.map(d => `<${d}>`).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])}`);
              missingDependencies.forEach((dep, i) => console.info(`${i+1}. <${dep}> is available at ${'https://github.com/author-elements/popup'.replace('popup', dep.replace('author-', ''))}`));
            }
          })();
          class AuthorPopupElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{position:fixed;display:block}:host([hidden]){display:none}:host *,:host :after,:host :before{box-sizing:border-box}author-popup{position:fixed;display:block}author-popup[hidden]{display:none}author-popup *,author-popup :after,author-popup :before{box-sizing:border-box}</style><slot></slot></template>`);

      this.UTIL.defineProperties({
        annotatedElement: {
          private: true,
          readonly: true,
          get: () => document.getElementById(this.getAttribute('for')) || null
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

      this.UTIL.defineAttributes({
        hidden: true,

        position: {
          default: 'center top',

          get: () => this.PRIVATE.position ? this.PRIVATE.position.join(' ') : null,

          set: value => {
            let { positionValues } = this.PRIVATE;
            let array = value.trim().split(' ');

            this.PRIVATE.position = array.filter(term => {
              let isValid = positionValues.includes(term);

              if (!isValid) {
                this.UTIL.printToConsole(`Invalid position value "${term}". Accepted values: ${this.PRIVATE.positionValues.join(', ')}`, 'error');
              }

              return isValid
            });
          }
        }
      });

      this.UTIL.definePrivateMethods({
        annotatedElementEnterHandler: evt => {
          if (evt.defaultPrevented) {
            return
          }

          this.show();
        },

        annotatedElementLeaveHandler: evt => {
          if (evt.defaultPrevented) {
            return
          }

          this.hide();
        }
      });

      this.UTIL.registerListeners(this, {
        connected: () => {
          this.hide();

          if (!this.PRIVATE.annotatedElement) {
            return
          }

          this.UTIL.registerListeners(this.PRIVATE.annotatedElement, {
            pointerenter: evt => {
              this.on('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler);
              this.off('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler);

              this.emit({
                name: 'annotated-element.enter',
                cfg: {
                  cancelable: true
                }
              });
            },

            pointerleave: evt => {
              this.off('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler);
              this.on('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler);

              this.emit({
                name: 'annotated-element.leave',
                cfg: {
                  cancelable: true
                }
              });
            }
          });
        }
      });
    }

    static get observedAttributes () {
      return ['for', 'hidden', 'position']
    }

    get annotatedElement () {
      return this.PRIVATE.annotatedElement
    }

    get isHidden () {
      return this.hasAttribute('hidden')
    }

    get isVisible () {
      return !this.isHidden
    }

    hide () {
      this.setAttribute('hidden', '');
    }

    show () {
      this.removeAttribute('hidden');
    }
  }

  customElements.define('author-popup', AuthorPopupElement);

  return AuthorPopupElement;

}());
//# sourceMappingURL=author-popup.js.map
