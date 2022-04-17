import { cn } from "@bem-react/classname";
import React, { useState } from "react"
import { IClassNameProps } from "utils/core";

import './Time.scss'

export interface ITimeProps extends IClassNameProps {

}

const timeCn = cn('Time');

export const Time: React.FC<ITimeProps> = ({
  className
}) => {
  const [date, setDate] = useState(new Date());

  setInterval(() => {
    const currentDate = new Date();
    if(date.getDay() !== currentDate.getDate()) {
      setDate(currentDate)
    }
  }, 1500)

  return (
    <span className={timeCn(null, [className])}>
      {date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
    </span>
  )
};
