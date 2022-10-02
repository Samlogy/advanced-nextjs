import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { breakpoints, colors, fonts } from "./theme";

const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: "accent.5",
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
    ringColor: "accent.4",
    color: "white",
    backgroundColor: "accent.4",
  },
};

const theme = extendTheme(
  {
    breakpoints,
    colors,
    fonts,
    components: {
      Button: {
        variants: {
          solid: (props: any) => ({
            ...brandRing,
            color: mode("white", "gray.800")(props),
            backgroundColor: mode("accent.5", "accent.7")(props),
            borderRadius: "10px",

            _hover: {
              backgroundColor: mode("accent.6", "accent.6")(props),
            },

            _active: {
              backgroundColor: mode("brand.700", "brand.400")(props),
            },
            _disabled: {
              backgroundColor: mode("gray.400", "gray.300")(props),
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
    colorScheme: "accent",
    components: ["Checkbox"],
  }),
  // define default variant
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);

export default theme;

// styling components: --> input-select-checkbox-radio-textarea / button  --> solid - ghost - outline
