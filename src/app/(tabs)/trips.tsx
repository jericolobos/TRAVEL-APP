import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTrips } from "../../utils/TripContext";
import { TimelineEvent, EventCategory } from "../../types";

// Helper function to map categories to specific icons
const getCategoryIcon = (category: EventCategory) => {
  switch (category) {
    case "flight":
      return "airplane";
    case "lodging":
      return "bed";
    case "dining":
      return "restaurant";
    case "activity":
      return "camera";
    default:
      return "calendar";
  }
};

export default function TripsScreen() {
  const { trips } = useTrips();
  // State to track which trip's timeline is currently being viewed
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    trips[0]?.id || null,
  );

  // Find the full trip object for the currently selected ID
  const activeTrip = trips.find((t) => t.id === selectedTripId);

  // Group the timeline events by day so the SectionList can render headers
  const groupedItinerary = useMemo(() => {
    if (!activeTrip?.itinerary) return [];

    const grouped = activeTrip.itinerary.reduce(
      (acc, event) => {
        const dateString = event.time.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        if (!acc[dateString]) acc[dateString] = [];
        acc[dateString].push(event);
        return acc;
      },
      {} as Record<string, TimelineEvent[]>,
    );

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  }, [activeTrip]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Itinerary</Text>
      </View>

      {/* Horizontal Trip Selector */}
      <View style={styles.selectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorScroll}
        >
          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[
                styles.tripChip,
                selectedTripId === trip.id && styles.activeTripChip,
              ]}
              onPress={() => setSelectedTripId(trip.id)}
            >
              <Text
                style={[
                  styles.tripChipText,
                  selectedTripId === trip.id && styles.activeTripChipText,
                ]}
              >
                {trip.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vertical Timeline */}
      {groupedItinerary.length > 0 ? (
        <SectionList
          sections={groupedItinerary}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.timelineList}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.dateHeaderContainer}>
              <Text style={styles.dateHeader}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.eventRow}>
              {/* Timeline Line & Icon */}
              <View style={styles.timelineVisual}>
                <View style={styles.timelineLine} />
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={getCategoryIcon(item.category)}
                    size={16}
                    color="#fff"
                  />
                </View>
              </View>

              {/* Event Details Card */}
              <View style={styles.eventCard}>
                <Text style={styles.eventTime}>
                  {item.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No events planned yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1a1a1a" },

  // Trip Selector Styles
  selectorContainer: { marginBottom: 16 },
  selectorScroll: { paddingHorizontal: 16, gap: 8 },
  tripChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  activeTripChip: { backgroundColor: "#2f95dc" },
  tripChipText: { fontSize: 14, fontWeight: "600", color: "#555" },
  activeTripChipText: { color: "#fff" },

  // Timeline Styles
  timelineList: { paddingHorizontal: 16, paddingBottom: 24 },
  dateHeaderContainer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  dateHeader: { fontSize: 16, fontWeight: "bold", color: "#333" },
  eventRow: { flexDirection: "row", marginBottom: 16 },

  // The vertical line and icon UI
  timelineVisual: { width: 40, alignItems: "center", marginRight: 12 },
  timelineLine: {
    position: "absolute",
    top: 32,
    bottom: -24,
    width: 2,
    backgroundColor: "#ddd",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2f95dc",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginTop: 4,
  },

  eventCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTime: { fontSize: 14, color: "#666", marginBottom: 4 },
  eventTitle: { fontSize: 16, fontWeight: "600", color: "#333" },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 16, fontSize: 16, color: "#999" },
});
