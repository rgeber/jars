-- ########################################################################
-- Specify the namespace and database that will be used.
-- These values should match the custom claims that we configured before.
-- FIXME: If needed, set up your SurrealDB namespace and database
USE NS jars DB jars;

-- Define the scope where the token will be used.
-- The name of the scope should match the custom claim that we configured before.
DEFINE SCOPE user;

-- Define the public key to verify tokens issued by Authentik for our application.
-- The name of the token should match the custom claim that we configured before.
-- FIXME: Add your authentication app JWKS URL
DEFINE TOKEN authentik ON SCOPE user TYPE JWKS VALUE "YOUR_JWKS_URL";

