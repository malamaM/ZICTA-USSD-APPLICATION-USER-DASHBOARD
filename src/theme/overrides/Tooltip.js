// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'white',
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  };
}
