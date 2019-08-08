class AuthorPopupElement extends AuthorBaseElement(HTMLElement) {
  constructor () {
    super(`{{TEMPLATE-STRING}}`)

    this.UTIL.defineProperties({
      annotatedElement: {
        private: true,
        readonly: true,
        get: () => document.getElementById(this.getAttribute('for')) || null
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
    })

    this.UTIL.defineAttributes({
      mode: 'programmatic',

      // position: {
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
      },

      pointerenterHandler: evt => {
        this.on('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler)
        this.off('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler)

        this.UTIL.setStyleProperty('visibilityRule', )

        this.emit({
          name: 'annotated-element.enter',
          cfg: {
            cancelable: true
          }
        })
      },

      pointerleaveHandler: evt => {
        this.off('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler)
        this.on('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler)

        this.emit({
          name: 'annotated-element.leave',
          cfg: {
            cancelable: true
          }
        })
      },

      applyHoverListeners: () => {
        this.PRIVATE.annotatedElement.addEventListener('pointerenter', this.PRIVATE.pointerenterHandler)
        this.PRIVATE.annotatedElement.addEventListener('pointerleave', this.PRIVATE.pointerleaveHandler)
      },

      removeHoverListeners: () => {
        this.off('annotated-element.enter', this.PRIVATE.annotatedElementEnterHandler)
        this.off('annotated-element.leave', this.PRIVATE.annotatedElementLeaveHandler)
        this.PRIVATE.annotatedElement.removeEventListener('pointerenter', this.PRIVATE.pointerenterHandler)
        this.PRIVATE.annotatedElement.removeEventListener('pointerleave', this.PRIVATE.pointerleaveHandler)
      },

      applyClickListeners: () => {
        this.PRIVATE.annotatedElement.addEventListener('click', this.PRIVATE.clickHandler)
      },

      removeClickListeners: () => {
        document.removeEventListener('click', this.PRIVATE.documentClickHandler)
        this.PRIVATE.annotatedElement.removeEventListener('click', this.PRIVATE.clickHandler)
      },

      clickHandler: evt => {
        evt.stopPropagation()
        this.hidden ? this.show() : this.hide()
      },

      documentClickHandler: evt => {
        if (evt.target === this || this.contains(evt.target)) {
          return
        }

        this.hide()
      },

      // reposition: evt => {
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
    })

    this.UTIL.registerListeners(this, {
      'attribute.change': evt => {
        let { attribute, oldValue, newValue } = evt.detail

        if (newValue === oldValue) {
          return
        }

        switch (attribute) {
          case 'mode':
            this.hide()
            this.PRIVATE.removeHoverListeners()
            this.PRIVATE.removeClickListeners()

            switch (newValue) {
              case 'hover': return this.PRIVATE.applyHoverListeners()
              case 'click': return this.PRIVATE.applyClickListeners()
              default: this.UTIL.throwError({
                message: `Invalid mode "${newValue}". Valid modes: "${this.PRIVATE.validModes.join('", "')}"`
              })
            }

            break

          // case 'position':
          //   this.position = newValue
          //   break
        }
      },

      connected: () => {
        this.UTIL.insertStyleRules({
          positionRule: ':host {}',
          visibilityRule: ':host {}'
        })

        this.hide()
      }
    })
  }

  static get observedAttributes () {
    return ['for', 'position', 'mode']
  }

  get annotatedElement () {
    return this.PRIVATE.annotatedElement
  }

  get hidden () {
    return this.PRIVATE.hidden
  }

  set hidden (bool) {
    bool ? this.hide() : this.show()
  }

  // get position () {
  //   return this.PRIVATE.position.join(' ')
  // }
  //
  // set position (val) {
  //
  // }

  hide () {
    if (!this.PRIVATE.styleRules.hasOwnProperty('visibilityRule')) {
      return
    }

    if (this.mode === 'click') {
      document.removeEventListener('click', this.PRIVATE.documentClickHandler)
    }

    this.UTIL.setStyleProperty('visibilityRule', 'display', 'none')
    this.PRIVATE.hidden = true
  }

  show () {
    if (this.mode === 'click') {
      document.addEventListener('click', this.PRIVATE.documentClickHandler)
    }

    this.UTIL.removeStyleProperty('visibilityRule', 'display')
    this.PRIVATE.hidden = false
  }
}

customElements.define('author-popup', AuthorPopupElement)

export default AuthorPopupElement
