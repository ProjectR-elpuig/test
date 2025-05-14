import { Box, Text, TextInput } from '@mantine/core'
import classes from './VehicleInformation.module.css'

import { formatPrice } from '../utils/misc'
import { useRecoilState } from 'recoil'
import { vehicleAtom, vehicleListAtom } from '../atoms/vehicle'
import { useEffect } from 'react'

export default function VehicleInformation() {
  const [selectedVehicle] = useRecoilState(vehicleAtom)
  const [vehicles] = useRecoilState(vehicleListAtom)

  let vehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicle)

  useEffect(() => {
    vehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicle)
  }, [selectedVehicle, vehicles])

  if (!vehicle) return null

  return (
    <Box className={classes.container}>
      <Text className={classes.title}>
        Información del vehículo
      </Text>

      <TextInput
        label="Modelo"
        value={vehicle.name}
        variant="filled"
        onChange={() => {}}
        readOnly
      />

      <TextInput
        label="Precio"
        value={formatPrice(vehicle.price)}
        variant="filled"
        onChange={() => {}}
        readOnly
      />

      <TextInput
        label="Tipo de combustible"
        value={vehicle.combustibleType}
        variant="filled"
        onChange={() => {}}
        readOnly
      />

      <TextInput
        label="Espacio del maletero"
        value={`${vehicle.weight} kg`}
        variant="filled"
        onChange={() => {}}
        readOnly
      />
    </Box>
  )
}