/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { CtxDataType } from "../Types";

const Context = createContext<CtxDataType>({
    x: undefined,
    y: undefined,
    updateX: (_d?: number) => {},
    updateY: (_d?: number) => {},
});

export default Context;