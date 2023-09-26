# vue-pokedex

This template should help get you started developing with Vue 3 in Vite.

## Considerations

- This project can access the client theme, so if you have Dark Mode enabled, a modified version of the style will be displayed to match the black mode requirements. However, this project has been developed following a strict design created specifically for Light Mode, so it is recommended to disable Dark Mode, or, if you are running it locally, simply comment out the Dark Mode lines in `./src/styles/_color-themes.scss`.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

| If you want to compile and immediatly open your default web client, use `npm start` instead.

### Compile and Minify for Production

```sh
npm run build
```

### Run Production Preview (after compiling)

```sh
npm run preview
```

## Technologies

This project has been created using:

- Vue + Vite
- Vue.js V.3
- Vue Router V.4
- Pinia (for global state management)
- Axios
- Sass

It also includes `viteCompression` plugin for reducing bundle size in large projects
