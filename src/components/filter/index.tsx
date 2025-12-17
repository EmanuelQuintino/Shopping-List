import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FilterStatus } from "@/@types/filter-status";
import { styles } from "./styles";
import { StatusIcon } from "../status-icon";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.5}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>{status == "done" ? "Comprados" : "Pendentes"}</Text>
    </TouchableOpacity>
  );
}
