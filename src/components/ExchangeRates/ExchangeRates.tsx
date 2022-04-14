import { cn } from "@bem-react/classname";
import { Link } from "components/Link/Link";
import React, { useCallback } from "react"
import { IValute } from "services/CBRService/CBRService";
import { IClassNameProps } from "utils/core";

import './ExchangeRates.scss';

export interface IExchangeRatesProps extends IClassNameProps {
  Valute: IValute[];
}

const exchangeRatesCn = cn('ExchangeRates')
const cnExchangeRatesHeader = exchangeRatesCn('Header')
const cnExchangeRatesValutes = exchangeRatesCn('Valutes')
const cnExchangeRatesValute = exchangeRatesCn('Valute')
const cnExchangeRatesName = exchangeRatesCn('Name')
const cnExchangeRatesValue = exchangeRatesCn('Value')
const cnExchangeRatesFooter = exchangeRatesCn('Footer')
const cnExchangeRatesCredits = exchangeRatesCn('Credits')

export const ExchangeRates: React.FC<IExchangeRatesProps> = ({
  Valute,
  className,
}) => {

  const getTrend = useCallback((current: number, previous: number) => {
    if (current > previous) return ' ▲';
    if (current < previous) return ' ▼';
    return '';
  }, [])

  return (
    <div className={exchangeRatesCn(null, [className])}>
      <h3 className={cnExchangeRatesHeader}>Курс валют</h3>
      <div className={cnExchangeRatesValutes}>
        {Valute.map(valute => (
          <div className={cnExchangeRatesValute} key={valute.CharCode}>
            <span className={cnExchangeRatesName}>{valute.Name}:</span>
            <span className={exchangeRatesCn('Trend', { isGrowing: Boolean(valute.Value > valute.Previous), isFalling: Boolean(valute.Value < valute.Previous)  })}>{getTrend(valute.Value, valute.Previous)}</span>
            <span className={cnExchangeRatesValue}>{valute.Value}</span>
          </div>
        ))}
      </div>
      <div className={cnExchangeRatesFooter}>
        <Link href="https://www.cbr-xml-daily.ru" className={cnExchangeRatesCredits}>
          Курс валют Центрального Банка РФ
        </Link>
      </div>
    </div>
  )
};
