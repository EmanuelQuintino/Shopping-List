import { Text, View, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { styles } from "./styles";
import { StatusIcon } from "../status-icon";
import { FilterStatus } from "@/@types/filter-status";

type Props = {
  data: {
    status: FilterStatus;
    description: string;
  };

  onDelete?: () => void;
  onToggleStatus?: () => void;
};

export function Item({ data, onDelete, onToggleStatus }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity activeOpacity={0.8} onPress={onToggleStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onDelete}>
        <Trash2 size={18} color={"#828282"} />
      </TouchableOpacity>
    </View>
  );
}
