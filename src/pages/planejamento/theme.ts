import { ptBR as MaterialLocale } from "@mui/material/locale"
import { createTheme } from "@mui/material/styles"
import { ptBR as DataGridLocale } from "@mui/x-data-grid"

export const theme = createTheme(
  {
    palette: {
      
      primary: {
        main: '#365711'
      },
      success: {
        main: '#4caf50'
      }
    },
  },
  DataGridLocale,
  MaterialLocale
)
