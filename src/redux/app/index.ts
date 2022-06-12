import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import { CBRService } from 'services/CBRService';
import { IExchangeRates } from 'services/CBRService/CBRService';
import { NewsService } from 'services/NewsService';
import { IArticle, IUser, TCategory } from 'services/NewsService/NewsService';

interface AppState {
  isNavVisible: boolean;
  isLoginModalVisible: boolean;
  exchangeRates?: IExchangeRates;  
  user?: IUser,
  articles: Partial<Record<TCategory, IArticle[]>>;
}

// Начальное состояние хранилища
const initialState: AppState = {
  isNavVisible: false,
  isLoginModalVisible: false,
  articles: {},
  user: undefined,
  exchangeRates: undefined,
}

export const getHeadlines = createAsyncThunk('app/getHeadlines', async (category: TCategory) => {
  const articles = await (await NewsService.getHeadlines({ category })).articles;
  // The value we return becomes the `fulfilled` action payload
  return {
    category,
    articles,
  };
});

export const getExchangeRates = createAsyncThunk('app/getCurrentExchangeRates', async () => {
  const response = await CBRService.getCurrentCourse();

  return response;
})

export const login = createAsyncThunk('app/login', async (hash: string) => {
  const response = await NewsService.login(hash);

  return response;
})


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNavVisibility: (state, action: PayloadAction<boolean>) => {
      state.isNavVisible = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeadlines.fulfilled, (state, action: PayloadAction<{
        category: TCategory,
        articles: IArticle[],
      }>) => {
        state.articles[action.payload.category] = action.payload.articles;
      })
      .addCase(getExchangeRates.fulfilled, (state, action: PayloadAction<IExchangeRates>) => {
        state.exchangeRates = action.payload;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      })
  },
})

export const { setNavVisibility, logout } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNavVisibility = (state: RootState) => state.app.isNavVisible;

export const appReducer = appSlice.reducer;
