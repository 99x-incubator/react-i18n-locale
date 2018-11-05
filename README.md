# react-intl-translate

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
import IntlContext from "react-intl-translate";

import App from "./App";
import langConfigs from "./langConfigs.json";

// Detect browser language
const userLang = window.navigator.userLanguage || window.navigator.language;

const config = {
    userLang,
    langConfigs
}

ReactDOM.render(
  <IntlContext.Provider
    value={config}
  >
    <App />
  </IntlContext.Provider>,
  document.getElementById("root")
);

```

**Component.js**
```js
import React, { Component } from 'react';
import { withIntl } from "crl-demo";

class App extends Component {
  render () {
    return (
      <div>{this.props.translate("example-text")}</div>
    )
  }
}

export default withIntl(App)
```
