import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d2d8",
    alignItems: "center",
    paddingTop: 76,
  },

  logo: {
    height: 34,
    width: 134,
  },

  form: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 42,
    gap: 8,
  },

  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e6ec",
    paddingBottom: 12,
  },

  button: {
    marginLeft: "auto",
  },

  text: {
    color: "#828282",
    fontSize: 12,
    fontWeight: 600,
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e6ec",
  },

  empty: {
    fontSize: 14,
    fontFamily: "System",
    marginTop: "50%",
    textAlign: "center",
    color: "#808080",
  },
});
