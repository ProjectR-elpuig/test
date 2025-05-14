import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  fontFamily: 'Poppins',
  components: {
    Paper: {
      defaultProps: {
        style: { border: '#25262B 1px solid' },
      },
    },
  },
};
