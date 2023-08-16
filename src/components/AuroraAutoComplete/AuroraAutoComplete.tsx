import React, { ChangeEvent, FC, ReactElement, useEffect, useState, KeyboardEvent } from 'react';
import AuroraInput, { InputProps } from '../AuroraInput/AuroraInput';
import AuroraIcon from '../AuroraIcon/AuroraIcon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import './_style.scss';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = '{}'> = T & DataSourceObject;

export interface autoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: string) => void;
  // 支持用户对列表进行自定义操作
  renderOption?: (item: string) => ReactElement;
}

export const AuroraAutoComplete: FC<autoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const [hightLightIndex, setHightLightIndex] = useState(-1);
  // onChange的回调 suggestion表示返回的数组
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      const results = fetchSuggestions(debouncedValue);
      // 判断如果results是promise类型
      if (results instanceof Promise) {
        setLoading(true);
        results.then((res) => {
          console.log(res);
          setSuggestions(res);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取输入的value
    const value = e.target.value.trim();
    // 起到数据双向绑定的坐拥
    setInputValue(value);
    // fetchSuggestion是返回异步的方法，传入输入的value，然后限定后端返回来建议的数组
  };
  console.log(suggestions, 111);
  const handleSelect = (item: any) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item.value);
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  /**
   *  生成返回列表
   */
  const generateDropdown = () => {
    console.log(hightLightIndex, 11);
    return (
      <ul>
        {suggestions.map((item: any, index) => {
          const classes = classNames('suggestion-item', {
            'item-highlight': index === hightLightIndex,
          });
          return (
            <li key={index} onClick={() => handleSelect(item)} className={classes}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  const hightLight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index > suggestions.length) {
      index = suggestions.length;
    }
    setHightLightIndex(index);
  };
  /**
   *键盘事件
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        // 如果没有suggestions的时候可能会报错，所以要加上限制
        if (suggestions[hightLightIndex]) {
          handleSelect(suggestions[hightLightIndex]);
        }
        break;
      case 38:
        hightLight(hightLightIndex - 1);
        break;
      case 40:
        hightLight(hightLightIndex + 1);
        break;
      case 27:
        // ESC
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  return (
    <div className="viking-auto-complete">
      <AuroraInput
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      ></AuroraInput>
      {loading && (
        <ul>
          <AuroraIcon icon="spinner" spin></AuroraIcon>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
