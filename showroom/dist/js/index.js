/**
 * author-popup-showroom v1.0.0 generated on Wed Jul 31 2019.
 * Built at 19:21:34 GMT-0700 (Pacific Daylight Time)
 * Copyright (c) 2019 Author.io
 */
"use strict";var Demo=new NGNX.VIEW.Registry({selector:".demo",namespace:"demo.",references:{annotatedElement:"#annotated_div",popup:"author-popup"},init:function(){var e=this.ref,n=e.annotatedElement,t=e.popup;t.on("annotated-element.enter",function(e){e.preventDefault()}),n.on("click",function(e){t.element.isVisible?t.element.hide():t.element.show()}),t.on("annotated-element.leave",function(e){e.preventDefault()})}});