class AuthorPopupElement extends AuthorBaseElement(HTMLElement) {
  constructor () {
    super(`{{TEMPLATE-STRING}}`)

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
    })

    this.UTIL.defineAttributes({
      hidden: true,

      position: {
        default: 'center top',

        get: () => this.PRIVATE.position ? this.PRIVATE.position.join(' ') : null,

        set: value => {
          let { positionValues } = this.PRIVATE
          let array = value.trim().split(' ')

          this.PRIVATE.position = array.filter(term => {
            let isValid = positionValues.includes(term)

            if (!isValid) {
              this.UTIL.printToConsole(`Invalid position value "${term}". Accepted values: ${this.PRIVATE.positionValues.join(', ')}`, 'error')
            }

            return isValid
          })
        }
      }
    })

    this.UTIL.definePrivateMethods({
      annotatedElementEnterHandler: evt => {
        if (evt.defaultPrevented) {
          return
        }

        this.show()
      },

      annotatedElementLeaveHandler: evt => {
        if (evt.defaultPrevented) {
          return
        }

        this.hide()
      }
    })

    this.UTIL.registerListeners(this, {
      connected: () => {
        this.hide()

        if (!this.PRIVATE.annotatedElement) {
          return
        }

        this.UTIL.registerListeners(this.PRIVATE.annotatedElement, {
          pointerenter: evt => {
            this.on('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler)
            this.off('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler)

            this.emit({
              name: 'annotated-element.enter',
              cfg: {
                cancelable: true
              }
            })
          },

          pointerleave: evt => {
            this.off('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler)
            this.on('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler)

            this.emit({
              name: 'annotated-element.leave',
              cfg: {
                cancelable: true
              }
            })
          }
        })
      }
    })
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
    this.setAttribute('hidden', '')
  }

  show () {
    this.removeAttribute('hidden')
  }
}

customElements.define('author-popup', AuthorPopupElement)

export default AuthorPopupElement
