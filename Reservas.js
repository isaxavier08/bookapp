import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RESERVAS = [
  {
    id: '1',
    dataHorario: '22/05/2025 • 08:00 - 10:00',
    turma: '1º Ano A',
    finalidade: 'Aula de pesquisa',
    status: 'Confirmada',
  },
  {
    id: '2',
    dataHorario: '24/05/2025 • 14:00 - 16:00',
    turma: '2º Ano B',
    finalidade: 'Trabalho em grupo',
    status: 'Confirmada',
  },
  {
    id: '3',
    dataHorario: '27/05/2025 • 10:00 - 12:00',
    turma: '3º Ano C',
    finalidade: 'Leitura orientada',
    status: 'Pendente',
  },
  {
    id: '4',
    dataHorario: '30/05/2025 • 09:00 - 11:00',
    turma: '1º Ano B',
    finalidade: 'Apresentação de trabalhos',
    status: 'Confirmada',
  },
];

export default function ReservasScreen({ onGoBack, onLogout }) {
  const [activeTab, setActiveTab] = useState('Todas');

  const reservasFiltradas = RESERVAS.filter((reserva) => {
    if (activeTab === 'Confirmadas') return reserva.status === 'Confirmada';
    if (activeTab === 'Pendentes') return reserva.status === 'Pendente';
    return true;
  });

  const renderItem = ({ item }) => {
    const isConfirmada = item.status === 'Confirmada';

    return (
      <View style={styles.card}>
        <Text style={styles.cardDate}>{item.dataHorario}</Text>
        <Text style={styles.cardClass}>{item.turma}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPurpose}>{item.finalidade}</Text>
          <View
            style={[
              styles.statusBadge,
              isConfirmada ? styles.bgConfirmada : styles.bgPendente,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isConfirmada ? styles.textConfirmada : styles.textPendente,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C62828" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Reservas</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {['Todas', 'Confirmadas', 'Pendentes'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={reservasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onGoBack}>
          <Ionicons name="add-circle-outline" size={24} color="#666" />
          <Text style={styles.navText}>Nova Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#C62828" />
          <Text style={[styles.navText, styles.navTextActive]}>Minhas Reservas</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    borderColor: '#C62828',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#C62828',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardClass: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPurpose: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  bgConfirmada: {
    backgroundColor: '#E8F5E9',
  },
  bgPendente: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textConfirmada: {
    color: '#2E7D32',
  },
  textPendente: {
    color: '#F57F17',
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
