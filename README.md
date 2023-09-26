# vue-pokedex

Here you can find information about project tech stack and scripts for running it on local.

## Considerations

- This project can access the client theme, so if you have Dark Mode enabled, a modified version of the style will be displayed to match the black mode requirements. However, this project has been developed following a strict design created specifically for Light Mode, so it is recommended to disable Dark Mode, or, if you are running it locally, simply comment out the Dark Mode lines in `./src/styles/_color-themes.scss`.

## Technologies

This project has been created using:

- Vue + Vite
- Vue.js V.3
- Vue Router V.4
- Pinia
- Axios
- Sass

It also includes `viteCompression` plugin for reducing bundle size in large projects.

| Why I choose these tech stack?

## Project Setup

> This project was created with Node.js V.19.9.0

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

## Project structure

This project has two main views: A Welcome Landing and a Base Layout for searching Pokémons.
The Welcome Landing was placed inside the Landings folder of 'views', because in the future other landing pages could be developed so that the user is redirected after operating outside the app, or with which marketing campaigns could simply be launched on social networks, optimizing their SEO.

The Base Layout has three base elements: a search bar, a space to render the list of Pokémon and a footer with two buttons that allow you to change the content of the list between "All" and "Favorites", changing only the content of the component list

The Search Bar is a styled input, ready to be reused, so as the Buttons, the List, the Cards and the Detail Modal (which accepts header, content and footer sections through the use of slots)

The Buttons can receive styles, text, a link to an icon, a disabled prop (boolean), and the action to execute in case of clicking.

The List receives all the filtered pokemons from the store, and render them dinamically. This component will be improved in a near future so it can receive this info via props, and become just a dumb component with use of slots to allow personalized data, and not just a name and icon.

The Card component is meant to render base pokemon info and a favorite icon, but it can be refactored to show more data if needed, and to be rendered with another style, but for beign practical, I chose to keep it simple and just do what it needed to do at the moment.

For API calls, I chose to place all logic in a Services folder, where I set the axios configuration, modules who manage API calls and adapters (which are functions that shape the information received from the API, optimizing it for the required use in the app, avoiding the management of large data sets between components)

Styles folder contains all the base styles, including variable declarations, color theme and font configuration, all modularized and reunited in a single file that injects itself in the app main file.

In Utils folder I have stored the "copyToClipboard" function, and it's the perfect place to keep all functions that implement logic that can be reused throughout the app

## Personal considerations

- **Why did you choose this technological stack?**

  In the aforementioned versions, these technologies are at the forefront. I could have chosen to develop the app with Vue2, which is the version I usually use, but it seemed like a good opportunity to catch up with the framework. In the same way I could have chosen to use Vuex, but Pinia is currently the official Vue global state manager, so I made the same decision. This slowed down development a bit, but it was a gateway to the new features of these technologies.

- **Why you didn't use many dependencies?**

  First of all, there weren't many (if not any) occasions where I needed to use an external dependency. Second, I consider that an application that abuses with the use of external dependencies becomes difficult to maintain, as time passes and this dependencies are left unmaintained or deprecated. For this reason, I prefer to avoid this as long as I can code it myself.

- **Why app version is 1.0.4?**

    This is simply because since I deployed the app in Vercel there where 4 fixes and not a single feat added.