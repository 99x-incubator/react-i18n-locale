import each from "lodash/each";

export function updateWithArgs(str, params) {
  if (!str) return null;

  // When params comes as key-value pairs
  if (params && params[0] && typeof params[0] === "object") {
    const paramObj = params[0];
    each(paramObj, (val, key) => {
      str = str.replace(key, val); // eslint-disable-line no-param-reassign
    });
  } else {
    each(params, param => {
      str = str.replace("$?", param); // eslint-disable-line no-param-reassign
    });
  }

  return str;
}

export function createMarkup(html) {
  // TODO: Sanitize the html
  return { __html: html };
}

// Accessing nested JavaScript objects with string key
export const getNestedValueByStringKey = (obj, strKey) => {
  let str = strKey.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  str = str.replace(/^\./, ""); // strip a leading dot
  const keys = str.split(".");
  for (let i = 0, n = keys.length; i < n; i += 1) {
    const k = keys[i];
    if (k in obj) {
      obj = obj[k]; // eslint-disable-line no-param-reassign
    } else {
      return false;
    }
  }
  return obj;
};
