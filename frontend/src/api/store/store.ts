// api/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import your reducers here
// import recordsReducer from "./recordsSlice";
// import labelsReducer from "./labelsSlice";

export const store = configureStore({
  reducer: {
    // records: recordsReducer,
    // labels: labelsReducer,
  },
});

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;