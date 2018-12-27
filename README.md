# react-i18n-locale

[![npm](https://img.shields.io/npm/v/react-i18n-locale.svg)](https://www.npmjs.com/package/react-i18n-locale)
[![license](https://img.shields.io/github/license/99xt-incubator/react-i18n-locale.svg)](https://github.com/99xt-incubator/react-i18n-locale/blob/master/LICENSE)

## Usage Example

**langConfigs.json**

```json
{
  "defaults": {
    "example-text": "Example Text"
  },
  "en-US": {
    "example-text": "Example Text En"
  }
}
```

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import IntlContext from "react-i18n-locale";

import App from "./App";
import langConfigs from "./langConfigs.json";

// Detect browser language
const userLang = window.navigator.userLanguage || window.navigator.language;

const config = {
  userLang,
  langConfigs
};

ReactDOM.render(
  <IntlContext.Provider value={config}>
    <App />
  </IntlContext.Provider>,
  document.getElementById("root")
);
```

**Component.js**

```js
import React, { Component } from "react";
import { withIntl } from "react-i18n-locale";

class App extends Component {
  render() {
    return <div>{this.props.translate("example-text")}</div>;
  }
}

export default withIntl(App);
```
