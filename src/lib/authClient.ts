import { createAuth0Client } from "@auth0/auth0-spa-js";

export const getAuth0Client = async () => {
    const domain = import.meta.env.PUBLIC_AUTH0_DOMAIN;
    const clientId = import.meta.env.PUBLIC_AUTH0_CLIENT_ID;

    if (!domain || !clientId) {
        console.error("Faltan agregar variables de entorno para Auth0 (PUBLIC_AUTH0_DOMAIN y PUBLIC_AUTH0_CLIENT_ID).");
        return null;
    }

    const auth0 = await createAuth0Client({
        domain,
        clientId,
        authorizationParams: {
            // Se calcula dinámicamente según dónde estemos (localhost o producción)
            redirect_uri: window.location.origin + '/admin'
        }
    });

    return auth0;
};
