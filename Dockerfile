# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production
ENV REACT_APP_API_ROOT_URL https://arthouse.fictionaldev.com

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /arthouse-admin

ADD package.json package-lock.json ./
RUN npm install --production=false --legacy-peer-deps

# Setup production node_modules
FROM base as production-deps

WORKDIR /arthouse-admin

COPY --from=deps /arthouse-admin/node_modules /arthouse-admin/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev --legacy-peer-deps

# Build the app
FROM base as build

WORKDIR /arthouse-admin

COPY --from=deps /arthouse-admin/node_modules /arthouse-admin/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /arthouse-admin

COPY --from=production-deps /arthouse-admin/node_modules /arthouse-admin/node_modules

COPY --from=build /arthouse-admin/build /arthouse-admin/build
COPY --from=build /arthouse-admin/public /arthouse-admin/public
ADD . .

CMD ["npm", "run", "serve"]
