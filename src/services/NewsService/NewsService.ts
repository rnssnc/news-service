export interface IArticle {
  source: {
    id: string | null,
    name: string,
    },
    author: string | null,
    title: string,
    description: string | null,
    url: string,
    urlToImage: string | null,
    publishedAt: string,
    content: string | null,
    category: TCategory,
}

export interface INewsApiResponse {
  status: 'ok' | 'error',
  totalResults: number,
  articles: IArticle[],
}

export type TCategory = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

function checkAuthReponse(response: Response) {
  if (response.status === 401) console.log('logout')
}

export default class NewsService {
  static readonly BASE_URL = 'http://localhost:80';
  static readonly AUTH_URL = 'http://localhost:80/auth/google';
  
  static async getHeadlines({
    category,
    page,
    pageSize,
  }: { category?: TCategory, page?: number, pageSize?: number }) {
      return fetch(`${this.BASE_URL}/articles?_limit=${pageSize ? pageSize : 5}&_category=${category ? category : 'general'}&_page=${page}`).then(response => response.json());
  };

  static async login(code: string) {
    return fetch(`${this.BASE_URL}/auth/google/callback${code}`)
  }
  
  static async getUserData() {
    return fetch(`${this.BASE_URL}/success`).then(response => response.json());
  }
  // defaultURL = 'http://localhost:80';

  // async login(login: string, password: string) {
  //   return new Promise<{ token: string; userLogin: string }>(async (resolve, reject) => {
  //     const response = await fetch(this.loginURL, {
  //       method: 'POST',
  //       body: JSON.stringify({ login, password }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) resolve(await response.json());
  //     if (!response.ok) reject(await response.json());
  //   });
  // }

  // async getCategories(page = 0) {
  //   return new Promise<TCategory[]>(async (resolve, reject) => {
  //     const categoriesResponse = await fetch(`${this.categoreisURL}?_page=${page}`);

  //     checkAuthReponse(categoriesResponse);

  //     const categories: TCategory[] = await categoriesResponse.json();

  //     const categoriesWithLength = [];

  //     for (let i = 0; i < categories.length; i++) {
  //       const length = await this.getCategoryLength(categories[i].title);

  //       categoriesWithLength.push({ ...categories[i], cardCount: length });
  //     }

  //     resolve(categoriesWithLength);
  //   });
  // }

  // async getCategoryCards(title: string, page = 0) {
  //   const link = title.split(' ').join('-');
  //   const response = await fetch(`${this.URL}/${link}/words?_page=${page}`);

  //   checkAuthReponse(response);

  //   return response.json();
  // }

  // async getGameAssets() {
  //   return (await fetch(`./assets/assets.json`)).json();
  // }

  // private getCategoryLength = async (category: string) => {
  //   const response = await fetch(`${this.URL}/${category}/words/length`, {
  //     method: 'GET',
  //     headers: { Accept: 'application/json' },
  //   });

  //   const length = await response.json();

  //   return length;
  // };

  // async createCategory(category: { title: string; imgSrc: string; img?: File }) {
  //   return new Promise<TCategory>(async (resolve, reject) => {
  //     const auth = sessionStorage.getItem('auth');

  //     const formData = new FormData();

  //     formData.set('title', category.title);
  //     formData.set('imgSrc', category.imgSrc);
  //     if (category.img) formData.set('image', category.img);

  //     const response = await fetch(this.categoreisURL, {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     const data = await response.json();

  //     if (!response.ok) reject(data);

  //     if (response.ok) resolve({ ...data, cardCount: 0 });
  //   });
  // }

  // async createWord(word: TWordToAdd) {
  //   return new Promise<TCard>(async (resolve, reject) => {
  //     const auth = sessionStorage.getItem('auth');

  //     const formData = new FormData();

  //     formData.set('word', word.word);
  //     formData.set('translation', word.translation);
  //     formData.set('imgSrc', word.imgSrc);
  //     formData.set('audioSrc', word.audioSrc);
  //     formData.set('category', word.category);
  //     if (word.img) formData.set('image', word.img);
  //     if (word.audio) formData.set('audio', word.audio);

  //     const response = await fetch(`${this.URL}/${word.category}/words`, {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     if (response.ok) resolve(await response.json());
  //     if (!response.ok) reject(await response.json());
  //   });
  // }

  // async deleteWord(title: string, _id: number) {
  //   const link = title.split(' ').join('-');

  //   const auth = sessionStorage.getItem('auth');

  //   return new Promise<TCategory>(async (resolve, reject) => {
  //     const response = await fetch(`${this.URL}/${link}/words`, {
  //       method: 'DELETE',
  //       body: JSON.stringify({ _id }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     if (response.ok) resolve(await response.json());
  //     if (!response.ok) reject(await response.json());
  //   });
  // }

  // async updateWord(word: TWordToAdd) {
  //   return new Promise<TCard>(async (resolve, reject) => {
  //     const auth = sessionStorage.getItem('auth');

  //     const formData = new FormData();

  //     formData.set('id', word._id.toString());
  //     formData.set('word', word.word);
  //     formData.set('translation', word.translation);
  //     formData.set('imgSrc', word.imgSrc);
  //     formData.set('audioSrc', word.audioSrc);
  //     formData.set('category', word.category);
  //     if (word.img) formData.set('image', word.img);
  //     if (word.audio) formData.set('audio', word.audio);

  //     const response = await fetch(`${this.URL}/${word.category}/words`, {
  //       method: 'PUT',
  //       body: formData,
  //       headers: {
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     if (response.ok) resolve(await response.json());
  //     if (!response.ok) reject(await response.json());
  //   });
  // }

  // async updateCategory(category: { _id: number; imgSrc: string; title: string; img?: File }) {
  //   return new Promise<TCategory>(async (resolve, reject) => {
  //     const auth = sessionStorage.getItem('auth');

  //     const formData = new FormData();

  //     formData.set('id', category._id.toString());
  //     formData.set('title', category.title);
  //     formData.set('imgSrc', category.imgSrc);
  //     if (category.img) formData.set('image', category.img);

  //     const response = await fetch(this.categoreisURL, {
  //       method: 'PUT',
  //       body: formData,
  //       headers: {
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     const data = await response.json();

  //     if (!response.ok) reject(data);

  //     const itemsCount = await this.getCategoryLength(data.title);

  //     if (response.ok) resolve({ ...data, cardCount: itemsCount });
  //   });
  // }

  // async deleteCategory(_id: number) {
  //   const auth = sessionStorage.getItem('auth');

  //   return new Promise<TCategory>(async (resolve, reject) => {
  //     const response = await fetch(this.categoreisURL, {
  //       method: 'DELETE',
  //       body: JSON.stringify({ _id }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: auth ? auth : '',
  //       },
  //     });

  //     checkAuthReponse(response);

  //     const data = await response.json();

  //     if (response.ok) resolve(data);
  //     if (!response.ok) reject(data);
  //   });
  // }

  // async getCategoryCard(categoryId: number, cardWord: string) {
  //   const cards = await (await fetch(`./assets/categories/${categoryId}.json`)).json();

  //   return cards.find((card: TCard) => card.word === cardWord);
  // }
}
