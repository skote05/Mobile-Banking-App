import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useNavigation } from '../../node_modules/@react-navigation/native/lib/typescript/src';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSafeView from '../components/KeyboardSafeView';
import api from '../services/api';
import { GlobalStyles, Colors, Typography, Spacing } from '../styles/GlobalStyles';

const BillPaymentScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [rrNumber, setRrNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await api.get(`/account/user/${userId}`);
          if (response.data && response.data.length > 0) {
            setAccounts(response.data);
            setSelectedAccount(response.data[0].accountNumber);
          }
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handlePay = async () => {
    if (!selectedOption || !amount || parseFloat(amount) <= 0 || !selectedAccount) {
      Alert.alert('Error', 'Please select a bill type, enter a valid amount, and choose an account');
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const payload = {
        userId: parseInt(userId),
        fromAccountNumber: selectedAccount,
        toAccountNumber: null,
        amount: parseFloat(amount),
        transactionType: 'BILL_PAYMENT',
        billingType: selectedOption,
        ...(selectedOption === 'ELECTRICITY' && { customerId }),
        ...(selectedOption === 'RENT' && { propertyName }),
        ...(selectedOption === 'WATER' && { rrNumber }),
      };
      console.log('Sending bill payment payload:', payload);
      const response = await api.post('/api/transaction', payload);
      console.log('Bill payment response:', response.data);
      Alert.alert('Success', response.data);
      navigation.navigate('TransactionHistory');
    } catch (error) {
      console.error('Bill payment error:', error.response ? error.response.data : error.message);
      Alert.alert('Alert', error.response?.data?.message || 'Insufficient balance');
    } finally {
      setLoading(false);
    }
  };

  const billOptions = [
    { id: 'ELECTRICITY', title: 'Electricity Bill', icon: 'flash-outline', color: '#f39c12' },
    { id: 'RENT', title: 'Rent', icon: 'home-outline', color: '#3498db' },
    { id: 'WATER', title: 'Water Bill', icon: 'water-outline', color: '#3498db' },
  ];

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={GlobalStyles.gradientContainer}>
      <SafeAreaView style={GlobalStyles.safeArea}>
        <StatusBar backgroundColor={Colors.gradientEnd} barStyle="light-content" />
        
        <View style={GlobalStyles.header}>
          <TouchableOpacity 
            style={GlobalStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textWhite} />
          </TouchableOpacity>
          <Text style={GlobalStyles.headerText}>Bill Payment</Text>
          <View style={GlobalStyles.headerRight} />
        </View>

        <KeyboardSafeView style={GlobalStyles.content}>
          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Select Bill Type</Text>
            <Text style={GlobalStyles.sectionSubtitle}>Choose the type of bill you want to pay</Text>
          </View>

          <View style={styles.optionsContainer}>
            {billOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedOption === option.id && styles.selectedOptionCard
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                  <Ionicons name={option.icon} size={24} color={Colors.textWhite} />
                </View>
                <Text style={[
                  styles.optionText,
                  selectedOption === option.id && styles.selectedOptionText
                ]}>
                  {option.title}
                </Text>
                {selectedOption === option.id && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedOption && (
            <View style={styles.paymentForm}>
              <View style={GlobalStyles.section}>
                <Text style={GlobalStyles.sectionTitle}>Payment Details</Text>
              </View>

              <View style={GlobalStyles.inputContainer}>
                <Text style={GlobalStyles.label}>Select Account</Text>
                <View style={GlobalStyles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedAccount}
                    onValueChange={(itemValue) => setSelectedAccount(itemValue)}
                    style={GlobalStyles.picker}
                  >
                    {accounts.map((account) => (
                      <Picker.Item
                        key={account.accountNumber}
                        label={`${account.accountNumber} - ${account.bankName}`}
                        value={account.accountNumber}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {selectedOption === 'ELECTRICITY' && (
                <View style={GlobalStyles.inputContainer}>
                  <Text style={GlobalStyles.label}>Customer ID</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChangeText={setCustomerId}
                  />
                </View>
              )}

              {selectedOption === 'RENT' && (
                <View style={GlobalStyles.inputContainer}>
                  <Text style={GlobalStyles.label}>Property Name</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="Enter Property Name"
                    value={propertyName}
                    onChangeText={setPropertyName}
                  />
                </View>
              )}

              {selectedOption === 'WATER' && (
                <View style={GlobalStyles.inputContainer}>
                  <Text style={GlobalStyles.label}>RR Number</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="Enter RR Number"
                    value={rrNumber}
                    onChangeText={setRrNumber}
                  />
                </View>
              )}

              <View style={GlobalStyles.inputContainer}>
                <Text style={GlobalStyles.label}>Amount</Text>
                <TextInput
                  style={GlobalStyles.input}
                  placeholder="Enter Amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity 
                style={[GlobalStyles.button, loading && GlobalStyles.buttonDisabled]} 
                onPress={handlePay}
                disabled={loading}
              >
                <Ionicons name="card-outline" size={20} color={Colors.textWhite} />
                <Text style={GlobalStyles.buttonText}>
                  {loading ? 'Processing...' : 'Pay Bill'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardSafeView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  optionsContainer: {
    marginBottom: Spacing['2xl'],
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOptionCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: '#f0f7ff',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  optionText: {
    flex: 1,
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  paymentForm: {
    marginTop: Spacing.sm,
  },
};

export default BillPaymentScreen;