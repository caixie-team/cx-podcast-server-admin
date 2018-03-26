/* eslint-disable func-style,no-extra-parens */
// 判断参数是否是其中之一
import Cookies from "js-cookie";
import { parse as parseCookie } from 'cookie'

export const oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll (start, end, step) {
    if (start === end) {
      return
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}


// Find components upward
function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}

export {findComponentUpward};

// Find component downward
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) {
          break
        }
      }
    }
  }
  return children
}

// Find components downward
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export function findComponentsUpward (context, componentName) {
  const parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent)
    }
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// Find brothers components
export function findBrothersComponents (context, componentName) {
  const res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  });
  const index = res.indexOf(context)
  res.splice(index, 1)
  return res
}

export const dimensionMap = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1600px',
}


export function setMatchMedia () {
  if (typeof window !== 'undefined') {
    const matchMediaPolyfill = mediaQuery => {
      return {
        media: mediaQuery,
        matches: false,
        on() {},
        off() {},
      }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
  }
}


export function setLocalStorage (name, value) {
  if (typeof localStorage !== 'undefined') {
    if (value) {
      localStorage.setItem(name, value)
    } else {
      localStorage.removeItem(name)
    }
  }
}

export function getLocalStorage (name) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(name)
  }
}

export function setCookie (name, value, options = {}) {
  if (!process.browser) {
    return
  }

  if (value) {
    Cookies.set(name, value, options)
  } else {
    Cookies.remove(name, options)
  }
}

export function getCookie (name, req) {
  const cookieStr = process.browser
    ? document.cookie
    : req.headers.cookie

  const cookies = parseCookie(cookieStr || '') || {}
  return cookies[name]
}
