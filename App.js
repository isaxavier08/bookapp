import axios from 'axios';
//import asyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import PrincipalScreen from './Principal';
import ReservasScreen from './Reservas';
import CadastroScreen from './cadastro';

const API_BASE_URL = 'http://10.0.2.2:8000';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('login');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screen !== 'loading') return;

    const timer = setTimeout(() => setScreen('reservas'), 1800);
    return () => clearTimeout(timer);
  }, [screen]);

  const isLoginValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isLoginValid) return;

    setLoginError('');
    try {
      await axios.post(`${API_BASE_URL}/login`, {
        email: email.trim(),
        password,
      });
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Não foi possível entrar. Verifique seus dados.');
      return;
    }

    setScreen('loading');
  };

  const handleCadastro = () => {
    setScreen('cadastro');
  };

  const handleCadastroConcluido = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setScreen('login');
  };

  if (showSplash) {
    return (
      <View style={styles.splashScreen}>
        <StatusBar style="light" />
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
    );
  }

  if (screen === 'loading') {
    return (
      <View style={styles.splashScreen}>
        <StatusBar style="light" />
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
    );
  }

  if (screen === 'principal') {
    return (
      <PrincipalScreen
        apiBaseUrl={API_BASE_URL}
        onNavigateToReservas={() => setScreen('reservas')}
        onLogout={() => {
          setEmail('');
          setPassword('');
          setScreen('login');
        }}
      />
    );
  }

  if (screen === 'reservas') {
    return (
      <ReservasScreen
        onGoBack={() => setScreen('principal')}
        onLogout={() => {
          setEmail('');
          setPassword('');
          setScreen('login');
        }}
      />
    );
  }

  if (screen === 'cadastro') {
    return <CadastroScreen apiBaseUrl={API_BASE_URL} onGoToLogin={() => setScreen('login')} onCadastroConcluido={handleCadastroConcluido} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.loginCard}>
        <View style={styles.loginHeader}>
          <Image source={require('./assets/logo.png')} style={styles.headerLogo} />
          <View style={styles.headerCopy}>
            <Text style={styles.welcomeTitle}>Bem-vindo</Text>
            <Text style={styles.welcomeSubtitle}>Acesse o sistema de reservas</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="seu@email.com"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.helperText}>Insira suas credenciais para acessar o sistema.</Text>

          <Text style={styles.fieldLabel}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#777"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeText}>{showPassword ? '◉' : '◌'}</Text>
            </Pressable>
          </View>

          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe((prev) => !prev)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkboxMark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Lembrar de mim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !isLoginValid && styles.buttonDisabled]}
            activeOpacity={isLoginValid ? 0.9 : 1}
            onPress={handleLogin}
            disabled={!isLoginValid}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {!isLoginValid && (
            <Text style={styles.validationText}>
              Preencha e-mail e senha para continuar.
            </Text>
          )}

          {loginError ? <Text style={styles.validationText}>{loginError}</Text> : null}

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Ainda não possui uma conta?</Text>
            <Text style={styles.footerLink} onPress={handleCadastro}>Cadastre-se</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashScreen: {
    flex: 1,
    backgroundColor: '#e1172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 120,
    resizeMode: 'contain',
  },
  loginCard: { width: '92%', maxWidth: 540, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 7 },
  loginHeader: { minHeight: 125, backgroundColor: '#d71526', paddingHorizontal: 24, paddingVertical: 22, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#f1f1f1' },
  headerLogo: { width: 122, height: 48, resizeMode: 'contain' },
  headerCopy: { flex: 1, marginLeft: 13 },
  welcomeTitle: { color: '#fff', fontSize: 27, fontWeight: '800' },
  welcomeSubtitle: { color: '#f9c5c8', fontSize: 15, marginTop: 4 },
  formCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  fieldLabel: { color: '#262626', fontSize: 17, fontWeight: '700', marginBottom: 9, marginTop: 12 },
  loginInput: {
    width: '100%',
    height: 58,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 17,
    color: '#222',
  },
  helperText: { color: '#777', fontSize: 14, marginTop: 10, marginBottom: 14 },
  passwordContainer: { width: '100%', height: 58, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingLeft: 14 },
  passwordInput: { flex: 1, height: 56, fontSize: 17, color: '#222' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 26 },
  checkbox: { width: 21, height: 21, borderWidth: 1, borderColor: '#d5dce3', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#d71526', borderColor: '#d71526' },
  checkboxMark: { color: '#fff', fontSize: 15, fontWeight: '700' },
  rememberText: { color: '#666', fontSize: 16, marginLeft: 10 },
  inputContainer: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  eyeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeText: {
    fontSize: 18,
    color: '#9d1c2d',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#d71526',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    shadowColor: '#d71526',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  validationText: {
    marginTop: 10,
    color: '#b3261e',
    fontSize: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#e1172a',
    fontWeight: '600',
    textAlign: 'center',
  },
  footerRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  footerLink: {
    fontSize: 16,
    color: '#d71526',
    fontWeight: '600',
    textAlign: 'center',
  },
});
