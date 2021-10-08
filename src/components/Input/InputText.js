import React, {
  memo, useCallback, useEffect, useState,
} from 'react';

/**
   * This function Used to ensure that the return value is string
   * If the input is not string return empty string
   * otherwise, return string supplied
   */
const format = (text) => (text != null ? text : '');

/**
 * Ensure the return value is
 * ... string with length more then or equal to 1
 * or null
 * @param {string} text string to be unformatted
 * @returns supplied text or null
 */
const unformat = (text) => ((text.trim().length === 0) ? null : text);
// (text.trim().length !== 0 ? text : '' /* null */);

const InputText = ({
  value: parentValue,
  onChange,
  tag = 'input',
  onChangeProps,
  ...remaining
}) => {
  /**
   * Specialized Text Input Component
   * On Input component Loses Focus, emits a string with length >= 1 or null
   * It renders as a default "input" component,
   * ... but if "tag" property is supplied as a property, use the specified tag
   */
  const [localeValue, setLocaleValue] = useState(format(parentValue));

  /**
       * update the component state variable "value" on every user stroke
       * No test for valid input, accept anything
       */
  const handleChange = useCallback((e) => {
    setLocaleValue(e.target.value);
  }, []);
  /**
      * On losing focus, call parent onChange method with the unformatted input value
      *  as the second argument and original firing event as the first argument
      */
  const onBlur = useCallback((e) => {
    if (onChange) {
      onChange(e, {
        value: unformat(localeValue),
        ...onChangeProps,
      });
    }
  }, [localeValue, onChange, onChangeProps]);

  useEffect(() => {
    setLocaleValue(parentValue);
  }, [parentValue]);

  return (
    React.createElement(tag, {
      ...remaining,
      value: localeValue,
      onChange: handleChange,
      onBlur,
    })
  );
};

const memoizedInputText = memo(InputText);

// export default InputText;
export default memoizedInputText;

export {
  memoizedInputText as InputText,
};

// export {
//   InputText,
// };
