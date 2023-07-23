import React, { ChangeEvent, FC, useState } from 'react';
import AuroraInput, { InputProps } from '../AuroraInput/AuroraInput';

export interface autoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AuroraAutoComplete: FC<autoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  // onChange的回调
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取输入的value
    const value = e.target.value.trim();
    // 起到数据双向绑定的坐拥
    setInputValue(value);
    // fetchSuggestion是返回异步的方法，传入输入的value，然后限定后端返回来建议的数组
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="viking-auto-complete">
      <AuroraInput value={inputValue} onChange={handleChange} {...restProps}></AuroraInput>
    </div>
  );
};
