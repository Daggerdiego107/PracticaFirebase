import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Student, StudentModel } from '../models/StudentModel';

export const useStudentController = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = StudentModel.subscribe((data) => {
      setStudents(data);
    });
    return () => unsubscribe();
  }, []);

  const saveStudent = async (matricula: string, nombre: string, semestre: string) => {
    if (!matricula.trim() || !nombre.trim() || !semestre.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }
    const semestreNum = parseInt(semestre);
    if (isNaN(semestreNum)) {
      Alert.alert("Error", "El semestre debe ser un número");
      return false;
    }

    setLoading(true);
    const result = await StudentModel.add({ matricula, nombre, semestre: semestreNum });
    setLoading(false);

    if (result.success) {
      Alert.alert("Éxito", "Guardado correctamente");
      return true;
    } else {
      Alert.alert("Error", "No se pudo guardar");
      return false;
    }
  };

  // NUEVA FUNCIÓN DE BORRADO
  const deleteStudent = (id: string) => {
    Alert.alert(
      "Eliminar Alumno",
      "¿Estás seguro que quieres eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: 'destructive',
          onPress: async () => {
            const result = await StudentModel.remove(id);
            if (!result.success) {
              Alert.alert("Error", "No se pudo eliminar el registro");
            }
          }
        }
      ]
    );
  };

  return {
    students,
    saveStudent,
    deleteStudent, // Exportamos la nueva función
    loading
  };
};