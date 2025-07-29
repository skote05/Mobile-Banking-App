import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, Typography, Spacing } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };
    fetchData();
  }, []);

  const quickActions = useMemo(() => [
    { 
      id: '1', 
      title: 'Transfer', 
      icon: 'swap-horizontal-outline', 
      color: '#0c2461', 
      onPress: () => navigation.navigate('FundTransfer') 
    },
    { 
      id: '2', 
      title: 'QR Pay', 
      icon: 'qr-code-outline', 
      color: '#0c2461', 
      onPress: () => navigation.navigate('ScanQR') 
    },
    { 
      id: '3', 
      title: 'Accounts', 
      icon: 'card-outline', 
      color: '#0c2461', 
      onPress: () => navigation.navigate('Accounts') 
    },
    { 
      id: '4', 
      title: 'Bills', 
      icon: 'receipt-outline', 
      color: '#0c2461', 
      onPress: () => navigation.navigate('BillPayment') 
    },
  ], [navigation]);

  const additionalFeatures = useMemo(() => [
    { 
      id: '1', 
      title: 'Transaction History', 
      subtitle: 'View your recent transactions',
      icon: 'time-outline',
      gradient: ['#00b894', '#00cec9'],
      onPress: () => navigation.navigate('TransactionHistory')
    },
    { 
      id: '2', 
      title: 'Bill Payment', 
      subtitle: 'Pay utilities and other bills',
      icon: 'receipt-outline',
      gradient: ['#e17055', '#d63031'],
      onPress: () => navigation.navigate('BillPayment')
    },
  ], [navigation]);

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={GlobalStyles.gradientContainer}>
      <SafeAreaView style={GlobalStyles.safeArea}>
        <StatusBar backgroundColor={Colors.gradientEnd} barStyle="light-content" />
        
        <View style={GlobalStyles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.headerText}>{username || 'User'}</Text>
            <Text style={styles.subtitleText}>Welcome to your banking dashboard</Text>
          </View>
        </View>

        <View style={GlobalStyles.content}>
          <Text style={GlobalStyles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.quickActionButton, { backgroundColor: action.color }]} 
                onPress={action.onPress}
              >
                <Ionicons name={action.icon} size={24} color={Colors.textWhite} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={GlobalStyles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {additionalFeatures.map((feature) => (
              <TouchableOpacity 
                key={feature.id} 
                style={styles.featureCard} 
                onPress={feature.onPress}
              >
                <LinearGradient colors={feature.gradient} style={styles.featureGradient}>
                  <View style={styles.featureContent}>
                    <Ionicons name={feature.icon} size={28} color={Colors.textWhite} />
                    <View style={styles.featureTextContainer}>
                      <Text style={styles.featureText}>{feature.title}</Text>
                      <Text style={styles.featureSubtext}>{feature.subtitle}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  greetingText: {
    fontSize: Typography.lg,
    color: '#e3f2fd',
    fontWeight: Typography.medium,
  },
  headerText: {
    fontSize: Typography['4xl'],
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginTop: 5,
  },
  subtitleText: {
    fontSize: Typography.sm,
    color: '#e3f2fd',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['2xl'],
  },
  quickActionButton: {
    width: width / 4 - 25,
    height: width / 4 - 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textWhite,
    marginTop: 5,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: Spacing.lg,
  },
  featureCard: {
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: Spacing.lg,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  featureText: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },
  featureSubtext: {
    fontSize: Typography.xs,
    color: Colors.textWhite,
    marginTop: 4,
    opacity: 0.9,
  },
};

export default DashboardScreen;
