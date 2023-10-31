import { styled } from ".."

export const SuccessContainer = styled('main', {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  margin: "0 auto",

  maxWidth: 1180,
  height: 656,

  h1: {
    fontSize: '$2xl',
    fontWeight: "bold",
    color: "$gray100",

  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    lineHeight: 1.4,

    textAlign: "center",

    display: "block",

    maxWidth: 590,
    width: "100%",

    marginTop: "2rem",
  },

  a:{
    color: '$green500',
    fontWeight: "bold",
    fontSize: '$lg',
    textDecoration: "none",
  
    display: "block",

    marginTop: "5rem",

    "&:hover": {
      color: '$green300',
    }
  }
})

export const ImageContainer = styled('div', {
  width: "100%",
  maxWidth: 130,
  height: 145,

  padding: "0.25rem",
  marginTop: "4rem",

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,


  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  }
})