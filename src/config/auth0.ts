// Configuration Auth0 centralisée
// Les valeurs doivent être définies dans le fichier .env avec le préfixe VITE_
export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
export const AUTH0_CALLBACK_URL = import.meta.env.VITE_AUTH0_CALLBACK_URL;
export const AUTH0_LOGOUT_URL = import.meta.env.VITE_AUTH0_LOGOUT_URL || 'http://localhost:5173';
