import { Configuration } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_API_AZURE_CLIENT_ID;
const tenantUrl = import.meta.env.VITE_API_AZURE_TENANT_URL;
export const msalConfig: Configuration = {
  auth: {
    clientId: clientId,
    authority: tenantUrl,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
