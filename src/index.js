import React from "react";
import withIntl from "./withIntl";

const IntlContext = React.createContext({
  lang: "en-US",
  userLang: "en-US"
});
const IntlProvider = IntlContext.Provider;
const IntlConsumer = IntlContext.Consumer;

export { withIntl, IntlProvider, IntlConsumer };
export default IntlContext;
