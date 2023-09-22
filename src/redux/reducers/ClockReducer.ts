import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IClockState {
  [key: string]: number | string
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly textHours: number
  readonly textMinutes: number
  readonly textSeconds: number
  readonly ampm: string
}

const initialState: IClockState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  textHours: 0,
  textMinutes: 0,
  textSeconds: 0,
  ampm: '',
}

export const updateClock = createAsyncThunk('clock/updateTime', async () => {
  return new Date()
})

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateClock.fulfilled, (state, action) => {
      const date = action.payload
      const hh = date.getHours() * 30
      const mm = date.getMinutes() * 6
      const ss = date.getSeconds() * 6
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      let ampm
      if (hours >= 12) {
        hours -= 12
        ampm = 'PM'
      } else {
        ampm = 'AM'
      }
      if (hours === 0) {
        hours = 12
      }
      state.hours = hh + mm / 12 + ss / (24 * 60)
      state.minutes = mm + ss / 60
      state.seconds = ss
      state.textHours = hours
      state.textMinutes = minutes
      state.textSeconds = seconds
      state.ampm = ampm
    })
  },
})

export const { reducer: ClockReducer } = clockSlice