import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { vehicleAtom, vehicleListAtom } from "../atoms/vehicle";

import { Box, TextInput, Text, ActionIcon } from "@mantine/core";

import classes from "./Selector.module.css";

import { BsArrowsAngleExpand, BsArrowsAngleContract, BsSearch } from "react-icons/bs";
import { IVehicle } from "../utils/interface";
import { formatPrice } from "../utils/misc";
import { fetchNui } from "../utils/fetchNui";

export default function Selector() {
  const [size, setSize] = useState('small')
  const [search, setSearch] = useState('')

  const [selectedVehicle, setSelectedVehicle] = useRecoilState(vehicleAtom)
  const [vehicles] = useRecoilState(vehicleListAtom)
  const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>(vehicles)

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    if (!event.target.value || event.target.value === '') return setFilteredVehicles(vehicles)
    setFilteredVehicles(vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }, [vehicles])

  const handleClick = (index: string | undefined) => {
    if (index === undefined) {
      setSelectedVehicle(0)
      fetchNui('selectVehicle', {
        vehicle: false
      })

      return
    }

    if (selectedVehicle === index) {
      setSelectedVehicle(0)
      fetchNui('selectVehicle', {
        vehicle: false
      })

      return
    }
  
    setSelectedVehicle(index)
    fetchNui('selectVehicle', {
      vehicle: index
    })
  }

  useEffect(() => {
    setFilteredVehicles(vehicles)
  }, [vehicles])

  return (
    <Box className={classes.container} style={{ minHeight: size === 'small' ? '9.5vw' : '20vw' }}>
      <Box className={classes.options}>
        <TextInput placeholder="Buscar vehículo" value={search} variant="filled" leftSection={<BsSearch size={15} />} onChange={handleSearch} />
        <Box className={classes.help}>Usa la tecla <span>A</span> y la <span>D</span> para rotar el vehículo</Box>
        <ActionIcon variant="filled" color="green" radius="sm" onClick={() => setSize(size == 'small' ? 'max' : 'small')}>
          {size === 'small' ? <BsArrowsAngleExpand size={15} /> : <BsArrowsAngleContract size={15} />}
        </ActionIcon>
      </Box>

      {size === 'small' ? (
        <Box className={classes.list}>
          {filteredVehicles.map((vehicle, index) => (
            <Box key={index} className={selectedVehicle === vehicle.model ? classes.vehicleActive : classes.vehicle} onClick={() => handleClick(vehicle.model)}>
              <Text className={classes.name}>{vehicle.name}</Text>
              <Box className={classes.imgContainer}>
                <img src={`https://raw.githubusercontent.com/matthias-codes/v-vehicle-images/main/images/${vehicle.model}.png`} className={classes.img} alt="T20" onError={(e) => { e.currentTarget.src = './assets/t20.png' }} />
              </Box>
              <Text className={classes.price}>{formatPrice(vehicle.price)}</Text>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className={classes.grid}>
          {filteredVehicles.map((vehicle, index) => (
            <Box key={index} className={selectedVehicle === vehicle.model ? classes.vehicleActive : classes.vehicle} onClick={() => handleClick(vehicle.model)}>
              <Text className={classes.name}>{vehicle.name}</Text>
              <Box className={classes.imgContainer}>
                <img src={`https://raw.githubusercontent.com/matthias-codes/v-vehicle-images/main/images/${vehicle.model}.png`} className={classes.img} alt="T20" onError={(e) => { e.currentTarget.src = './assets/t20.png' }} />
              </Box>
              <Text className={classes.price}>{formatPrice(vehicle.price)}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}