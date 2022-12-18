import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH);
export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        indicatorStyle="white"
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>-4</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>-4</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>-4</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>-4</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCA805",
  },
  city: {
    flex: 1,
    backgroundColor: "#FCA805",
    justifyContent: "center",
    alignItems: "center",
    color: "#0E432C",
  },
  cityName: {
    fontSize: 56,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  desc: {
    marginTop: -30,
    fontSize: 60,
  },
});
