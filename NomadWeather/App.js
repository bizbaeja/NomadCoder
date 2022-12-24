import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "8a4d9b4faf273b1024f10e9c8d2086ec";
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [errorMsg, setErrorMsg] = useState(null);
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    console.log(response);

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  let text = "Waiting..";

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        indicatorStyle="white"
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days?.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days?.length > 0 &&
          days?.map((days, index) => (
            <View key={index} style={styles.day}>
              <Text>{text}</Text>
              <Text style={styles.temp}>
                {parseFloat(days.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.desc}>{days.weather[0].main}</Text>

              <Text style={styles.tinyText}>{days.weather[0].description}</Text>
              <Text>{Math.ceil(daily?.temp.max)}°</Text>
            </View>
          ))
        )}
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
  tinyText: {
    fontSize: 20,
  },
});
