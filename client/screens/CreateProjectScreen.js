import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateProjectScreen = () => {
  const [projectNumber, setProjectNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [contractor, setContractor] = useState('');
  const [inspectionFirm, setInspectionFirm] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (projectNumber && projectName && projectLocation && contractor && inspectionFirm) {
      // Here we would save the project to the backend, but for now, we'll just navigate back
      navigation.navigate('ProjectList', {
        newProject: {
          id: parseInt(projectNumber), // Assuming project number is unique and can act as an ID
          name: projectName,
          location: projectLocation,
          contractor: contractor,
          inspectionFirm: inspectionFirm,
        },
      });
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project #</Text>
      <TextInput 
        style={styles.input} 
        value={projectNumber} 
        onChangeText={setProjectNumber} 
        keyboardType="numeric"
      />
      <Text style={styles.label}>Project Name</Text>
      <TextInput 
        style={styles.input} 
        value={projectName} 
        onChangeText={setProjectName} 
      />
      <Text style={styles.label}>Project Location</Text>
      <TextInput 
        style={styles.input} 
        value={projectLocation} 
        onChangeText={setProjectLocation} 
      />
      <Text style={styles.label}>General Contractor/Site Contact</Text>
      <TextInput 
        style={styles.input} 
        value={contractor} 
        onChangeText={setContractor} 
      />
      <Text style={styles.label}>Inspection Firm</Text>
      <TextInput 
        style={styles.input} 
        value={inspectionFirm} 
        onChangeText={setInspectionFirm} 
      />
      <Button title="Create Project" onPress={handleSubmit} />
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
});

export default CreateProjectScreen;