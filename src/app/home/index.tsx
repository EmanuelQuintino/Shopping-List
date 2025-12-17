import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Filter } from "@/components/filter";
import { styles } from "./styles";
import { Item } from "@/components/item";

export function Home() {
  const data = Array.from({ length: 20 }).map((_, index) => ({
    status: index % 2 === 0 ? ("done" as const) : ("pending" as const),
    description: `Produto ${index + 1}`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image source={require("@/images/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input title="Adicionar produto" placeholder="Adicionar produto" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Filter status={"done"} isActive />
          <Filter status={"pending"} isActive={false} />

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.text}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.description}
          renderItem={({ item }) => <Item data={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={() => <Text style={styles.empty}>Lista vazia!</Text>}
        />
      </View>
    </View>
  );
}
