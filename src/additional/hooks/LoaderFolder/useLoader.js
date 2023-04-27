import {useContext} from "react";
import {LoaderContext} from "./LoaderProvider";

export function useLoader(){
    return useContext(LoaderContext)
}