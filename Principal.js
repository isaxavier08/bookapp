import React, { useState } from 'react';
import axios from 'axios';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const modalidades = ['Aula / Palestra', 'Estudo em grupo', 'Evento / Workshop'];
const fundamental = ['1º A', '1º B', '2º A', '2º B', '3º A', '3º B', '4º A', '4º B', '5º A', '5º B', '6º A', '6º B', '7º A', '7º B', '8º A', '8º B', '9º A', '9º B'];
const medio = ['1º A', '1º B', '2º A', '2º B', '3º A', '3º B'];

export default function PrincipalScreen({ apiBaseUrl, onNavigateToReservas, onLogout }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [modalidade, setModalidade] = useState(modalidades[0]);
  const [turma, setTurma] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationError, setReservationError] = useState('');

  const selectedTurma = turma ? turma.substring(turma.indexOf('-') + 1) : '';
  const isReservationValid = nome.trim() && email.trim() && data.trim() && horaInicio.trim() && horaFim.trim() && selectedTurma;

  const handleReservationSubmit = async () => {
    if (!isReservationValid || isSubmitting) return;

    setReservationError('');
    setIsSubmitting(true);
    try {
      await axios.post(`${apiBaseUrl}/cadastro_reserva`, {
        nome: nome.trim(),
        email: email.trim(),
        data: data.trim(),
        hora_inicio: horaInicio.trim(),
        hora_fim: horaFim.trim(),
        modalidade,
        turma: selectedTurma,
        observacoes: observacoes.trim(),
      });
      onNavigateToReservas();
    } catch (error) {
      const validationErrors = error.response?.data?.errors;
      const firstValidationError = validationErrors ? Object.values(validationErrors)[0]?.[0] : null;
      setReservationError(firstValidationError || error.response?.data?.message || 'Não foi possível cadastrar a reserva.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#d71920" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onLogout} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.brand}>
          <Text style={styles.sesi}>SESI</Text>
          <Text style={styles.headerTitle}>Biblioteca</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.profileButton}>
          <Ionicons name="person-outline" size={18} color="#ed1c24" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FieldLabel icon="person" text="Nome do professor/solicitante" />
        <TextInput style={styles.input} placeholder="Digite seu nome completo (sem números)" placeholderTextColor="#888" value={nome} onChangeText={setNome} />

        <FieldLabel icon="mail" text="E-mail institucional" />
        <TextInput style={styles.input} placeholder="exemplo@sesi.edu.br" placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <FieldLabel icon="calendar" text="Data" />
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.inputInner} placeholder="dd / mm / aaaa" placeholderTextColor="#888" keyboardType="numeric" value={data} onChangeText={setData} />
          <Ionicons name="calendar-outline" size={17} color="#777" />
        </View>

        <View style={styles.timeRow}>
          <View style={styles.timeColumn}>
            <FieldLabel icon="time" text="Início" />
            <TextInput style={styles.input} placeholder="08:00" placeholderTextColor="#888" keyboardType="numeric" value={horaInicio} onChangeText={setHoraInicio} />
          </View>
          <View style={styles.timeColumn}>
            <FieldLabel icon="time" text="Fim" />
            <TextInput style={styles.input} placeholder="10:00" placeholderTextColor="#888" keyboardType="numeric" value={horaFim} onChangeText={setHoraFim} />
          </View>
        </View>

        <FieldLabel icon="pricetag" text="Modalidade" />
        <View style={styles.optionList}>
          {modalidades.map((item) => (
            <TouchableOpacity key={item} style={styles.option} onPress={() => setModalidade(item)}>
              <Ionicons name={modalidade === item ? 'radio-button-on' : 'radio-button-off'} size={16} color={modalidade === item ? '#d71920' : '#a8a8a8'} />
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FieldLabel icon="people" text="Selecione a Turma" />
        <Text style={styles.instruction}>Clique na turma desejada</Text>
        <Text style={styles.category}>Ensino Fundamental</Text>
        <View style={styles.classes}>
          {fundamental.map((item) => <ClassButton key={`fundamental-${item}`} item={item} selected={turma === `fundamental-${item}`} onPress={() => setTurma(`fundamental-${item}`)} />)}
        </View>
        <Text style={[styles.category, styles.mediumCategory]}>Ensino Médio</Text>
        <View style={styles.classes}>
          {medio.map((item) => <ClassButton key={`medio-${item}`} item={item} medium selected={turma === `medio-${item}`} onPress={() => setTurma(`medio-${item}`)} />)}
        </View>

        <FieldLabel icon="create" text="Observações" />
        <TextInput style={styles.textarea} placeholder="Equipamentos especiais, necessidade de mesa, etc." placeholderTextColor="#888" multiline textAlignVertical="top" value={observacoes} onChangeText={setObservacoes} />
        <TouchableOpacity
          style={[styles.confirmButton, (!isReservationValid || isSubmitting) && styles.disabledButton]}
          disabled={!isReservationValid || isSubmitting}
          onPress={handleReservationSubmit}
        >
          <Text style={styles.confirmText}>{isSubmitting ? 'Cadastrando...' : 'Confirmar Reserva'}</Text>
          <Ionicons name="checkmark-circle" size={17} color="#fff" />
        </TouchableOpacity>
        {reservationError ? <Text style={styles.errorText}>{reservationError}</Text> : null}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.navIconActive]}>
            <Ionicons name="add" size={24} color="#ed1c24" />
          </View>
          <Text style={styles.navActive}>Nova Reserva</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateToReservas}>
          <View style={styles.navIcon}>
            <Ionicons name="clipboard-outline" size={22} color="#555" />
          </View>
          <Text style={styles.navText}>Minhas Reservas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function FieldLabel({ icon, text }) {
  return <Text style={styles.label}><Ionicons name={icon} size={12} color="#d71920" /> {text}</Text>;
}

function ClassButton({ item, selected, onPress, medium }) {
  return (
    <TouchableOpacity style={[styles.classButton, medium && styles.mediumClassButton, selected && (medium ? styles.selectedMediumClassButton : styles.selectedClassButton)]} onPress={onPress}>
      <Text style={[styles.classText, medium && styles.mediumClassText, selected && (medium ? styles.selectedMediumClassText : styles.selectedClassText)]}>{item}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: { height: 62, backgroundColor: '#ed1c24', paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
  menuButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  brand: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  sesi: { color: '#fff', fontSize: 21, fontWeight: '900', fontStyle: 'italic', marginRight: 8 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  profileButton: { backgroundColor: '#fff', borderRadius: 19, width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 18, paddingBottom: 32 },
  label: { color: '#292929', fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 7 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 9, height: 50, paddingHorizontal: 13, color: '#333', fontSize: 15 },
  inputWithIcon: { height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 9, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center' },
  inputInner: { flex: 1, height: 50, color: '#333', fontSize: 15 },
  timeRow: { flexDirection: 'row', gap: 12 },
  timeColumn: { flex: 1 },
  optionList: { gap: 4 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  optionText: { marginLeft: 7, color: '#444', fontSize: 15 },
  instruction: { color: '#777', fontSize: 12, marginBottom: 8 },
  category: { backgroundColor: '#eaf3ff', color: '#1765ad', alignSelf: 'flex-start', borderRadius: 14, paddingHorizontal: 11, paddingVertical: 7, fontSize: 12, fontWeight: '700', marginTop: 7 },
  mediumCategory: { backgroundColor: '#ebf8ed', color: '#21833b', marginTop: 16 },
  classes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  classButton: { minWidth: 48, borderWidth: 1, borderColor: '#b6d4f2', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center', backgroundColor: '#fff' },
  mediumClassButton: { borderColor: '#a8d9b3' },
  selectedClassButton: { backgroundColor: '#dcecff', borderColor: '#72aee8' },
  selectedMediumClassButton: { backgroundColor: '#ddf4e4', borderColor: '#75c38d' },
  classText: { color: '#1765ad', fontSize: 13, fontWeight: '600' },
  mediumClassText: { color: '#21833b' },
  selectedClassText: { color: '#1765ad' },
  selectedMediumClassText: { color: '#21833b' },
  textarea: { minHeight: 120, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 9, padding: 13, color: '#333', fontSize: 15 },
  confirmButton: { backgroundColor: '#d71920', borderRadius: 9, minHeight: 54, marginTop: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  confirmText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  disabledButton: { opacity: 0.55 },
  errorText: { color: '#b3261e', fontSize: 13, marginTop: 10, textAlign: 'center' },
  bottomNav: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e5e5', minHeight: 72, paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 20 : 8, flexDirection: 'row', justifyContent: 'space-around' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  navIcon: { width: 42, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  navIconActive: { backgroundColor: '#fde8e8' },
  navActive: { color: '#ed1c24', fontSize: 11, fontWeight: '800', marginTop: 3 },
  navText: { color: '#555', fontSize: 11, fontWeight: '600', marginTop: 3 },
});
