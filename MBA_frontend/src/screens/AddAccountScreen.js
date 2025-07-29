import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import KeyboardSafeView from '../components/KeyboardSafeView';

const AddAccountScreen = ({ route }) => {
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { message } = route.params || {};

  const validateForm = () => {
    const newErrors = {};
    
    if (!bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!bankCode.trim()) {
      newErrors.bankCode = 'Bank code is required';
    }
    
    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (accountNumber.length < 10) {
      newErrors.accountNumber = 'Account number must be at least 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const payload = {
        bankName: bankName.trim(),
        bankCode: bankCode.trim(),
        accountNumber: accountNumber.trim(),
        user: { id: parseInt(userId) },
      };

      const response = await api.post('/account/add', payload);
      console.log('Account added:', response.data);
      
      // Clear form
      setBankName('');
      setBankCode('');
      setAccountNumber('');
      setErrors({});
      
      // Navigate back
      navigation.goBack();
    } catch (error) {
      console.error('Error adding account:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Failed to add account. Please try again.';
      console.error('Account creation error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
      <LinearGradient colors={['#4c669f', '#3b5998']} style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add New Account</Text>
      </LinearGradient>

      <KeyboardSafeView contentContainerStyle={styles.container}>
        {message && <Text style={styles.message}>{message}</Text>}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            placeholder="Enter bank name"
            value={bankName}
            onChangeText={(text) => {
              setBankName(text);
              if (errors.bankName) setErrors({...errors, bankName: null});
            }}
            style={[styles.input, errors.bankName && styles.inputError]}
            placeholderTextColor="#888"
          />
          {errors.bankName && <Text style={styles.errorText}>{errors.bankName}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Code</Text>
          <TextInput
            placeholder="Enter bank code"
            value={bankCode}
            onChangeText={(text) => {
              setBankCode(text);
              if (errors.bankCode) setErrors({...errors, bankCode: null});
            }}
            style={[styles.input, errors.bankCode && styles.inputError]}
            placeholderTextColor="#888"
          />
          {errors.bankCode && <Text style={styles.errorText}>{errors.bankCode}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            placeholder="Enter account number"
            value={accountNumber}
            onChangeText={(text) => {
              setAccountNumber(text);
              if (errors.accountNumber) setErrors({...errors, accountNumber: null});
            }}
            style={[styles.input, errors.accountNumber && styles.inputError]}
            placeholderTextColor="#888"
            keyboardType="number-pad"
          />
          {errors.accountNumber && <Text style={styles.errorText}>{errors.accountNumber}</Text>}
        </View>

        <TouchableOpacity
          onPress={handleAddAccount}
          disabled={isLoading || !bankName.trim() || !bankCode.trim() || !accountNumber.trim()}
          style={[
            styles.button,
            { opacity: (isLoading || !bankName.trim() || !bankCode.trim() || !accountNumber.trim()) ? 0.6 : 1 },
          ]}
        >
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Adding Account...' : 'Add Account'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardSafeView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  backButton: {
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },
  message: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default AddAccountScreen;
