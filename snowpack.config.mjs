/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    /* ... */
    public: "/",
    src: "/dist",
  },
  alias: {
    "@app/assets": "./public/assets",
    "@app": "./src",
  },

  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-webpack"],

  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {},
  env: {
    API_URL_DEV: "http://127.0.0.1:5000",
  },
};
