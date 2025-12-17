import { FilterStatus } from "@/@types/filter-status";
import { ItemData } from "@/@types/item-data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORAGE_KEY = "@shopping_list:items";

async function get(): Promise<ItemData[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    const items: ItemData[] = storage ? JSON.parse(storage) : [];
    return items;
  } catch (error) {
    throw new Error("GET_ITEMS_STORAGE: " + error);
  }
}

async function save(items: ItemData[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS_STORAGE: " + error);
  }
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("CLEAR_ITEMS_STORAGE: " + error);
  }
}

export const itemsStorage = {
  get,
  save,
  clear,
};
