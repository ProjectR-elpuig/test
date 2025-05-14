import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { Box, Button } from '@mantine/core'
import classes from './Buttons.module.css'

import { vehicleAtom, vehicleListAtom } from '../atoms/vehicle'
import { fetchNui } from '../utils/fetchNui'
import { formatPrice } from '../utils/misc'

export default function Buttons() {
  const [selectedVehicle] = useRecoilState(vehicleAtom)
  const [vehicles] = useRecoilState(vehicleListAtom)

  let vehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicle)

  useEffect(() => {
    vehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicle)
  }, [selectedVehicle, vehicles])

  if (!vehicle) return null
  
  const handleTestDrive = () => {
    fetchNui('testDrive', { vehicle: vehicle?.id })
  }

  const handleBuy = (type: number) => {
    fetchNui('buyVehicle', {
      vehicle: vehicle?.id,
      type: type
    })
  }

  return (
    <Box className={classes.container}>
      <Button variant='light' color='green' onClick={handleTestDrive}>Probar vehículo</Button>
      <Button variant='light' color='green' onClick={() => handleBuy(0)}>Comprar y registrar ({formatPrice(vehicle.price)})</Button>
      <Button variant='light' color='orange' onClick={() => handleBuy(1)}>Comprar sin registro ({formatPrice(vehicle.price * 0.8)})</Button>
      <Button variant='light' color='red' onClick={() => fetchNui('close')}>Cancelar</Button>
    </Box>
  )
}