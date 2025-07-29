import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import KeyboardSafeView from '../components/KeyboardSafeView';
import { GlobalStyles, Colors, Typography, Spacing } from '../styles/GlobalStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    dob: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('Fetched userId:', userId);

        if (!userId) {
          console.error('No userId found');
          setLoading(false);
          return;
        }

        const response = await api.get(`/user/${userId}`);
        console.log('User data response:', response.data);
        setUserDetails(response.data);

        try {
          const accountResponse = await api.get(`/account/user/${userId}`);
          console.log('Account data response:', accountResponse.data);
          setAccounts(accountResponse.data || []);
        } catch (accountErr) {
          if (accountErr.response && accountErr.response.status === 404) {
            console.log('No accounts found for user:', userId);
            setAccounts([]);
          } else {
            throw accountErr;
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderDetail = (label, value) => (
    <View style={GlobalStyles.detailRow}>
      <Text style={GlobalStyles.detailLabel}>{label}:</Text>
      <Text style={GlobalStyles.detailValue}>{value || 'N/A'}</Text>
    </View>
  );

  const renderAccount = ({ item, index }) => (
    <View style={GlobalStyles.accountCard}>
      <View style={GlobalStyles.iconContainer}>
        <Ionicons name="card" size={24} color={Colors.primary} />
      </View>
      <View style={GlobalStyles.accountInfo}>
        <Text style={GlobalStyles.bankName}>{item.bankName || 'Unknown Bank'}</Text>
        <Text style={GlobalStyles.accountNumber}>A/C: {item.accountNumber || 'N/A'}</Text>
        <Text style={[GlobalStyles.balanceAmount, { marginTop: Spacing.xs }]}>
          ₹{(item.balance || 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );

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
          <Text style={GlobalStyles.headerText}>Profile</Text>
          <View style={GlobalStyles.headerRight} />
        </View>

        <KeyboardSafeView style={GlobalStyles.content}>
          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={GlobalStyles.listContainer}>
            {renderDetail('Name', userDetails.name)}
            {renderDetail('Email', userDetails.email)}
            {renderDetail('Contact Number', userDetails.contactNumber)}
            {renderDetail('Address', userDetails.address)}
            {renderDetail('Date of Birth', userDetails.dob ? userDetails.dob.toString() : 'N/A')}
          </View>

          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Language Settings</Text>
            <View style={GlobalStyles.inputContainer}>
              <Text style={GlobalStyles.label}>Language:</Text>
              <View style={GlobalStyles.languageOptions}>
                <TouchableOpacity
                  style={[
                    GlobalStyles.languageOption,
                    language === 'en' && GlobalStyles.selectedLanguage
                  ]}
                  onPress={() => setLanguage('en')}
                >
                  <Text style={[
                    GlobalStyles.languageText,
                    language === 'en' && GlobalStyles.selectedLanguageText
                  ]}>
                    English
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    GlobalStyles.languageOption,
                    language === 'kn' && GlobalStyles.selectedLanguage
                  ]}
                  onPress={() => setLanguage('kn')}
                >
                  <Text style={[
                    GlobalStyles.languageText,
                    language === 'kn' && GlobalStyles.selectedLanguageText
                  ]}>
                    Kannada
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    GlobalStyles.languageOption,
                    language === 'hi' && GlobalStyles.selectedLanguage
                  ]}
                  onPress={() => setLanguage('hi')}
                >
                  <Text style={[
                    GlobalStyles.languageText,
                    language === 'hi' && GlobalStyles.selectedLanguageText
                  ]}>
                    Hindi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Your Bank Accounts</Text>
            {loading ? (
              <View style={GlobalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={GlobalStyles.loadingText}>Loading accounts...</Text>
              </View>
            ) : accounts.length > 0 ? (
              <View style={GlobalStyles.listContainer}>
                {accounts.map((account, index) => (
                  <View key={`${account.id}-${index}`} style={GlobalStyles.accountCard}>
                    <View style={GlobalStyles.iconContainer}>
                      <Ionicons name="card" size={24} color={Colors.primary} />
                    </View>
                    <View style={GlobalStyles.accountInfo}>
                      <Text style={GlobalStyles.bankName}>{account.bankName || 'Unknown Bank'}</Text>
                      <Text style={GlobalStyles.accountNumber}>A/C: {account.accountNumber || 'N/A'}</Text>
                      <Text style={[GlobalStyles.balanceAmount, { marginTop: Spacing.xs }]}>
                        ₹{(account.balance || 0).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={GlobalStyles.emptyContainer}>
                <Ionicons name="card-outline" size={48} color={Colors.textLight} />
                <Text style={GlobalStyles.emptyText}>No accounts found</Text>
                <Text style={GlobalStyles.emptySubtext}>Add your first bank account to get started</Text>
              </View>
            )}
          </View>
        </KeyboardSafeView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;