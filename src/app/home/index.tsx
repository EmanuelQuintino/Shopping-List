import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Filter } from "@/components/filter";
import { styles } from "./styles";
import { Item } from "@/components/item";
import { useEffect, useState } from "react";
import { FilterStatus } from "@/@types/filter-status";
import { ItemData } from "@/@types/item-data";
import { itemsStorage } from "@/libs/async-storage";

export function Home() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([] as ItemData[]);

  const filteredItems = items.filter((item) => item.status == filterStatus);

  async function loadItems() {
    try {
      const storedItems = await itemsStorage.get();
      setItems(storedItems);
    } catch (error) {
      Alert.alert("Erro!", "Não foi possível carregar os itens da lista.");
      console.error(error);
    }
  }

  async function handleSaveItem() {
    if (description.trim().length == 0) {
      Alert.alert("Erro!", "Descrição do produto não pode ser vazia.");
      return;
    }

    const newItem = {
      id: new Date().getTime().toString(),
      status: "pending" as const,
      description: description.trim(),
    };

    try {
      await itemsStorage.save([newItem, ...items]);
      await loadItems();

      setFilterStatus("pending");
      setDescription("");
    } catch (error) {
      Alert.alert("Erro!", "Não foi possível salvar os itens da lista.");
      console.error(error);
    }
  }

  async function handleRemoveItem(id: string) {
    const filteredItems = items.filter((item) => item.id != id);

    try {
      await itemsStorage.save(filteredItems);
      await loadItems();

      Alert.alert("Removido com sucesso!", "Item" + id + " removido da lista.");
    } catch (error) {
      Alert.alert("Erro!", "Não foi possível remover o item da lista.");
      console.error(error);
    }
  }

  async function handleToggleItem(id: string) {
    const updatedItems = items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          status: item.status == "pending" ? ("done" as const) : ("pending" as const),
        };
      } else {
        return item;
      }
    });

    try {
      await itemsStorage.save(updatedItems);
      await loadItems();
    } catch (error) {
      Alert.alert("Erro!", "Não foi possível atualizar o item da lista.");
      console.error(error);
    }
  }

  async function onClearItems() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      Alert.alert("Limpar", "Não foi possível limpar a lista.");
    }
  }

  function handleClearItems() {
    Alert.alert("Confirmação", "Deseja realmente limpar a lista?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: onClearItems },
    ]);
  }

  useEffect(() => {
    loadItems();
  }, [filterStatus]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image source={require("@/images/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          title="Adicionar produto"
          placeholder="Adicionar produto"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleSaveItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Filter
            status={"pending"}
            isActive={filterStatus == "pending"}
            onPress={() => setFilterStatus("pending")}
          />

          <Filter
            status={"done"}
            isActive={filterStatus == "done"}
            onPress={() => setFilterStatus("done")}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleClearItems}
          >
            <Text style={styles.text}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onDelete={() => handleRemoveItem(item.id)}
              onToggleStatus={() => handleToggleItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={() => <Text style={styles.empty}>Lista vazia!</Text>}
        />
      </View>
    </View>
  );
}
