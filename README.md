- To run the game locally:

1. in outer most folder, run command "docker-compose -f docker-compose.dev.yml up"
2. locate to the frontend folder, run npm install, and then run npm start
3. locate to the backend folder, run npm install, then run npm start

The game is now accessible at localhost:3000

- To deploy the game, there are three main stages:

A. Adapt environment variables:

1. Open the file docker-compose.yml in the root folder.
2. Change the environment variables KEYCLOAK_USER and KEYCLOAK_PASSWORD of service "keycloak". The KEYCLOAK_USER and the KEYCLOAK_PASSWORD can be anything. They are the credentials you use to login to keycloak administration console.
3. Adapt the KEYCLOAK_FRONTEND_URL of service "keycloak" corresponding to the public url you are going to deploy the game. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/keycloak (Important: no slash at the end of the url!).
4. Navigate to the frontend folder and open the file .env.production.local
5. Change the value of REACT_APP_KEYCLOAK_BASE_URL to the value of KEYCLOAK_FRONTEND_URL in step 3.
6. Change the value of REACT_APP_BACKEND_BASE_URL. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/backend/ (Important: there must be a slash at the end of the url!).
6. Navigate to the backend folder and open the Dockerfile.
7. Change the value of KEYCLOAK_BASE_URL to the value of the KEYCLOAK_FRONTEND_URL in step 3.

B. Start the application:

Locate to the root folder, run the command "docker-compose up --build" to start the game.

C. Configure Keycloak:
1. After a few minutes, when all the containers are ready, access the keycloak administration console at  http://<KEYCLOAK_FRONTEND_URL>/auth/admin/ and login with the chosen username.
2. On the left hand side, open the "Clients" tab.
3. In the table on the right hand side, in the column ClientID, click on "react"  to open the setting page for the "react" client.
4. In the Settings tab, look for the "Valid Redirect URIs"
5. Add the address of the game to this field. For example, if the url of the game is "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop/*" to this field.
6. In the same tab, look for the Web Origins field, add the address of the game to this field. For example, if the url of the game is "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop" to this field (Important, no slash at the end of the URL).
7. Click on "save" button at the end
8. The game is now accessible at your chosen address.

If the keycloak container exits with error message similar to "user ... is already exist", delete the container and run the command docker-compose up again.

*******************************************************************************
Important note:
1. The application has not been configured to serve https request. Please configure your host accordingly
2. Up until this point, there has been no plan for database backup. That means if the containers keycloak and mongoDB crash, we will lose user data.
