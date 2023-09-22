import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { ClockReducer, IClockState } from '../reducers/ClockReducer'

export interface IApplicationState {
  clockState: IClockState
}

const rootReducer = combineReducers<IApplicationState>({
  clockState: ClockReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['clock/updateTime/fulfilled'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
