import { configureStore } from "@reduxjs/toolkit";

//Catalogos
import catalogosSlice from "./features/catalogos/catalogosSlice";

export default configureStore({
    reducer: {
        catalogos: catalogosSlice
    },
});
