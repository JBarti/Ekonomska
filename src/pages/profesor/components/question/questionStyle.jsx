import zIndex from "@material-ui/core/styles/zIndex";

var answerStyle = {
  position: "relative",
  flexGrow: 0.5,
  display: "flex",
  flexDirection: "row",
  paddingLeft: 60,
  marginRight: 40,
  paddingBottom: 20,
  paddingTop: 20,
  alignItems: "center",
  borderBottom: "1px white solid",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  backgroundPosition: "center",
  transition: "background 0.5s",
  "&:last-child": {
    borderBottom: "none"
  }
};

export default theme => ({
  radioGroup: {
    paddingLeft: 12,
    marginTop: 8
  },
  root: {
    height: "90%",
    width: "100%",
    marginLeft: -25,
    zIndex: 10000,
    marginTop: 10
  },
  card: {
    flexDirection: "row",
    zIndex: 10000
  },
  questionCard: {
    width: "100%",
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  questionText: {
    fontSize: 25,
    width: "70%",
    textAlign: "center"
  },
  answerCard: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex"
  },
  answerContainer: {
    width: "100%",
    height: "calc(100% - 142.5px)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 50
  },
  questionNumber: {
    fontSize: 25,
    width: "fit-content",
    paddingLeft: 5,
    paddingRight: 5,
    borderBottom: "2px red solid",
    color: theme.palette.secondary.light,
    borderBottomColor: theme.palette.secondary.light,
    paddingBottom: 5,
    marginTop: 40
  },
  timer: {
    marginTop: 60,
    marginBottom: -25
  },
  time: {
    position: "relative",
    top: "-50%",
    left: "+25%",
    fontSize: 70,
    color: theme.palette.grey[700]
  },
  selection: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    width: "80%"
  },
  radio: {
    margin: "auto"
  },
  answer: {
    width: "100%",
    background: "linear-gradient(160deg, #C33764 0%, #252E73 100%)",
    borderRadius: 10,
    color: theme.palette.grey[100],
    "&:-moz-any(div)": answerStyle,

    "&:hover": {},
    "&:active": {}
  },
  answerSelected: {
    "&:-moz-any(div)": answerStyle,
    boxShadow: theme.shadows[1],
    backgroundColor: "white",

    "&:last-child": {
      borderBottom: "none"
    },
    "& > h1:first-child": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
      boxShadow: "none"
    },
    "& > h1:last-child": {
      color: theme.palette.secondary.light
    }
  },
  answerInput: {
    width: "100%",
    color: theme.palette.grey[100]
  },
  answerNum: {
    fontSize: 22,
    backgroundColor: "white",
    borderRadius: 900,
    width: 33,
    height: 33,
    padding: "4px 3px 0 3px",
    textAlign: "center",
    color: theme.palette.secondary.light,
    boxShadow: theme.shadows[2],
    userSelect: "none"
  },
  answerText: {
    fontSize: 20,
    color: "white",
    paddingTop: 5,
    textAlign: "center",
    marginLeft: 20,
    letterSpacing: 1,
    fontWeight: 500,
    userSelect: "none"
  },
  answerNavbar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row"
  },
  answerNavButton: {
    flexGrow: 1,
    color: "white",
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 0,
    marginRight: 1,
    paddingTop: 15,
    paddingBottom: 15,
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.secondary.light
    }
  },
  answerOverlay: {
    marginLeft: -60,
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
