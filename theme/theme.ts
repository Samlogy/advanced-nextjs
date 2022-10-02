import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const colors = {
  white: "#fff",
  black: "#000",
  // notfications colors
  notif: {
    error: "#e53e3e",
    warning: "#deb055",
    success: "#38a169",
    info: "#3182ce",
    disable: "#718096",
  },
  // color palette
  accent: {
    1: "#322659",
    2: "#44337A",
    3: "#553C9A",
    5: "#6B46C1",
    6: "#805AD5",
    7: "#9F7AEA",
    8: "#B794F4",
    9: "#D6BCFA",
    10: "#e9d8fd",
    11: "#FAF5FF",
  },
  // shades of gray
  grays: {
    1: "#1A202C", //800
    2: "#2D3748", // 700
    3: "#4A5568", /// 600
    4: "#718096", // 500
    5: "#A0AEC0", // 400
    6: "#A0AEC0", // 300
    7: "#e2e8f0", // 200
    8: "#edf2f7", // 100
    9: "#f7fafc", // 50
  },
};
export const fonts = {
  heading: `Montserrat, ${base.fonts?.heading}`,
  body: `Inter, ${base.fonts?.body}`,
};
export const breakpoints = {
  xs: "20em", //320px
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em", //1280px
  "2xl": "90em", //1440px
  "3xl": "120em", //1920 - 2400px
};
