import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, Typography, Spacing } from '../styles/GlobalStyles';

const FundTransferScreen = () => {
  const navigation = useNavigation();

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
          <Text style={GlobalStyles.headerText}>Fund Transfer</Text>
          <View style={GlobalStyles.headerRight} />
        </View>

        <View style={GlobalStyles.content}>
          <View style={GlobalStyles.section}>
            <Text style={GlobalStyles.sectionTitle}>Choose Transfer Type</Text>
            <Text style={GlobalStyles.sectionSubtitle}>Select how you want to transfer money</Text>
          </View>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SelfTransfer')}
            activeOpacity={0.9}
          >
            <LinearGradient 
              colors={['#3498db', '#2980b9']} 
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="swap-horizontal" size={24} color={Colors.textWhite} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Self Transfer</Text>
                <Text style={styles.cardSubtitle}>Transfer between your own accounts</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TransferToOthers')}
            activeOpacity={0.9}
          >
            <LinearGradient 
              colors={['#e74c3c', '#c0392b']} 
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="people" size={24} color={Colors.textWhite} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Transfer to Others</Text>
                <Text style={styles.cardSubtitle}>Send money to other accounts</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Choose a transfer type to continue
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  card: {
    marginBottom: Spacing.lg,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: Spacing.lg,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: Typography.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    textAlign: 'center',
  },
};

export default FundTransferScreen;
