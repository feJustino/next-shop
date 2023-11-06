import { styled } from "..";

export const HomeContainer = styled("main",{
  position: "relative",
  display:"flex",
    maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  width: "100%",
  marginLeft: "auto",
  minHeight: 656,
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
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,
    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgb(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
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

export const BaseButton = styled("button", {
  marginTop: "auto",
  border: 0,
  cursor: "pointer",
  minHeight: "100%",
  width: 136,
  position: "absolute",
  zIndex: 3,



  "&:disabled" : {
    display: "none"
  },

})

export const ButtonLeftSlide = styled(BaseButton, {
  background: "linear-gradient(0.25turn, #121214 0%, transparent)",


  "&:not(:disabled):hover": {
    background: "linear-gradient(0.25turn, #121214 20%, transparent)",
  }
})

export const ButtonRightSlide = styled(BaseButton, {
  background: "linear-gradient(0.25turn, transparent, #121214 100%)", 
  right: -1,

  "&:not(:disabled):hover": {
    background: "linear-gradient(0.25turn, transparent, #121214 80%)", 
  }
})
