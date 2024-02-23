import { styled } from "../../styles"

export const IconButton = styled('div', {
  position: 'relative',
  borderRadius: 8,
  width: "3rem",
  height: "3rem",

  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  variants: {
    color: {
      gray: {
        backgroundColor: '$gray800',
      },
      green: {
        backgroundColor: '$green500',
      }
    }
  }
})

export const QuantityCircle = styled('span', {
  position: 'absolute',

  borderRadius: "100%",
  border: "$gray900 solid 0.5rem",

  width: "2.5rem",
  height: "2.5rem",

  textAlign: "center",
  lineHeight: "1.5rem",


  right: "-1.25rem",
  top: "-1.25rem",

  backgroundColor: "$green500"
})