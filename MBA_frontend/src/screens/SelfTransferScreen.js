import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import KeyboardSafeView from '../components/KeyboardSafeView';
import TransactionPayloadFactory from '../services/TransactionPayloadFactory';

const { width } = Dimensions.get('window');

const SelfTransferScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [isUpi, setIsUpi] = useState(false);
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
    
    if (!isUpi && !toAccount) {
      newErrors.toAccount = 'Please select a destination account';
    }
    
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(amount) > 100000) {
      newErrors.amount = 'Amount cannot exceed ₹100,000';
    }
    
    if (isUpi && !upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    }
    
    if (!isUpi && fromAccount && toAccount && fromAccount.id === toAccount.id) {
      newErrors.toAccount = 'Source and destination accounts cannot be the same';
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
      let payload;
      
      if (isUpi) {
        payload = await TransactionPayloadFactory.createUpiPayload(fromAccount, amount, upiId.trim());
        console.log('Sending UPI payload:', payload);
      } else {
        payload = await TransactionPayloadFactory.createSelfTransferPayload(fromAccount, toAccount, amount);
        console.log('Sending self-transfer payload:', payload);
      }
      
      const response = await api.post('/api/transaction', payload);
      console.log('Transfer response:', response.data);
      
      // Clear form
      setFromAccount(null);
      setToAccount(null);
      setAmount('');
      setUpiId('');
      setErrors({});
      
      // Navigate to transaction history
      navigation.navigate('TransactionHistory');
    } catch (error) {
      console.error('Transfer error:', error.response?.data || error.message);
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
          color={fromAccount?.id === item.id ? '#0A3D62' : '#6B7280'} 
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

  const renderToAccount = ({ item }) => (
    <TouchableOpacity
      style={[styles.accountCard, toAccount?.id === item.id && styles.selectedCard]}
      onPress={() => {
        setToAccount(item);
        if (errors.toAccount) setErrors({...errors, toAccount: null});
      }}
    >
      <View style={styles.bankIconContainer}>
        <Ionicons 
          name="card" 
          size={24} 
          color={toAccount?.id === item.id ? '#0A3D62' : '#6B7280'} 
        />
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.bankName}>{item.bankName || 'Unknown Bank'}</Text>
        <Text style={styles.accountNumber}>{item.accountNumber || 'N/A'}</Text>
        <Text style={styles.balance}>₹{(item.balance || 0).toFixed(2)}</Text>
      </View>
      {toAccount?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#0A3D62" />
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#0072ff" barStyle="light-content" />
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Self Transfer</Text>
          <View style={styles.headerRight} />
        </View>

        <KeyboardSafeView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transfer Type</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, !isUpi && styles.activeToggle]}
                onPress={() => {
                  setIsUpi(false);
                  setUpiId('');
                  setErrors({});
                }}
              >
                <Text style={!isUpi ? styles.activeText : styles.inactiveText}>Self Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, isUpi && styles.activeToggle]}
                onPress={() => {
                  setIsUpi(true);
                  setToAccount(null);
                  setErrors({});
                }}
              >
                <Text style={isUpi ? styles.activeText : styles.inactiveText}>UPI</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>From Account</Text>
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

          {!isUpi && fromAccount && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>To Account</Text>
              <FlatList
                data={accounts.filter((acc) => acc.id !== fromAccount.id)}
                renderItem={renderToAccount}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
              {errors.toAccount && <Text style={styles.errorText}>{errors.toAccount}</Text>}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <View style={[styles.inputContainer, errors.amount && styles.inputError]}>
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

          {isUpi && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>UPI ID</Text>
              <View style={[styles.inputContainer, errors.upiId && styles.inputError]}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="e.g., user@upi"
                  value={upiId}
                  onChangeText={(text) => {
                    setUpiId(text);
                    if (errors.upiId) setErrors({...errors, upiId: null});
                  }}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.upiId && <Text style={styles.errorText}>{errors.upiId}</Text>}
            </View>
          )}
        </KeyboardSafeView>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.transferButton, loading && styles.disabledButton]}
            onPress={handleTransfer}
            disabled={loading}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>
              {loading ? 'Processing...' : 'Transfer Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#0072ff',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#6B7280',
    fontWeight: '500',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#0072ff',
    borderWidth: 2,
    backgroundColor: '#f0f7ff',
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
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
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0072ff',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
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
    padding: 20,
    paddingBottom: 20,
  },
  transferButton: {
    backgroundColor: '#0072ff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#0072ff',
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
  },
});

export default SelfTransferScreen;