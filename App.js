import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const [selectedRestaurantLocation, setSelectedRestaurantLocation] = useState({
    latitude: 35.0,
    longitude: 34.0,
  });

  const handleCitySelect = (value) => {
    setSelectedCity(value);
    setSelectedZone('');
    setSelectedRestaurant('');
  };

  const handleZoneSelect = (value) => {
    setSelectedZone(value);
    setSelectedRestaurant('');
  };

  const handleRestaurantSelect = (value) => {
    setSelectedRestaurant(value);
    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.id === value
    );
    if (selectedRestaurant) {
      setSelectedRestaurantLocation({
        latitude: selectedRestaurant.location.lat,
        longitude: selectedRestaurant.location.lng,
      });
    }
  };

  useEffect(() => {
    if (selectedCity && selectedZone) {
      const startIndex = (selectedZone - 1) * 20;
      const endIndex = selectedZone * 20;
      axios
        .get(`https://data-hazel-six.vercel.app/restaurants/${selectedCity}`)
        .then((res) => {
          setRestaurants(res.data.slice(startIndex, endIndex));
          setItems3(
            res.data.slice(startIndex, endIndex).map((restaurant) => ({
              label: restaurant.title,
              value: restaurant.id,
              key: restaurant.id, // Add a unique key for each item
            }))
          );
        });
    }
  }, [selectedCity, selectedZone]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const [items, setItems] = useState([
    { label: 'Select a city', value: '', key: '0' }, // Add unique keys to the items
    { label: 'Casablanca', value: 'Casablanca', key: '1' },
    { label: 'Tanger', value: 'Tanger', key: '2' },
    { label: 'El Jadida', value: 'El Jadida', key: '3' },
  ]);

  const [items2, setItems2] = useState([
    { label: 'Select a zone', value: '', key: '0' }, // Add unique keys to the items
    { label: 'Zone 1', value: '1', key: '1' },
    { label: 'Zone 2', value: '2', key: '2' },
    { label: 'Zone 3', value: '3', key: '3' },
    { label: 'Zone 4', value: '    4', key: '4' },
  ]);

  const [items3, setItems3] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a city</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        defaultValue={selectedCity}
        onChangeValue={(value) => handleCitySelect(value)}
        containerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Select a zone</Text>
      <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        defaultValue={selectedZone}
        onChangeValue={(value) => handleZoneSelect(value)}
        containerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Select a restaurant</Text>
      <DropDownPicker
        open={open3}
        value={value3}
        items={items3}
        setOpen={setOpen3}
        setValue={setValue3}
        setItems={setItems3}
        onChangeValue={(value) => handleRestaurantSelect(value)}
        defaultValue={selectedRestaurant}
        containerStyle={styles.dropdownContainer}
      />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: selectedRestaurantLocation.latitude,
            longitude: selectedRestaurantLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedRestaurantLocation.latitude !== 35.0 && (
            <Marker
              coordinate={{
                latitude: selectedRestaurantLocation.latitude,
                longitude: selectedRestaurantLocation.longitude,
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  dropdownContainer: {
    marginBottom: 50,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

