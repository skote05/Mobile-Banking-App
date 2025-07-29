import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSafeView from '../components/KeyboardSafeView';
import TransactionPayloadFactory from '../services/TransactionPayloadFactory';

const TransferToOthersScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setIsLoadingAccounts(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      const response = await api.get(`/account/user/${userId}`);
      console.log('Fetched accounts:', response.data);
      setAccounts(response.data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!fromAccount) {
      newErrors.fromAccount = 'Please select a source account';
    }
    
    if (!toAccountNumber.trim()) {
      newErrors.toAccountNumber = 'Recipient account number is required';
    } else if (toAccountNumber.trim().length < 10) {
      newErrors.toAccountNumber = 'Account number must be at least 10 digits';
    }
    
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(amount) > 100000) {
      newErrors.amount = 'Amount cannot exceed ₹100,000';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // First, try to find the recipient account
      let toAccountId = null;
      try {
        const toAccountResponse = await api.get(`/api/account/${toAccountNumber.trim()}/id`);
        toAccountId = toAccountResponse.data;
        console.log('Found recipient account ID:', toAccountId);
      } catch (accountError) {
        console.error('Account lookup error:', accountError);
        if (accountError.response?.status === 404) {
          console.error('Recipient account not found');
          setErrors({ toAccountNumber: 'Recipient account not found. Please check the account number.' });
          return;
        } else {
          console.error('Account lookup failed:', accountError.message);
          setErrors({ toAccountNumber: 'Unable to verify recipient account. Please try again.' });
          return;
        }
      }

      const payload = await TransactionPayloadFactory.createTransferToOthersPayload(
        fromAccount, 
        toAccountNumber.trim(), 
        amount
      );
      console.log('Sending transfer payload:', payload);
      
      const response = await api.post('/api/transaction', payload);
      console.log('Transfer response:', response.data);
      
      // Clear form
      setFromAccount(null);
      setToAccountNumber('');
      setAmount('');
      setErrors({});
      
      // Navigate to transaction history
      navigation.navigate('TransactionHistory');
    } catch (error) {
      console.error('Transfer error details:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status',
        url: error.response ? error.response.config.url : 'No URL',
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Transfer failed. Please try again.';
      console.error('Transfer failed:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderFromAccount = ({ item }) => (
    <TouchableOpacity
      style={[styles.accountCard, fromAccount?.id === item.id && styles.selectedCard]}
      onPress={() => {
        setFromAccount(item);
        if (errors.fromAccount) setErrors({...errors, fromAccount: null});
      }}
    >
      <View style={styles.bankIconContainer}>
        <Ionicons 
          name="card" 
          size={24} 
          color={fromAccount?.id === item.id ? "#0A3D62" : "#6B7280"} 
        />
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.bankName}>{item.bankName || 'Unknown Bank'}</Text>
        <Text style={styles.accountNumber}>{item.accountNumber || 'N/A'}</Text>
        <Text style={styles.balance}>₹{(item.balance || 0).toFixed(2)}</Text>
      </View>
      {fromAccount?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#0A3D62" />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer to Others</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Send Money</Text>
          <Text style={styles.pageSubtitle}>Transfer to external accounts</Text>
        </View>
      
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>From Account</Text>
          {isLoadingAccounts ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading accounts...</Text>
            </View>
          ) : accounts.length > 0 ? (
            <FlatList
              data={accounts}
              renderItem={renderFromAccount}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No accounts available</Text>
            </View>
          )}
          {errors.fromAccount && <Text style={styles.errorText}>{errors.fromAccount}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Recipient Account</Text>
          <View style={[styles.inputContainer, errors.toAccountNumber && styles.inputError]}>
            <Ionicons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter recipient account number"
              value={toAccountNumber}
              onChangeText={(text) => {
                setToAccountNumber(text);
                if (errors.toAccountNumber) setErrors({...errors, toAccountNumber: null});
              }}
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>
          {errors.toAccountNumber && <Text style={styles.errorText}>{errors.toAccountNumber}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <View style={[styles.amountInputContainer, errors.amount && styles.inputError]}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                if (errors.amount) setErrors({...errors, amount: null});
              }}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.transferButton, loading && styles.disabledButton]} 
          onPress={handleTransfer}
          disabled={loading}
        >
          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Transfer Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A3D62',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    borderColor: '#0A3D62',
    borderWidth: 2,
    backgroundColor: '#F0F7FF',
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  accountNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  balance: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 56,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    height: '100%',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 60,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A3D62',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    color: '#111827',
    height: '100%',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  transferButton: {
    backgroundColor: '#0A3D62',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#0A3D62',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  }
});

export default TransferToOthersScreen;