import { visit } from 'unist-util-visit'
import { Element } from 'hast'

function classList(node: Element) {
  if (!node.properties.className) {
    node.properties.className = []
  }
  if (node.properties.className) {
    if (typeof node.properties.className === 'boolean') {
      node.properties.className = []
    } else if (!Array.isArray(node.properties.className)) {
      node.properties.className = [node.properties.className]
    }
  } else {
    node.properties.className = []
  }
  let tokens = node.properties.className
  let attribute = tokens.join(' ')
  let classList = {
    add: add,
    remove: remove,
    contains: contains,
    toggle: toggle,
    replace: replace,
    item: item,
    length: tokens.length,
    toString: function () {
      return attribute
    },
  }

  function add(token: string | number) {
    if (tokens.indexOf(token) > -1) return
    tokens.push(token)
    update()
  }

  function remove(token: string | number) {
    let index = tokens.indexOf(token)
    if (index === -1) return
    tokens.splice(index, 1)
    update()
  }

  function contains(token: string | number) {
    return tokens.includes(token)
  }

  function toggle(token: any) {
    if (contains(token)) {
      remove(token)
      return false
    } else {
      add(token)
      return true
    }
  }

  function replace(a: string | number, b: string | number) {
    let i = tokens.indexOf(a)
    if (i > -1) tokens[i] = b
  }

  function item(index: string | number) {
    return tokens[index] || null
  }

  function update() {
    classList.length = tokens.length
    attribute = tokens.join(' ')
  }

  return classList
}

export default function rehypePrismDiff() {
  return (tree: Element) => {
    visit(tree, 'element', (node: Element, index: number, parent: Element) => {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return
      }
      let meta: string = node.data && <string>node.data.meta ? <string>node.data.meta : ''
      if (!meta.toLowerCase().includes('diff'.toLowerCase())) return

      classList(node).add('code-diff')
      node.children.forEach((line) => {
        if (line.type != 'element') return
        line.children = line.children.filter((token) => {
          if (token.type !== 'element' || token.tagName !== 'span') return true
          if (classList(token).contains('operator')) {
            if (!token.children.length || !token.children[0] || token.children[0].type !== 'text')
              return true
            const firstOperator = token.children[0].value
            switch (firstOperator) {
              case '-':
                classList(line).add('diff-del')
                line.properties.operator = '-'
                return false
              case '+':
                classList(line).add('diff-add')
                line.properties.operator = '+'
                return false
              case '!':
                classList(line).add('diff-warn')
                line.properties.operator = '!'
                return false
            }
            return true
          }
          return true
        })
      })
    })
  }
}
