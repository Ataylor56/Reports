import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const AddObservationScreen = () => {
  const [detailReference, setDetailReference] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [observationType, setObservationType] = useState('');
  const [requiredAction, setRequiredAction] = useState('');
  const [observationPhotos, setObservationPhotos] = useState([]);
  const navigation = useNavigation();
  const { project, report } = useRoute().params;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Observation', value: 'Observation' },
    { label: 'Deviation', value: 'Deviation' },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("Starting to pick image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("Image Picker Result:", result);
    
    if (!result.canceled) {
      setObservationPhotos(prevPhotos => [...prevPhotos, { uri: result.assets[0].uri, caption: '' }]);
      console.log("Added new photo:", result.assets[0].uri);
    } else {
      console.log("Image selection was canceled");
    }
  };

  const handleSubmit = () => {
    if (detailReference && location && description && observationType && requiredAction) {
      const newObservation = {
        id: Date.now(),
        detailReference,
        location,
        description,
        observationType,
        requiredAction,
        photos: observationPhotos // Now includes photos with potential captions
      };
      navigation.navigate('AddNewReport', {
        ...report,
        observations: [...report.observations, newObservation]
      });
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Detail Reference</Text>
      <TextInput 
        style={styles.input} 
        value={detailReference} 
        onChangeText={setDetailReference} 
      />
      <Text style={styles.label}>Location</Text>
      <TextInput 
        style={styles.input} 
        value={location} 
        onChangeText={setLocation} 
      />
      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={styles.inputMultiline}
        multiline={true}
        numberOfLines={4}
        value={description} 
        onChangeText={setDescription} 
      />
      <Text style={styles.label}>Observation Type</Text>
      <DropDownPicker
        open={open}
        value={observationType}
        items={items}
        setOpen={setOpen}
        setValue={setObservationType}
        setItems={setItems}
        style={styles.input}
        dropDownContainerStyle={{ height: 100 }} // adjust height as needed
      />
      <Text style={styles.label}>Required Action</Text>
      <TextInput 
        style={styles.inputMultiline}
        multiline={true}
        numberOfLines={4}
        value={requiredAction} 
        onChangeText={setRequiredAction} 
      />

      <Text style={styles.label}>Observation Photos</Text>
      <Button title="Add Photo" onPress={pickImage} />
      <FlatList 
        data={observationPhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, resizeMode: 'cover' }} />
            <TextInput 
              style={styles.captionInput}
              placeholder="Caption"
              value={item.caption}
              onChangeText={(text) => {
                const newPhotos = [...observationPhotos];
                const index = observationPhotos.findIndex(photo => photo.uri === item.uri);
                newPhotos[index] = { ...newPhotos[index], caption: text };
                setObservationPhotos(newPhotos);
              }}
            />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Button title="Add Observation" onPress={handleSubmit} />
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
  imageContainer: {
    marginRight: 10,
  },
  captionInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 5,
  },
});

export default AddObservationScreen;