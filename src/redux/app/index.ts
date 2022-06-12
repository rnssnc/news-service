import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import { CBRService } from 'services/CBRService';
import { IExchangeRates } from 'services/CBRService/CBRService';
import { NewsService } from 'services/NewsService';
import { IArticle, TCategory } from 'services/NewsService/NewsService';

// Define a type for the slice state
interface CounterState {
  isNavVisible: boolean;
  isLoginModalVisible: boolean;
  exchangeRates?: IExchangeRates;  
  articles: Partial<Record<TCategory, IArticle[]>>;
}

// Define the initial state using that type
const initialState: CounterState = {
  isNavVisible: false,
  isLoginModalVisible: false,
  articles: {},
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

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNavVisibility: (state, action: PayloadAction<boolean>) => {
      state.isNavVisible = action.payload
    },
    setLoginModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isNavVisible = action.payload
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
  },
})

export const { setNavVisibility, setLoginModalVisibility } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNavVisibility = (state: RootState) => state.app.isNavVisible;

export const appReducer = appSlice.reducer;
