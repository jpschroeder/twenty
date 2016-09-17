# twenty

This is a simple web application that allows you to share or request location information using the html5 [geolocation api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation).

## installation

First copy `app/env.sample` to `app/.env` and add your own google api key and database url.

Then run: `DEBUG=twenty:* npm start`

Then visit: `http://localhost:3000`

The application also contains a Dockerfile.  You can use this to deploy to heroku or dokku.

