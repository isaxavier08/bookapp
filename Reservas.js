import React from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const reservas = [];

export default function ReservasScreen({ onGoBack, onLogout }) {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#ed1c24" />
			<View style={styles.header}>
				<TouchableOpacity onPress={onGoBack} style={styles.menuButton}>
					<Ionicons name="menu" size={24} color="#fff" />
				</TouchableOpacity>
				<View style={styles.brand}><Text style={styles.sesi}>SESI</Text><Text style={styles.headerTitle}>Biblioteca</Text></View>
				<TouchableOpacity onPress={onLogout} style={styles.profileButton}><Ionicons name="person-outline" size={18} color="#ed1c24" /></TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.greeting}>Olá, <Text style={styles.greetingName}>Vinicius</Text>!</Text>

				<View style={styles.statsColumn}>
					<Stat icon="calendar-outline" number="0" label="Reservas este mês" tone="red" />
					<Stat icon="checkmark-outline" number="0" label="Reservas confirmadas" tone="green" />
					<Stat icon="time-outline" number="0" label="Reserva pendente" tone="yellow" />
				</View>

				<View style={styles.mainLayout}>
					<View style={styles.reservasPanel}>
						<View style={styles.panelHeading}>
							<Text style={styles.panelTitle}>Próximas Reservas</Text>
							<TouchableOpacity style={styles.seeAll} onPress={() => {}}>
								<Ionicons name="calendar-outline" size={13} color="#ed1c24" />
								<Text style={styles.seeAllText}>Ver todas</Text>
							</TouchableOpacity>
						</View>
						{reservas.length === 0 ? (
							<View style={styles.emptyState}>
								<Ionicons name="calendar-outline" size={34} color="#b8b8b8" />
								<Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
								<Text style={styles.emptyText}>As reservas aparecerão aqui quando forem carregadas pela API.</Text>
							</View>
						) : (
							reservas.map((reserva) => <ReservationCard key={reserva.dia} reserva={reserva} />)
						)}
					</View>

				</View>
			</ScrollView>

			<View style={styles.bottomNav}>
				<TouchableOpacity style={styles.navItem} onPress={onGoBack}>
					<View style={styles.navIcon}><Ionicons name="add" size={24} color="#555" /></View>
					<Text style={styles.navText}>Nova Reserva</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<View style={[styles.navIcon, styles.navIconActive]}><Ionicons name="clipboard" size={22} color="#ed1c24" /></View>
					<Text style={styles.navActive}>Minhas Reservas</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

function Stat({ icon, number, label, tone }) {
	return <View style={styles.stat}><View style={[styles.statIcon, styles[`statIcon${tone}`]]}><Ionicons name={icon} size={25} color={tone === 'red' ? '#e14b4f' : tone === 'green' ? '#19a66b' : '#e59a19'} /></View><View style={styles.statCopy}><Text style={styles.statNumber}>{number}</Text><Text style={styles.statLabel}>{label}</Text></View></View>;
}

function ReservationCard({ reserva }) {
	const confirmed = reserva.status === 'Confirmado';
	return <View style={styles.reservationCard}>
		<View style={styles.reservationTop}>
			<View style={styles.dateBox}><Text style={styles.dateNumber}>{reserva.dia}</Text><Text style={styles.dateMonth}>SET</Text></View>
			<View style={styles.reservationInfo}><Text style={styles.reservationTitle}>{reserva.semana} · {reserva.horario}</Text><Text style={styles.reservationDetail}>Turma: <Text style={styles.bold}>{reserva.turma}</Text></Text><Text style={styles.reservationDetail}>Finalidade: {reserva.finalidade}</Text></View>
		</View>
		<View style={styles.reservationActions}>
			<View style={[styles.statusBadge, confirmed ? styles.confirmedBadge : styles.pendingBadge]}><Text style={[styles.statusText, confirmed ? styles.confirmedText : styles.pendingText]}>{reserva.status}</Text></View>
			<TouchableOpacity style={styles.actionButton}><Ionicons name="checkmark" size={19} color="#fff" /></TouchableOpacity>
			{!confirmed && <TouchableOpacity style={styles.cancelButton}><Ionicons name="close" size={18} color="#fff" /></TouchableOpacity>}
		</View>
	</View>;
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f4f4f4' },
	header: { minHeight: 62, backgroundColor: '#ed1c24', paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
	menuButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
	brand: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
	sesi: { color: '#fff', fontSize: 21, fontWeight: '900', fontStyle: 'italic', marginRight: 8 },
	headerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
	profileButton: { backgroundColor: '#fff', borderRadius: 19, width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
	content: { padding: 18, paddingBottom: 25 },
	greeting: { textAlign: 'center', fontSize: 29, fontWeight: '700', color: '#151515', marginVertical: 15 },
	greetingName: { color: '#ed1c24' },
	statsColumn: { gap: 10, marginBottom: 18 },
	stat: { minHeight: 78, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dedede', borderRadius: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
	statIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
	statIconred: { backgroundColor: '#fff0f0', borderColor: '#f1aaaa' }, statIcongreen: { backgroundColor: '#edfbf3', borderColor: '#9cdbba' }, statIconyellow: { backgroundColor: '#fff8e9', borderColor: '#f1cd72' },
	statCopy: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
	statNumber: { fontSize: 27, fontWeight: '700', color: '#111' },
	statLabel: { fontSize: 15, color: '#222' },
	mainLayout: { gap: 18 },
	reservasPanel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dedede', borderRadius: 17, padding: 18 },
	panelHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
	panelTitle: { fontSize: 21, fontWeight: '800', color: '#151515', flex: 1 },
	seeAll: { borderWidth: 1, borderColor: '#f0b6b8', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
	seeAllText: { color: '#ed1c24', fontWeight: '700', fontSize: 12 },
	emptyState: { alignItems: 'center', paddingVertical: 34, paddingHorizontal: 16 },
	emptyTitle: { color: '#444', fontSize: 16, fontWeight: '700', marginTop: 10 },
	emptyText: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 19 },
	reservationCard: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 14, padding: 14, marginBottom: 12 },
	reservationTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
	dateBox: { width: 59, height: 64, backgroundColor: '#fbe5e5', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
	dateNumber: { color: '#bd3939', fontSize: 21, fontWeight: '800' }, dateMonth: { color: '#bd3939', fontSize: 11, fontWeight: '800' },
	reservationInfo: { flex: 1 }, reservationTitle: { fontSize: 14, fontWeight: '800', color: '#111', marginBottom: 7 }, reservationDetail: { fontSize: 12, color: '#555', marginBottom: 4 }, bold: { fontWeight: '700', color: '#333' },
	reservationActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 14 }, statusBadge: { borderRadius: 9, paddingHorizontal: 14, paddingVertical: 10 }, pendingBadge: { backgroundColor: '#fff1c9' }, confirmedBadge: { backgroundColor: '#d9f6e7' }, statusText: { fontSize: 12, fontWeight: '800' }, pendingText: { color: '#bf850c' }, confirmedText: { color: '#15915e' },
	actionButton: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#32ab78', alignItems: 'center', justifyContent: 'center' }, cancelButton: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#ee5559', alignItems: 'center', justifyContent: 'center' },
	bottomNav: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e3e3e3', minHeight: 72, paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 18 : 8, flexDirection: 'row', justifyContent: 'space-around' },
	navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 }, navIcon: { width: 42, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, navIconActive: { backgroundColor: '#fde8e8' }, navText: { color: '#555', fontSize: 11, fontWeight: '600' }, navActive: { color: '#ed1c24', fontSize: 11, fontWeight: '800' },
});
