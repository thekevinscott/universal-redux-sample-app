# Universal Redux / React starter kit

Yet another universal redux / react starter kit! This one's for me, though.

It's got authentication built, so I don't have to do that every time. It uses `redux-form` for form handling and `isomorphic-fetch` for network requests. It proxies all requests to `/api` to a dedicated API server, which you could rip out and replace with any old damn thing.

On the API side, I'm using `passport` to handle authentication.

- Need to figure out how to make api nodemon only restart with API changes
- Need to figure out how to make webpack only change with local changes
- Need to handle errors from logging in, both on the input level and the form level
