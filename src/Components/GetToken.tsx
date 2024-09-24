import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
export const getToken = async (
  instance: IPublicClientApplication,
  account: AccountInfo
) => {
  const clientId = import.meta.env.VITE_API_AZURE_CLIENT_ID;
  const defaultScope = `api://${clientId}/user_impersonation`;
  const request = {
    scopes: [defaultScope, "User.Read"],
    account: account,
  };
  try {
    const response = await instance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    const popupResponse = await instance.acquireTokenPopup(request);
    return popupResponse.accessToken;
  }
};
