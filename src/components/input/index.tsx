import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type ButtonProps = TextInputProps & {
  title: string;
};

export function Input({ ...rest }: ButtonProps) {
  return <TextInput style={styles.input} placeholderTextColor={"#808080"} {...rest} />;
}
