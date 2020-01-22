import React from "react";
import includes from "lodash/includes";

import { IntlConsumer } from "./index";
import {
  createMarkup,
  updateWithArgs,
  getNestedValueByStringKey
} from "./utils/mixins";

const getLanguageData = ({ userLanguage, languageConfigs }) => {
  if (!userLanguage || !languageConfigs) return null;
  if (!includes(Object.keys(languageConfigs), userLanguage))
    return languageConfigs.defaults;

  return languageConfigs[userLanguage];
};

const translate = (key, defaultText, args, config) => {
  const languageData = getLanguageData(config);
  if (!languageData) return defaultText || key;

  const text = getNestedValueByStringKey(languageData, key);
  return updateWithArgs(text, args) || defaultText || key;
};

const translateHtml = (key, defaultText, args, config) => {
  const languageData = getLanguageData(config);
  if (!languageData) return defaultText || key;

  const html = getNestedValueByStringKey(languageData, key);
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
            userLanguage={config.userLanguage}
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
