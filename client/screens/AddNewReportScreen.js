import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Image, Dimensions, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddNewReportScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempWeather, setTempWeather] = useState('');
  const [statusComments, setStatusComments] = useState('');
  const [sitePhotos, setSitePhotos] = useState([]);
  const [observations, setObservations] = useState([]);
  const navigation = useNavigation();
  const { project } = useRoute().params;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Hide picker on Android after selection
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios'); // Hide picker on Android after selection
    setTime(currentTime);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSitePhotos(prevPhotos => [...prevPhotos, { uri: result.assets[0].uri }]);
    }
  };

  const handleAddObservation = () => {
    navigation.navigate('AddObservation', { project, report: { date, time, tempWeather, statusComments, sitePhotos, observations } });
  };

  const handleSubmit = () => {
    if (date && time && tempWeather && statusComments) {
      navigation.navigate('ProjectDetails', {
        newReport: {
          id: Date.now(),
          date: date.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
          time: time.toTimeString().slice(0, 5), // Format time as HH:MM
          tempWeather,
          statusComments,
          sitePhotos,
          observations
        },
      });
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />

      <Text style={styles.label}>Time</Text>

      
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      
      <Text style={styles.label}>Temp/Weather</Text>
      <TextInput 
        style={styles.input} 
        value={tempWeather} 
        onChangeText={setTempWeather} 
      />
      <Text style={styles.label}>Status Comments</Text>
      <TextInput 
        style={styles.inputMultiline}
        multiline={true}
        numberOfLines={4}
        value={statusComments} 
        onChangeText={setStatusComments} 
      />

      <Text style={styles.label}>Site Photographs</Text>
      <Button title="Add Photo" onPress={pickImage} />
      <FlatList 
        data={sitePhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.label}>Observations</Text>
      <Button title="Add Observation" onPress={handleAddObservation} />
      {/* Here you might show a list of observations if any were added */}

      <Button title="Add Report" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputMultiline: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddNewReportScreen;