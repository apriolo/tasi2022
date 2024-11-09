import * as React from 'react';
import {RotasPaths} from "./Routes/RotasPrivadas";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <RotasPaths />
        </BrowserRouter>
    )
}

export default App