// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#000000',
          backgroundColor: '#838c9c',
          '&:hover': {
            color: 'blue',
          }
        },
      },
    },
  };
}
