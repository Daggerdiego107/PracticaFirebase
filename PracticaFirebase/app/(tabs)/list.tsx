import { Ionicons } from '@expo/vector-icons'; // Paquete de iconos
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStudentController } from '../../controllers/useStudentController';

export default function ListScreen() {
  // Importamos deleteStudent del controlador
  const { students, deleteStudent } = useStudentController();

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id || Math.random().toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Lado Izquierdo: Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.matricula}>{item.matricula}</Text>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.semestre}>Semestre: {item.semestre}</Text>
            </View>

            {/* Lado Derecho: Botón Borrar */}
            <TouchableOpacity 
              onPress={() => item.id && deleteStudent(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay registros aún.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  itemContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#eee', 
    marginHorizontal: 5 
  },
  infoContainer: {
    flex: 1,
  },
  matricula: { fontSize: 14, color: '#007AFF', fontWeight: 'bold' },
  nombre: { fontSize: 16, color: '#333', marginTop: 2 },
  semestre: { fontSize: 12, color: '#666', marginTop: 2 },
  
  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});