import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrincipalScreen({ onNavigateToReservas, onLogout }) {
  const [turma, setTurma] = useState('');
  const [data, setData] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [finalidade, setFinalidade] = useState('');
  const [error, setError] = useState('');

  const isFormValid =
    turma.trim() !== '' &&
    data.trim() !== '' &&
    horaInicio.trim() !== '' &&
    horaFim.trim() !== '' &&
    finalidade.trim() !== '';

  const handleContinuar = () => {
    if (!isFormValid) {
      setError('Preencha todos os campos para continuar.');
      return;
    }

    setError('');
    onNavigateToReservas();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C62828" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onLogout}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Reserva</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Turma</Text>
          <TextInput
            style={styles.inputWrapper}
            placeholder="Digite a turma"
            placeholderTextColor="#999"
            value={turma}
            onChangeText={(value) => {
              setTurma(value);
              setError('');
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.inputWrapper}
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#999"
            value={data}
            onChangeText={(value) => {
              setData(value);
              setError('');
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hora início</Text>
          <TextInput
            style={styles.inputWrapper}
            placeholder="08:00"
            placeholderTextColor="#999"
            value={horaInicio}
            onChangeText={(value) => {
              setHoraInicio(value);
              setError('');
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hora fim</Text>
          <TextInput
            style={styles.inputWrapper}
            placeholder="10:00"
            placeholderTextColor="#999"
            value={horaFim}
            onChangeText={(value) => {
              setHoraFim(value);
              setError('');
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Finalidade</Text>
          <TextInput
            style={[styles.inputWrapper, styles.textArea]}
            multiline
            numberOfLines={4}
            placeholder="Descreva a finalidade da reserva"
            placeholderTextColor="#999"
            value={finalidade}
            onChangeText={(value) => {
              setFinalidade(value);
              setError('');
            }}
            textAlignVertical="top"
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.confirmButton, !isFormValid && styles.confirmButtonDisabled]}
          onPress={handleContinuar}
          disabled={!isFormValid}
        >
          <Text style={styles.confirmButtonText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add" size={32} color="#C62828" />
          <Text style={[styles.navText, styles.navTextActive]}>Nova Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToReservas}>
          <Ionicons name="clipboard-outline" size={24} color="#666" />
          <Text style={styles.navText}>Minhas Reservas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#C62828',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#B3261E',
    fontSize: 13,
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: '#C62828',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#C62828',
    fontWeight: 'bold',
  },
});
