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

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('login');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screen !== 'loading') return;

    const timer = setTimeout(() => setScreen('principal'), 1800);
    return () => clearTimeout(timer);
  }, [screen]);

  const isLoginValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    if (!isLoginValid) return;
    setScreen('loading');
  };

  const handleCadastro = () => {
    setScreen('loading');
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

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.phoneShell}>
        <View style={styles.logoWrap}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.title}>Bem-vindo(a)!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#8a8a8a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8a8a8a"
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

          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>

          <Text style={styles.footerText}>
            Não tem conta?{' '}
            <Text style={styles.footerLink} onPress={handleCadastro}>Cadastre-se</Text>
          </Text>
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
  logoWrap: {
    height: 190,
    backgroundColor: '#e1172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  logo: {
    width: 320,
    height: 120,
  },
  phoneShell: {
    width: 370,
    height: 760,
    backgroundColor: '#f7f7f7',
    borderRadius: 38,
    paddingTop: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 28,
    paddingTop: 22,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#676767',
    marginBottom: 22,
  },
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
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#9d1c2d',
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: '#222',
    paddingVertical: 0,
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
    marginTop: 6,
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
    marginTop: 8,
    color: '#b3261e',
    fontSize: 12,
    textAlign: 'center',
  },
  forgotText: {
    marginTop: 18,
    fontSize: 15,
    color: '#9d1c2d',
    textAlign: 'center',
  },
  footerText: {
    marginTop: 26,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  footerLink: {
    color: '#d71526',
    fontWeight: '700',
  },
});
