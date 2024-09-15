# Jars

Jars is a very simple application allowing users to fill topic related jar related jars with pickle fitting the jars topic.

> **WARNING**: The state of this project is early Alpha. It is not considered stable nor usable at this point. It's currently aimed at developers only. Use at your own risk.

## Motivation

I have many ideas and other snippets of information that I keep dumping into various places like note-taking apps, the "Note to Self" section of my [Signal Messenger][10], text files, etc.

It also serves as a minimal but still useful example of using Nuxt.js, SurrealDB, TypeScript, OIDC and other techniques. So it's a bit of a development test bed.

### Goals

* Authentication should be handled externally using [OIDC][3].
* Data handling is exclusively done by [SurrealDB][9]. No other back end should be needed for basic usage.
* Users should be able to add information quickly and without fuss.
* The user interface is mobile first but supports all devices.
* The use of containers should be strongly supported but not mandatory. Users who prefer a manual installation should be able to do so easily (#documentation).

## Requirements

* OpenID Connect Provider (e.g. [Authentik][1], [Keycloak][2])

## Identity provider setup

Jars does not have its own user & authentication management. It uses [OpenID Connect][3] instead.

Both the Jars front end and the [SurrealDB][4] based back end use the JWT tokens for authentication and permission.

The front end implements authentication using the [Nuxt OIDC Auth module][7]. SurrealDB has native JWT support. A basic example for Nuxt & SurrealDB using JWTs can be found [here][8]. The example is based on the official SurrealDB guide on [how to connect with Auth0][9].

Jars was developed using [Authentik][1]. The following documentation is based on it, but you may choose any other OIDC provider.

### Authentik Setup

> TODO

## Authors

* [Roman Geber][12] - Initial Creator & Current Maintainer

## Contribute

Contributions are welcome. Feel free to suggest additional features, point out [issues][14] or fix bugs you come across. 

## TODO

* Improve documentation. Especially on how to set up the OIDC provider.
* Generator for SURQL files (e.g. ask for JWKS URL, Database, Namespace, etc.)
* Generator for OIDC env variables
* Add local authentication using SurrealDB's `SIGNUP` and `SIGNIN` functionality.
* Allow for different types of pickle beyond text (e.g. images, audio, etc.)
* "Detail view" for pickle instead of just a list display
* Add Nuxt tests
* Add docker compose file(s) for easy setup
* UI optimization for larger displays (e.g. desktop)

## Troubleshooting

> TODO

[1]: https://goauthentik.io/ "Authentik"
[2]: https://www.keycloak.org/ "Keycloak"
[3]: https://openid.net/developers/how-connect-works/ "What is OpenID Connect"
[4]: https://github.com/surrealdb/surrealdb "SurrealDB"
[5]: https://nuxt.com/ "Nuxt JS"
[6]: https://vuejs.org/ "Vue JS"
[7]: https://nuxt.com/modules/nuxt-oidc-auth "Nuxt OIDC Auth Module"
[8]: https://github.com/rgeber/nuxt-xp-surrealdb-oidc "Nuxt & SurrealDB OIDC authentication example"
[9]: https://surrealdb.com/docs/surrealdb/tutorials/integrate-auth0-as-authentication-provider "SurrealDB Auth0 example"
[10]: https://signal.org/ "Signal Messenger"
[11]: https://tailwindcss.com/ "Tailwind CSS"
[12]: https://romangeber.com/ "Website of Roman Geber"
[13]: https://code.geber.io/romangeber/jars "Jars Repo"
[14]: https://code.geber.io/romangeber/jars/-/issues "Jars Issue Tracker"