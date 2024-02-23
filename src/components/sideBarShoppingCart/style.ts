import { styled } from "../../styles";

const SideBarBase = styled("div", {
  transition: "all 0.2s ease-in-out",
  variants: {
    open: {
      true: {
        transform: "translateX(0)",
      },
      false: {
        transform: "translateX(100%)",
      }
    }
   }
})

export const SideBarCover = styled(SideBarBase, {
  position: "fixed",
  zIndex: 98,
  top: 0,

  minHeight: "100vh",
  minWidth: "100vw",

  backgroundColor: "$gray800",
  opacity: "65%",
})

export const SideBarContainer = styled(SideBarBase, {
  position: "fixed",
  zIndex: 99,
  margin: "0 ",

  overflow: "auto",

  height: "100vh",
  width: "100vw",
  maxWidth: 480,

  right: 0,
  top: 0,

  backgroundColor: "$gray800",

  display: "grid",
  gridTemplateRows: "0fr 1fr 0fr",
  alignItems: 'stretch',

  padding: "3rem",

  h3: {
    marginTop: "1.5rem"
  },

  footer: {
    marginTop: "2rem",

    p: {
      boxSizing: "border-box"      
    },

    button: {
      marginTop: "3.5rem",
      backgroundColor: "$green500",
      border: 0,
      color: "$white",
      fontSize: "$md",
      fontWeight: "bold",
      borderRadius: 8,
      padding: "1.25rem",
      cursor: "pointer",
      width: "100%",
  
      "&:hover": {
        backgroundColor: "$green300",
      },
  
      "&:disabled" : {
        opacity: 0.6,
        cursor: 'not-allowed'
      },
  
      "&:not(:disabled):hover": {
        backgroundColor: "$green300",
      },
    }
  }

})

export const CloseButton = styled("button", {
  position: "fixed",
  top: "24px",
  right: "24px",

  backgroundColor: "transparent",


  border: 0,
  maxWidth: 24,
  maxHeight: 24,

  cursor: "pointer"
})

export const ItensWrapper = styled("ol", {
  overflowY: "auto",
  overflowX: "hidden",
  minHeight: 150
})

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 102,
  height: 94,
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

export const ItemWrapper = styled("li", {
  display: "flex",
  gap: "1.25rem",
  marginTop: "2rem"
})

export const ItemDetailsWrapper= styled("div", {

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  h4: {
    fontSize: "$md",
    color: "$gray300",
    fontWeight: "normal"
  },
  
  p: {
    fontSize: "$md",
    color: "$gray300",
    fontWeight: 'bold'
  },

  button:{
    color: '$green500',
    fontWeight: "bold",
    fontSize: '$md',
    backgroundColor: "transparent",
    border: "none",
    textAlign: "start",
  
    display: "block",

    "&:hover": {
      color: '$green300',
    }
  }
})

export const PurchasesSummary = styled('div', {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.5rem",
  fontSize: "$md",

  variants:{
    firstText: {
      down: {
        ":first-child": {
          fontSize: "16px"
        }
      }
    },

    lastText: {
      up: {
        ":last-child": {
          fontSize: "$xl"
        }
      }
    }
  }
})