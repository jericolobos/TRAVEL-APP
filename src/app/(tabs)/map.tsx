import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Location } from "../../types";
import CustomMarker from "../../components/CustomMarker"; // Import the new component

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
        initialRegion={{
          latitude: 10.3157,
          longitude: 123.8854,
          latitudeDelta: 25.0,
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
          >
            {/* Placing the custom component inside the Marker overwrites the default pin */}
            <CustomMarker />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
