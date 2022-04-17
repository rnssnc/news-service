import { TCategory } from "services/NewsService/NewsService";

export const mapCategoryTranslate = (category: TCategory) => {
  switch(category) {
    case 'business':
      return 'Бизнес'
    case 'entertainment':
      return 'Развлечения'
    case 'general':
      return 'Главное'
    case 'health':
      return 'Медицина'
    case 'science':
      return 'Наука и техника'
    case 'sports':
      return 'Спорт'
    case 'technology':
      return 'Технологии'
  }
}
