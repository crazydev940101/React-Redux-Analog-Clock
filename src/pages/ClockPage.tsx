import * as React from 'react'
import { useInterval } from 'react-interval-hook'
import { updateClock } from '../redux/reducers/ClockReducer'
import { RootState } from '../redux/store/Store'
import { useAppSelector, useAppDispatch } from '../redux/hooks/Hooks'
import { Container } from '../components/clock/container/Container'
import { Circle } from '../components/clock/circle/Circle'
import { Stick } from '../components/clock/sticks/Sticks'
import { Axis } from '../components/clock/axis/Axis'
import { Needle } from '../components/clock/needles/Needles'
import { getToolTipText } from '../components/utils/Utils'

export const ClockPage: React.FC = () => {
  const clockState = useAppSelector((state: RootState) => state.clockState)
  const dispatch = useAppDispatch()
  const [tooltip, setTooltip] = React.useState<string>()

  useInterval(
    () => {
      dispatch(updateClock())
    },
    1000,
    {
      autoStart: true,
      immediate: true,
      selfCorrecting: true,
      onFinish: () => {
        console.log('Callback when timer is stopped')
      },
    }
  )

  React.useEffect(() => {
    const tooltipText = getToolTipText(clockState)
    setTooltip(tooltipText)
  }, [clockState])

  return (
    <Container>
      <Circle tooltipText={tooltip}>
        <Stick />
        <Axis />
        <Needle className='hours' value={clockState.hours} />
        <Needle className='minutes' value={clockState.minutes} />
        <Needle className='seconds' value={clockState.seconds} />
      </Circle>
    </Container>
  )
}
