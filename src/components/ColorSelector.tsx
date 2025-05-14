import { useRecoilState } from 'recoil'

import { primaryColor as PRIMARY_COLOR, secondaryColor as SECONDARY_COLOR } from '../atoms/color'

import { Box, Text, ColorInput } from '@mantine/core'
import classes from './ColorSelector.module.css'
import { fetchNui } from '../utils/fetchNui'

export default function ColorSelector() {
  const [primaryColor, setPrimaryColor] = useRecoilState(PRIMARY_COLOR)
  const [secondaryColor, setSecondaryColor] = useRecoilState(SECONDARY_COLOR)

  const handlePrimaryColor = (value: string) => {
    setPrimaryColor(value)

    fetchNui('setColor', {
      type: 'primary',
      color: value
    })
  }

  const handleSecondaryColor = (value: string) => {
    setSecondaryColor(value)

    fetchNui('setColor', {
      type: 'secondary',
      color: value
    })
  }

  return (
    <Box className={classes.container}>
      <Text className={classes.title}>Colores</Text>

      <ColorInput variant="filled" format='rgb' label='Color primario' value={primaryColor} onChange={handlePrimaryColor} classNames={{ dropdown: classes.dropdown }} />
      <ColorInput variant="filled" format='rgb' label='Color secundario' value={secondaryColor} onChange={handleSecondaryColor} classNames={{ dropdown: classes.dropdown }} />
    </Box>
  )
}
