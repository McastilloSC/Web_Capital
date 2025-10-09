import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

//AXIOS
import axios from '../../axios/axios.config'

// Define una acción asincrónica para agregar un catálogo
/*export const getCatalogos = createAsyncThunk('catalogos/addCatalogos', async (thunkAPI) => {
    try {
        const { data } = await axios.get('/catalogos');
        return data;
    } catch (error) {
        // Manejar errores aquí si es necesario
        const errorMessages = {
            title: 'Ocurrio un error al obtener los catalogos',
            subtitle: 'Contacte a soporte' 
        }

        return thunkAPI.rejectWithValue({ errors: errorMessages });
    }
});*/

export const getCatalogosPipeline = createAsyncThunk('catalogos/getCatalogosPipeline', async (response) => {
    try {
        const { data } = await axios.get('pipeline/catalogos');
        return data
    } catch (error) {
        // Manejar errores aquí si es necesario
        const errorMessages = {
            title: 'Ocurrio un error al obtener los catalogos',
            subtitle: 'Contacte a soporte' 
        }
        return response.rejectWithValue({ errors: errorMessages });
    }
}) 

export const getCatalogosCapital = createAsyncThunk('catalogos/getCatalogosPipeline', async (response) => {
    try {
        const { data } = await axios.get('capital/catalogos');
        return data
    } catch (error) {
        // Manejar errores aquí si es necesario
        const errorMessages = {
            title: 'Ocurrio un error al obtener los catalogos',
            subtitle: 'Contacte a soporte' 
        }
        return response.rejectWithValue({ errors: errorMessages });
    }
})

export const getCatalogosInventario = createAsyncThunk('catalogos/getCatalogosPipeline', async (response) => {
    try {
        const { data } = await axios.get('inventario/catalogos');
        return data
    } catch (error) {
        // Manejar errores aquí si es necesario
        const errorMessages = {
            title: 'Ocurrio un error al obtener los catalogos',
            subtitle: 'Contacte a soporte' 
        }
        return response.rejectWithValue({ errors: errorMessages });
    }
})

export const catalogosSlice = createSlice({
    name: 'catalogos',
    initialState: {
        pipeline: {},
        capital: {},
        inventario: {},
        loading: true,
        errores: null
    },
    reducers:{
    },
    extraReducers: (builder) => {
        // builder.addCase(getCatalogosBitacora.pending, (state) => {
        //     state.loading = true;
        //     state.errores = null;
        // })
        // .addCase(getCatalogosBitacora.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.bitacora = action.payload.catalogos;
        // })

        /*.addCase(getCatalogos.fulfilled, (state, action) => {
            state.loading = false;
            state.areas = action.payload.areas; // Agregar el nuevo catálogo al estado
            state.departamentos = action.payload.departamentos; // Agregar el nuevo catálogo al estado
            state.gerencias = action.payload.gerencias; // Agregar el nuevo catálogo al estado
            state.localidades = action.payload.localidades; // Agregar el nuevo catálogo al estado
            state.indicadores = action.payload.indicadores; // Agregar el nuevo catálogo al estado
            state.bu = action.payload.bu; // Agregar el nuevo catálogo al estado
            state.empleados = action.payload.empleados; // Agregar el nuevo catálogo al estado
            state.periodos = action.payload.periodos; // Agregar el nuevo catálogo al estado
            state.usuarios = action.payload.usuarios; // Agregar el nuevo catálogo al estado
            state.clientes = action.payload.clientes; // Agregar el nuevo catálogo al estado
        })
        .addCase(getCatalogos.rejected, (state, action) => {
            state.loading = false;
            state.errores = action.payload.errors;
        });*/
    }
})

export default catalogosSlice.reducer