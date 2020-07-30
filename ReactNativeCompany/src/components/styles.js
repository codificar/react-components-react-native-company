import { StyleSheet } from "react-native";
// #2196f3
export default StyleSheet.create({
  textTab1: primaryColor => ({
    width: 28,
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
    marginTop: -10,
  }),
  buttonRegister: color => ({
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    width: window.width,
    alignItems: "center",
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    backgroundColor: color,
  }),
  
  container: {
    flex: 1,
  },
  contSec: {
    flexDirection: "row",
    width: window.width,
    //flex: 1
  },
  tabTitle: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  contTitlePage: {
    alignItems: "center",
  },
  titlePage: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionInputs: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  authSectionInputs: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 30,
  },  
  txtButtonRegister: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  NoButtonRegister: {
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    width: window.width,
    alignItems: "center",
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    backgroundColor: "#DCDCDC",
  },
  NoTxtButtonRegister: {
    color: "black",
    fontWeight: "bold",
  },

  authTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  docAuthContainer: {
    padding: 3,       
  },
  docAuthLabelContainer: {
    flex: 1,
    flexDirection: "row"     
  },
  docAuthUploadArea: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
  },
  docNameLabel: {
    paddingTop: 32,
    paddingLeft: 10,
  },
  docAuthUploadButton: {
    backgroundColor: "#2196f3",
    borderRadius: 5,
  },

  formLabel: {
    color: "#6c757d",
  },
  defaultInputStyle: {
    width: "100%",
    height: 40,
    marginBottom: 8,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    color: "#343a40",
  },
});
