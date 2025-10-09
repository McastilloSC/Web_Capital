import { useContext } from 'react'
import { TableContext } from '../context/TablesContext'

const useTables = () => {
  return useContext(TableContext)
}

export default useTables