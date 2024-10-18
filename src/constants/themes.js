export const theme = {
    name: 'button-theme',
    tokens: {
      colors: {
        border: {
          primary: { value: 'black' },
        },
      },
      components: {
        button: {
          fontWeight: { value: '{fontWeights.extrabold}' },
          backgroundColor: { value: '#f1fff5' },
          borderColor: { value: '{colors.purple.80}' },
          color: { value: '{colors.purple.100}' },
          outlined: {
            info: {
              borderColor: '{colors.purple.60}',
              color: '{colors.purple.90}',
            },
          },
          primary: {
            backgroundColor: { value: '{colors.blue.60}' },
            _hover: {
              backgroundColor: { value: '{colors.blue.80}' },
            },
            _focus: {
              backgroundColor: { value: '{colors.blue.80}' },
            },
            _active: {
              backgroundColor: { value: '{colors.blue.90}' },
            },
            _disabled: {
              backgroundColor: { value: 'transparent' },
              borderColor: { value: '{colors.neutral.30}' },
            },
            error: {
              backgroundColor: { value: '{colors.pink.10}' },
              color: { value: '{colors.red.80}' },
              _hover: {
                backgroundColor: { value: '#a51b34' },
              },
              _focus: {
                backgroundColor: { value: '#9a0c26' },
              },
              _active: {
                backgroundColor: { value: '#9a0c26' },
              },
            },
          },
        },
      },
    },
  };