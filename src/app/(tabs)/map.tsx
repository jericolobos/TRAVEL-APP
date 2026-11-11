import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTrips } from "../../utils/TripContext"; // Import the global state hook
import CustomMarker from "../../components/CustomMarker";

export default function MapScreen() {
  const { trips } = useTrips(); // Pull the live data

  // Filter the trips to only include those that have coordinates attached
  const mappableTrips = trips.filter((trip) => trip.location !== undefined);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.3157, // Centers the map roughly on Cebu initially
          longitude: 123.8854,
          latitudeDelta: 25.0,
          longitudeDelta: 25.0,
        }}
      >
        {/* Render a marker for every trip that has a location */}
        {mappableTrips.map((trip) => (
          <Marker
            key={trip.id}
            coordinate={{
              latitude: trip.location!.latitude,
              longitude: trip.location!.longitude,
            }}
            title={trip.title} // Uses the trip title for the map pop-up
            description={trip.location!.name} // Uses the specific place name for the subtitle
          >
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
