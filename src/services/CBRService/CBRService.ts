export interface IValute {
  ID: string,
  NumCode: string,
  CharCode: string,
  Nominal: number,
  Name: string,
  Value: number,
  Previous: number,
}

export interface IExchangeRates {
  Date: string,
  PreviousDate: string,
  PreviousURL: string,
  Timestamp: string,
  Valute: Record<string, IValute>;
}

export class CBRService {
  private static readonly BASE_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

  static async getCurrentCourse(): Promise<IExchangeRates> {
    return await fetch(this.BASE_URL).then((res) => res.json());
  }
}
