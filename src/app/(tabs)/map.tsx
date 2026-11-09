import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Location } from "../../types";

// Mock data to test our map markers
const SAVED_LOCATIONS: Location[] = [
  { name: "Kiyomizu-dera Temple", latitude: 34.9948, longitude: 135.785 },
  { name: "El Nido, Palawan", latitude: 11.1784, longitude: 119.3956 },
  { name: "Cebu City Basecamp", latitude: 10.3157, longitude: 123.8854 },
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion dictates where the camera starts and how zoomed in it is
        initialRegion={{
          latitude: 10.3157,
          longitude: 123.8854,
          latitudeDelta: 25.0, // A larger delta means a wider, zoomed-out view
          longitudeDelta: 25.0,
        }}
      >
        {SAVED_LOCATIONS.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description="Saved trip location"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the whole tab screen
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
