import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "./store";

// to make them aware of types we defined in store, we've reexport new func that is type aware
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
