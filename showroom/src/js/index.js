const Demo = new NGNX.VIEW.Registry({
  selector: '.demo',
  namespace: 'demo.',

  references: {
    annotatedElement: '#annotated_div',
    popup: 'author-popup'
  },

  init () {
    let {
      annotatedElement,
      popup
    } = this.ref

    popup.on('annotated-element.enter', evt => {
      evt.preventDefault()
    })

    annotatedElement.on('click', evt => {
      popup.element.isVisible ? popup.element.hide() : popup.element.show()
    })

    popup.on('annotated-element.leave', evt => {
      evt.preventDefault()
    })
  }
})
