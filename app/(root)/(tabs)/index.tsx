import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/sign-in">
      <Text className="text-lg py-2">signin</Text>
      </Link>
      <Link href="/explore">
      <Text className="text-lg py-2">explore</Text>
      </Link>
      <Link href="/profile">
      <Text className="text-lg py-2">profile</Text>
      </Link>

    </View>
  );
}
