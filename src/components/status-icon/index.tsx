import { FilterStatus } from "@/@types/filter-status";
import { CircleCheck, CircleDashed } from "lucide-react-native";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status == "done" ? (
    <CircleCheck size={18} color={"#2c46b1"} />
  ) : (
    <CircleDashed size={18} color={"#000"} />
  );
}
