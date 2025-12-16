import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image source={require("@/images/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input title="Adicionar tarefa" placeholder="Adicionar tarefa" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}></View>
    </View>
  );
}
