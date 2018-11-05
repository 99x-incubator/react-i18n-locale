import React from "react";
import includes from "lodash/includes";

import { IntlConsumer } from "./index";
import {
  createMarkup,
  updateWithArgs,
  getNestedValueByStringKey
} from "./utils/mixins";


const getLangData = ({ userLang, langConfigs }) => {
  if (!userLang || !langConfigs) return null;
  if (!includes(Object.keys(langConfigs), userLang))
    return langConfigs.defaults;

  return langConfigs[userLang];
};

const translate = (key, defaultText, args, config) => {
  const langData = getLangData(config);
  if (!langData) return defaultText || key;

  const text = getNestedValueByStringKey(langData, key);
  return updateWithArgs(text, args) || defaultText || key;
};

const translateHtml = (key, defaultText, args, config) => {
  const langData = getLangData(config);
  if (!langData) return defaultText || key;

  const html = getNestedValueByStringKey(langData, key);
  if (!html) return defaultText || key;

  const translatedHtml = updateWithArgs(html, args);
  return <span dangerouslySetInnerHTML={createMarkup(translatedHtml)} />; // eslint-disable-line react/no-danger
};

export default function withIntl(Component) {
  return function compose(props) {
    return (
      <IntlConsumer>
        {config => (
          <Component
            {...props}
            userLang={config.userLang}
            translate={(key, defaultText = null, ...args) =>
              translate(key, defaultText, args, config)
            }
            translateHtml={(key, defaultText = null, ...args) =>
              translateHtml(key, defaultText, args, config)
            }
          />
        )}
      </IntlConsumer>
    );
  };
}
