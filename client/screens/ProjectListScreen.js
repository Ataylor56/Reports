import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectListScreen = ({ route }) => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Here we simulate fetching projects from a DB, but we're just using local state
    if (route.params?.newProject) {
      setProjects(prevProjects => [...prevProjects, route.params.newProject]);
      // Clear the newProject from route.params to avoid re-adding on component refresh
      navigation.setParams({ newProject: undefined });
    }
  }, [route.params]);

  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
  };

  const handleProjectPress = (project) => {
    navigation.navigate('ProjectDetails', { project });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects List</Text>
      <FlatList 
        data={projects}
        renderItem={({ item }) => (
          <Button 
            title={`${item.name} - ${item.location}`} 
            onPress={() => handleProjectPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Create New Project" onPress={handleCreateProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProjectListScreen;