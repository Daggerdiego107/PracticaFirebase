import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStudentController } from '../../controllers/useStudentController';

export default function CaptureScreen() {
  const { saveStudent, loading } = useStudentController();
  
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');

  const handlePress = async () => {
    const success = await saveStudent(matricula, nombre, semestre);
    if (success) {
      setMatricula('');
      setNombre('');
      setSemestre('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nuevo Alumno</Text>

        <Text style={styles.label}>Matrícula</Text>
        <TextInput 
          style={styles.input} 
          value={matricula} 
          onChangeText={setMatricula}
          placeholder="A0..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Nombre</Text>
        <TextInput 
          style={styles.input} 
          value={nombre} 
          onChangeText={setNombre}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Semestre</Text>
        <TextInput 
          style={styles.input} 
          value={semestre} 
          onChangeText={setSemestre}
          keyboardType="numeric"
          placeholder="1 - 9"
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>GRABAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2', justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: '600' },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});