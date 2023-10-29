import { styled } from "..";

export const ProductContainer = styled('main', {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: 'stretch',
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto"
})

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  }
})

export const ProductDetails = styled("div", {

  display: "flex",
  flexDirection: "column",

  h1: {
    color: "$gray300",
    fontWeight: "bold",
    fontSize: "$2xl"
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: '$green300',
    fontWeight: "bold",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300"
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    fontSize: "$md",
    fontWeight: "bold",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "$green300",
    }
  }
})