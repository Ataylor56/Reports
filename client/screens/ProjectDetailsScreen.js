import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProjectDetailsScreen = ({ route }) => {
  const { project } = route.params;
  const navigation = useNavigation();
  const [reports, setReports] = useState(route.params.reports || []);

  // This will run when a new report is added from AddNewReportScreen
  React.useEffect(() => {
    if (route.params?.newReport) {
      setReports(prevReports => [...prevReports, route.params.newReport]);
      navigation.setParams({ newReport: undefined }); // Clear the newReport from params
    }
  }, [route.params]);

  const handleAddReport = () => {
    navigation.navigate('AddNewReport', { project });
  };

  const handleViewReport = (report) => {
    navigation.navigate('ReportDetails', { project, report });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      <Text>Project Number: {project.id}</Text>
      <Text>Location: {project.location}</Text>
      <Text>Contractor: {project.contractor}</Text>
      <Text>Inspection Firm: {project.inspectionFirm}</Text>

      <Text style={styles.sectionTitle}>Reports:</Text>
      {reports.map(report => (
        <Button 
          key={report.id} 
          title={`${report.date} - ${report.statusComments.slice(0, 20)}...`} 
          onPress={() => handleViewReport(report)}
        />
      ))}
      <Button title="Add New Report" onPress={handleAddReport} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ProjectDetailsScreen;