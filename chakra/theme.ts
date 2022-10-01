import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: "brand.500",
        },
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: "none",
      },
    },
  },
};

const brandRing = {
  _focus: {
    ring: 2,
    ringColor: "brand.500",
  },
};

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

export const breakpoints = createBreakpoints({
  xs: "20em", //320px
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em", //1280px
  "2xl": "90em", //1440px
  "3xl": "120em", //1920 - 2400px
});
function createBreakpoints(arg0: {
  xs: "20em";
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}) {
  throw new Error("Function not implemented.");
}

const theme = extendTheme(
  {
    colors,
    fonts,
    components: {
      Button: {
        variants: {
          primary: (props: any) => ({
            rounded: "none",
            ...brandRing,
            color: mode("white", "gray.800")(props),
            backgroundColor: mode("brand.500", "brand.200")(props),

            _hover: {
              backgroundColor: mode("brand.600", "brand.300")(props),
            },

            _active: {
              backgroundColor: mode("brand.700", "brand.400")(props),
            },
          }),
        },
      },
      Input: { ...inputSelectStyles },
      Select: { ...inputSelectStyles },
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: "none",
            ...brandRing,
          },
        },
      },
    },
  },
  // define default color scheme
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Checkbox"],
  }),
  // define default variant
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);

export default theme;

// style most used cpts with --> components (variants - ...)
