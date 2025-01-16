import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import { agentIDApi } from "../services/agentIDApi";
import { StudentAPIService } from "../services/studentApiService";
import { ProfileInfoApi } from "../services/profileInfoApi";
import { AgentAPIService } from "../services/AgentAPIService";
import { ProviderApiService } from "../services/ProviderApiService";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [agentIDApi.reducerPath]: agentIDApi.reducer,
    [StudentAPIService.reducerPath]: StudentAPIService.reducer,
    [ProfileInfoApi.reducerPath]: ProfileInfoApi.reducer,
    [AgentAPIService.reducerPath]: AgentAPIService.reducer,
    [ProviderApiService.reducerPath]: ProviderApiService.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      agentIDApi.middleware,
      StudentAPIService.middleware,
      ProfileInfoApi.middleware,
      AgentAPIService.middleware,
      ProviderApiService.middleware
    ),
});

setupListeners(store.dispatch);
