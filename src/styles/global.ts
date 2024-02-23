import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",


    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: 8,
      backgroundColor: "$gray800"
    },
    
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 8,
      backgroundColor: "$gray300"
    }
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100'
  },


  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  }
})