import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import AuroraInput, { InputProps } from '../AuroraInput/AuroraInput';
import AuroraIcon from '../AuroraIcon/AuroraIcon';
import AuroraTransition from '../AuroraTransition/AuroraTransition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = '{}'> = T & DataSourceObject;
type FetchSuggestionsFunction = (str: string) => DataSourceType[] | any;

export interface autoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: FetchSuggestionsFunction;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
  renderOptions?: any;
}

export const AuroraAutoComplete: FC<autoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSugestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setSugestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSugestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSugestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <AuroraTransition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSugestions([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <AuroraIcon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </AuroraTransition>
    );
  };
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <AuroraInput
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AuroraAutoComplete;
