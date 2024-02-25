import { styled } from "..";

export const HomeContainer = styled("main",{
  position: "relative",
  display:"flex",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  width: "100%",
  marginLeft: "auto",
})

export const Product = styled("div",{
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflow: "hidden",


  img: {
    objectFit: "cover"
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "1.25rem",

    borderRadius: 6,

    backgroundColor: "rgb(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 1,
    transition: "all 0.2s ease-in-out",

    strong:{
      fontSize: "$lg",
      color: "$gray300"
    },

    span:{
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300"
    },
    
  },

  "&:hover": {
    footer:{
    transform: "translateY(0%)",
    opacity: 1,
    },
  }
})

export const ProductDetails = styled("div",{
  display: 'flex',
  flexDirection: "column",
  gap: "0.5rem"
}
)

export const BaseButton = styled("button", {
  marginTop: "auto",
  border: 0,
  cursor: "pointer",

  height: "25%",
  top: "38%",
  borderRadius: 16,

  width: "10vw",
  minWidth: 80,
  
  position: "absolute",
  zIndex: 3,



  "&:disabled" : {
    display: "none"
  },

})

export const ButtonLeftSlide = styled(BaseButton, {
  background: "linear-gradient(0.25turn, rgb(0, 0, 0, 0.6) 0%, rgb(0, 0, 0, 0.3))",


  "&:not(:disabled):hover": {
    background: "linear-gradient(0.25turn, rgb(0, 0, 0, 0.6) 20%, rgb(0, 0, 0, 0.6))",
  }
})

export const ButtonRightSlide = styled(BaseButton, {
  background: "linear-gradient(0.25turn, rgb(0, 0, 0, 0.3), rgb(0, 0, 0, 0.6) 100%)", 
  right: 0,

  "&:not(:disabled):hover": {
    background: "linear-gradient(0.25turn, rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0.6) 80%)", 
  }
})
