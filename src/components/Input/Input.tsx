import React, { ChangeEvent, useCallback, useState } from "react"

import { cn } from "@bem-react/classname";

import { Icon } from "components/Icon/Icon";

import { IInputProps } from "./Input.typings";

import './Input.scss';

const inputCn = cn('Input');
const cnInput = inputCn();
const cnInputIcon = inputCn('Icon');

export const Input: React.FC<IInputProps> = (props) => {
  const {
    className,
    inputProps,
    InputIcon,
    onChange,
  } = props;

  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    onChange?.();
  }, [onChange]);

  return (  
    <label className={inputCn('Label', { Focused: isFocus }, [className])}>
      { InputIcon && 
          <Icon
            className={cnInputIcon} 
            Icon={InputIcon}
            size="s"
          />
      }
      <input 
        className={cnInput}
        value={value} 
        onChange={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...inputProps} 
      >
      </input>
    </label>
  )
};
