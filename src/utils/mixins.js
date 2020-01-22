import each from "lodash/each";

export function updateWithArgs(text, args) {
  if (!text) return null;

  // When params come as key-value pairs
  if (args && args[0] && typeof args[0] === "object") {
    const paramObj = args[0];
    each(paramObj, (val, key) => {
      text = text.replace(key, val); // eslint-disable-line no-param-reassign
    });
  } else {
    each(args, param => {
      text = text.replace("$?", param); // eslint-disable-line no-param-reassign
    });
  }

  return text;
}

export function createMarkup(html) {
  // TODO: Sanitize the html
  return { __html: html };
}

// Accessing nested JavaScript objects with string key
export const getNestedValueByStringKey = (object, stringKey) => {
  let indexToProperty = stringKey.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  indexToProperty = indexToProperty.replace(/^\./, ""); // strip a leading dot
  const keys = indexToProperty.split(".");
  for (let i = 0, n = keys.length; i < n; i += 1) {
    const k = keys[i];
    if (k in object) {
      object = object[k]; // eslint-disable-line no-param-reassign
    } else {
      return false;
    }
  }
  return object;
};
