import React, { useState } from 'react';
import axios from 'axios';
import {
	Image,
	KeyboardAvoidingView,
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

export default function CadastroScreen({ apiBaseUrl, onGoToLogin, onCadastroConcluido }) {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [nascimento, setNascimento] = useState('');
	const [cpf, setCpf] = useState('');
	const [showSenha, setShowSenha] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [registrationError, setRegistrationError] = useState('');

	const isValid = nome.trim() && email.trim() && senha.trim() && nascimento.trim() && cpf.trim();

	const handleSubmit = async () => {
		if (!isValid || isSubmitting) return;

		setRegistrationError('');
		setIsSubmitting(true);
		try {
			await axios.post(`${apiBaseUrl}/cadastro_usuario`, {
				nome: nome.trim(),
				email: email.trim(),
				senha,
				nascimento: nascimento.trim(),
				cpf: cpf.trim(),
			});
			onCadastroConcluido();
		} catch (error) {
			const validationErrors = error.response?.data?.errors;
			const firstValidationError = validationErrors ? Object.values(validationErrors)[0]?.[0] : null;
			setRegistrationError(firstValidationError || error.response?.data?.message || 'Não foi possível concluir o cadastro.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#d71526" />
			<KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
				<ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
					<View style={styles.card}>
						<View style={styles.header}>
							<Image source={require('./assets/logo.png')} style={styles.logo} />
							<View style={styles.headerCopy}>
								<Text style={styles.title}>Cadastro de Usuário</Text>
								<Text style={styles.subtitle}>SESI-SP · Crie seu acesso ao sistema</Text>
							</View>
							<View style={styles.headerBadge}>
								<Ionicons name="person-add" size={15} color="#d71526" />
								<Text style={styles.badgeText}>SESI</Text>
							</View>
						</View>

						<View style={styles.form}>
							<FieldLabel icon="person" text="Nome completo" />
							<TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#777" value={nome} onChangeText={setNome} />

							<FieldLabel icon="mail" text="E-mail" />
							<TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#777" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

							<FieldLabel icon="lock-closed" text="Senha" />
							<View style={styles.passwordBox}>
								<TextInput style={styles.passwordInput} placeholder="Crie uma senha" placeholderTextColor="#777" value={senha} onChangeText={setSenha} secureTextEntry={!showSenha} />
								<TouchableOpacity onPress={() => setShowSenha((value) => !value)} style={styles.eyeButton}>
									<Ionicons name={showSenha ? 'eye-off-outline' : 'eye-outline'} size={21} color="#777" />
								</TouchableOpacity>
							</View>

							<View style={styles.row}>
								<View style={styles.birthField}>
									<FieldLabel icon="calendar" text="Nascimento" />
									<TextInput style={styles.input} placeholder="dd/mm/aaaa" placeholderTextColor="#777" value={nascimento} onChangeText={setNascimento} keyboardType="numeric" />
								</View>
								<View style={styles.cpfField}>
									<FieldLabel icon="card" text="CPF" />
									<TextInput style={styles.input} placeholder="Digite o CPF" placeholderTextColor="#777" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
								</View>
							</View>

							<TouchableOpacity style={[styles.registerButton, (!isValid || isSubmitting) && styles.disabledButton]} disabled={!isValid || isSubmitting} onPress={handleSubmit}>
								<Ionicons name="person-add" size={21} color="#fff" />
								<Text style={styles.registerText}>{isSubmitting ? 'Cadastrando...' : 'Cadastrar usuário'}</Text>
							</TouchableOpacity>

							{registrationError ? <Text style={styles.errorText}>{registrationError}</Text> : null}

							<View style={styles.loginRow}>
								<Text style={styles.loginHint}>Já tem uma conta?</Text>
								<Text style={styles.loginLink} onPress={onGoToLogin}>Entre</Text>
							</View>
						</View>

						<View style={styles.securityFooter}>
							<Ionicons name="shield-checkmark-outline" size={18} color="#ef5660" />
							<Text style={styles.securityText}>Seus dados serão tratados com segurança.</Text>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function FieldLabel({ icon, text }) {
	return (
		<View style={styles.labelRow}>
			<Ionicons name={icon} size={14} color="#d71526" />
			<Text style={styles.label}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5eeee' },
	keyboard: { flex: 1 },
	scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 16 },
	card: { width: '100%', maxWidth: 560, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', elevation: 7, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 14, shadowOffset: { width: 0, height: 7 } },
	header: { minHeight: 125, backgroundColor: '#d71526', borderBottomWidth: 5, borderBottomColor: '#f0f0f0', paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' },
	logo: { width: 112, height: 48, resizeMode: 'contain' },
	headerCopy: { flex: 1, marginLeft: 12 },
	title: { color: '#fff', fontSize: 24, fontWeight: '800' },
	subtitle: { color: '#f8c4c8', fontSize: 13, marginTop: 4 },
	headerBadge: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 5 },
	badgeText: { color: '#d71526', fontSize: 11, fontWeight: '800' },
	form: { padding: 20 },
	labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12, marginBottom: 7 },
	label: { color: '#252525', fontSize: 15, fontWeight: '700' },
	input: { height: 54, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 11, paddingHorizontal: 13, color: '#222', fontSize: 16 },
	passwordBox: { height: 54, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 11, flexDirection: 'row', alignItems: 'center', paddingLeft: 13 },
	passwordInput: { flex: 1, height: 52, color: '#222', fontSize: 16 },
	eyeButton: { width: 46, height: 52, alignItems: 'center', justifyContent: 'center' },
	row: { flexDirection: 'row', gap: 12 },
	birthField: { flex: 1 },
	cpfField: { flex: 1 },
	registerButton: { height: 56, marginTop: 26, borderRadius: 11, backgroundColor: '#d71526', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4, shadowColor: '#d71526', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 5 } },
	disabledButton: { opacity: 0.55 },
	registerText: { color: '#fff', fontSize: 17, fontWeight: '800' },
	errorText: { color: '#b3261e', fontSize: 13, marginTop: 12, textAlign: 'center' },
	loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 24 },
	loginHint: { color: '#777', fontSize: 15 },
	loginLink: { color: '#d71526', fontSize: 15, fontWeight: '800' },
	securityFooter: { minHeight: 48, backgroundColor: '#fafbfc', borderTopWidth: 1, borderTopColor: '#e5e5e5', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
	securityText: { color: '#777', fontSize: 13 },
});
