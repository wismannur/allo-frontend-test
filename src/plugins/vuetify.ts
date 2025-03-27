/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// Definisikan tema dark & light
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#1976D2",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#212121",
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#90CAF9",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#E0E0E0",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
});
