import { generateRandomString, pkceChallengeFromVerifier } from "./helpers";

export const config = {
  SSO_AUTHORIZATION_ENDPOINT:
    "https://admin-mpbt.ssv.uz/api/v1/sso/authenticate/",
  SSO_REDIRECT_URI: "http://localhost:3004/auth/callback",
  SSO_CLIENT_ID: "985170c4-46fd-4e0e-8fca-31ad8bbb89db",
  SSO_TOKEN_ENDPOINT: "https://admin-mpbt.ssv.uz/api/v1/sso/authenticate/",
};

export const getRedirectUrl = async () => {
  const code_verifier = generateRandomString();
  localStorage.setItem("pkce_code_verifier", code_verifier);

  // Hash and base64-urlencode the secret to use as the challenge
  const code_challenge = await pkceChallengeFromVerifier(code_verifier);

  // Build the authorization URL
  const url =
    config.SSO_AUTHORIZATION_ENDPOINT +
    "?response_type=code" +
    "&client_id=" +
    encodeURIComponent(config.SSO_CLIENT_ID) +
    "&redirect_uri=" +
    encodeURIComponent(config.SSO_REDIRECT_URI) +
    "&code_challenge=" +
    encodeURIComponent(code_challenge) +
    "&code_challenge_method=S256" +
    "&output=embed";

  // Redirect to the authorization server

  return url;
};
