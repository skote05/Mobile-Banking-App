// src/screens/AccountsScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  StatusBar,
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation, useIsFocused } from '../../node_modules/@react-navigation/native/lib/typescript/src';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import KeyboardSafeView from '../components/KeyboardSafeView';
import { GlobalStyles, Colors, Typography, Spacing } from '../styles/GlobalStyles';

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBalances, setVisibleBalances] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in storage');
        setError('User session expired. Please login again.');
        return;
      }
      
      const response = await api.get(`/account/user/${userId}`);
      
      if (response.data && Array.isArray(response.data)) {
        setAccounts(response.data);
        const initialVisibility = {};
        response.data.forEach((account) => {
          initialVisibility[account.id] = false;
        });
        setVisibleBalances(initialVisibility);
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      
      if (error.response?.status === 404) {
        setError('No accounts found. Add your first account below.');
        setAccounts([]);
      } else if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        setError('Access denied. Please check your permissions.');
      } else {
        setError('Failed to load accounts. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAccounts();
    }
  }, [isFocused]);

  const toggleBalanceVisibility = (accountId) => {
    setVisibleBalances((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  const renderAccount = ({ item }) => (
    <View style={GlobalStyles.card}>
      <View style={styles.accountHeader}>
        <View style={styles.bankInfo}>
          <Text style={styles.bankName}>{item.bankName || 'Unknown Bank'}</Text>
          <Text style={styles.bankCode}>{item.bankCode || 'N/A'}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => toggleBalanceVisibility(item.id)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={visibleBalances[item.id] ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.accountNumber}>
        Account: {item.accountNumber || 'N/A'}
      </Text>
      
      <View style={GlobalStyles.balanceContainer}>
        <Text style={GlobalStyles.balanceLabel}>Balance:</Text>
        <Text style={GlobalStyles.balanceAmount}>
          {visibleBalances[item.id] 
            ? `₹${(item.balance || 0).toFixed(2)}` 
            : '****'
          }
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={GlobalStyles.emptyContainer}>
      <Ionicons name="card-outline" size={64} color={Colors.textLight} />
      <Text style={GlobalStyles.emptyText}>No Accounts Found</Text>
      <Text style={GlobalStyles.emptySubtext}>
        {error || 'Add your first bank account to get started.'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={GlobalStyles.gradientContainer}>
        <SafeAreaView style={GlobalStyles.safeArea}>
          <StatusBar backgroundColor={Colors.gradientEnd} barStyle="light-content" />
          <View style={GlobalStyles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.textWhite} />
            <Text style={[GlobalStyles.loadingText, { color: Colors.textWhite }]}>Loading accounts...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
          <Text style={GlobalStyles.headerText}>My Accounts</Text>
          <View style={GlobalStyles.headerRight} />
        </View>

        <KeyboardSafeView style={GlobalStyles.content}>
          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Bank Accounts</Text>
            <Text style={GlobalStyles.sectionSubtitle}>
              {accounts.length} account{accounts.length !== 1 ? 's' : ''} found
            </Text>
          </View>
          
          {accounts.length > 0 ? (
            <View style={GlobalStyles.listContainer}>
              {accounts.map((account) => (
                <View key={account.id.toString()} style={GlobalStyles.card}>
                  <View style={styles.accountHeader}>
                    <View style={styles.bankInfo}>
                      <Text style={styles.bankName}>{account.bankName || 'Unknown Bank'}</Text>
                      <Text style={styles.bankCode}>{account.bankCode || 'N/A'}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => toggleBalanceVisibility(account.id)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={visibleBalances[account.id] ? 'eye-off' : 'eye'}
                        size={20}
                        color={Colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.accountNumber}>
                    Account: {account.accountNumber || 'N/A'}
                  </Text>
                  
                  <View style={GlobalStyles.balanceContainer}>
                    <Text style={GlobalStyles.balanceLabel}>Balance:</Text>
                    <Text style={GlobalStyles.balanceAmount}>
                      {visibleBalances[account.id] 
                        ? `₹${(account.balance || 0).toFixed(2)}` 
                        : '****'
                      }
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            renderEmptyState()
          )}
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddAccount')}
          >
            <Ionicons name="add-circle" size={24} color={Colors.textWhite} />
            <Text style={styles.addButtonText}>Add Bank Account</Text>
          </TouchableOpacity>
        </KeyboardSafeView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  bankCode: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  eyeButton: {
    padding: 5,
  },
  accountNumber: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
    fontFamily: 'monospace',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.base,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: Colors.textWhite,
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    marginLeft: Spacing.sm,
  },
};

export default AccountsScreen;