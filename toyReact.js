class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  appendChild() {}
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root
    }
    return this._root
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
}

export function xiaodaobiepao (type, attributes, ...children) {
  let dom
  if (typeof type === 'string') {
    dom = new ElementWrapper(type)
  } else {
    dom = new type
  }
  for (let p in attributes) {
    dom.setAttribute(p, attributes[p])
  }
  let insertChild = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if (typeof child === 'object' && child instanceof Array) {
        insertChild(child)
      } else {
        dom.appendChild(child)
      }
    }
  }
  insertChild(children)
  return dom
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root)
}