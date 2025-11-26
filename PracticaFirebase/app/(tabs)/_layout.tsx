import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index" // Esto apunta a index.tsx (Captura)
        options={{
          title: 'Captura',
          headerTitle: 'Practica Firebase',
          tabBarIcon: ({ color }) => <Ionicons name="create" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="list" // Esto apunta a list.tsx (Lista)
        options={{
          title: 'Consultas',
          headerTitle: 'Base de Datos',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}