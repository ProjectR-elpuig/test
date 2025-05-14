import React, { useState } from 'react'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { vehicleAtom, vehicleListAtom } from './atoms/vehicle'

import { Box, Text } from '@mantine/core'
import classes from './App.module.css'

import ColorSelector from './components/ColorSelector'
import Buttons from './components/Buttons'
import VehicleInformation from './components/VehicleInformation'
import Selector from './components/Selector'
import { useNuiEvent } from './hooks/useNuiEvent'
import { IVehicle } from './utils/interface'
import { debugData } from './utils/debugData'
import { useExitListener } from './hooks/useExitListener'
import { fetchNui } from './utils/fetchNui'

debugData([
  {
    action: 'open',
    data: {
      vehicles: [
        {
          id: 1,
          name: 'T20',
          image: './assets/t20.png',
          price: 250000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 2,
          name: 'Furia',
          image: './assets/furia.png',
          price: 350000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 3,
          name: 'Zentorno',
          image: './assets/zentorno.png',
          price: 450000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 4,
          name: 'Adder',
          image: './assets/adder.png',
          price: 550000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 5,
          name: 'Entity XF',
          image: './assets/entityxf.png',
          price: 650000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 6,
          name: 'Reaper',
          image: './assets/reaper.png',
          price: 750000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 7,
          name: 'Osiris',
          image: './assets/osiris.png',
          price: 850000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 8,
          name: 'Tyrant',
          image: './assets/tyrant.png',
          price: 950000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 9,
          name: 'X80 Proto',
          image: './assets/x80proto.png',
          price: 1050000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 10,
          name: 'Tezeract',
          image: './assets/tezeract.png',
          price: 1150000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 11,
          name: 'Xa-21',
          image: './assets/xa21.png',
          price: 1250000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 12,
          name: 'Tyrus',
          image: './assets/issi4.png',
          price: 1350000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 13,
          name: 'Vagner',
          image: './assets/vagner.png',
          price: 1450000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 14,
          name: 'Visione',
          image: './assets/visione.png',
          price: 1550000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 15,
          name: 'Itali GTB',
          image: './assets/italigtb.png',
          price: 1650000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 16,
          name: 'Itali GTB Custom',
          image: './assets/italigtb2.png',
          price: 1750000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 17,
          name: 'Turismo R',
          image: './assets/turismor.png',
          price: 1850000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 18,
          name: 'Cheetah',
          image: './assets/cheetah.png',
          price: 1950000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 19,
          name: 'GP1',
          image: './assets/gp1.png',
          price: 2050000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 20,
          name: 'ETR1',
          image: './assets/issi4.png',
          price: 2150000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 21,
          name: 'GP1',
          image: './assets/gp1.png',
          price: 2250000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 22,
          name: 'ETR1',
          image: './assets/ETR1.png',
          price: 2350000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
        {
          id: 23,
          name: 'GP1',
          image: './assets/gp1.png',
          price: 2450000,
          combustibleType: 'Gasolina',
          seats: 2,
          doors: 2,
        },
      ] as IVehicle[]
    }
  }
])

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useRecoilState(vehicleAtom)
  const setVehicleList = useSetRecoilState(vehicleListAtom)

  useNuiEvent<{ vehicles: IVehicle[] }>('open', (data) => {
    setVehicleList(data.vehicles)
    setVisible(true)
    setLoading(false)
    
    if (data.vehicles[0].model) {
      setCurrentVehicle(data.vehicles[0].model)

      fetchNui('selectVehicle', {
        vehicle: data.vehicles[0].model
      })
    }
  })

  useNuiEvent('close', () => {
    setCurrentVehicle(0)
    setVisible(false)
  })

  useNuiEvent<{ state: boolean }>('setLoadingState', (data) => {
    setLoading(data.state)
  })

  useExitListener(() => {
    setCurrentVehicle(0)
    setVisible(false)
  })

  return (
    <Box className={classes.container} style={{ visibility: visible ? 'visible' : 'hidden' }}>
      {loading && (
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          width: '100vw',
          height: '100vh',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span className={classes.loader}></span>

          <Text style={{
            marginTop: '1vw',
            fontSize: '1vw',
            fontWeight: 400,
            color: '#fff',
          }}>
            Cargando vehículo seleccionado...
          </Text>
        </Box>
      )}

      <Box className={classes.top} style={{ visibility: currentVehicle !== 0 ? 'visible' : 'hidden' }}>
        <Box className={classes.left}>
          <ColorSelector />
          <Box style={{ height: 20 }} />
          <Buttons />
        </Box>

        <Box className={classes.right}>
          <VehicleInformation />
        </Box>
      </Box>

      <Selector />
    </Box>
  )
}

export default App
