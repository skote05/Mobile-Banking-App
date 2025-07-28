import React from 'react';
import { NavigationContainer } from '../../node_modules/@react-navigation/native/lib/typescript/src';
import { createStackNavigator } from '../../node_modules/@react-navigation/stack/lib/typescript/src';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '../../node_modules/@react-navigation/drawer/lib/typescript/src';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ScanQRScreen from '../screens/QRScanner';
import AccountsScreen from '../screens/AccountsScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import FundTransferScreen from '../screens/FundTransferScreen';
import SelfTransferScreen from '../screens/SelfTransferScreen';
import TransferToOthersScreen from '../screens/TransferToOthersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import RateUsScreen from '../screens/RateUsScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import BillPaymentScreen from '../screens/BillPaymentScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userId');
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Ionicons name="card" size={40} color="#0072ff" />
        </View>
        <Text style={styles.appTitle}>Mobile Banking</Text>
        <Text style={styles.appSubtitle}>Secure & Fast</Text>
      </View>
      
      <DrawerContentScrollView {...props} style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Drawer Navigator for authenticated screens
const DrawerNavigator = () => (
  <Drawer.Navigator 
    initialRouteName="Dashboard"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: true,
      drawerActiveTintColor: '#0072ff',
      drawerInactiveTintColor: '#666',
      drawerStyle: {
        backgroundColor: '#f8f9fa',
        width: 280,
      },
      headerStyle: {
        backgroundColor: '#0072ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Drawer.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Accounts" 
      component={AccountsScreen}
      options={{
        title: 'My Accounts',
        drawerLabel: 'My Accounts',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="card-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="AddAccount" 
      component={AddAccountScreen}
      options={{
        title: 'Add Account',
        drawerLabel: 'Add Account',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="FundTransfer" 
      component={FundTransferScreen}
      options={{
        title: 'Fund Transfer',
        drawerLabel: 'Fund Transfer',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="swap-horizontal-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="SelfTransfer" 
      component={SelfTransferScreen}
      options={{
        title: 'Self Transfer',
        drawerLabel: 'Self Transfer',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="repeat-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="TransferToOthers" 
      component={TransferToOthersScreen}
      options={{
        title: 'Transfer to Others',
        drawerLabel: 'Transfer to Others',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="ScanQR" 
      component={ScanQRScreen}
      options={{
        title: 'Scan QR Code',
        drawerLabel: 'Scan QR Code',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="qr-code-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="BillPayment" 
      component={BillPaymentScreen}
      options={{
        title: 'Bill Payment',
        drawerLabel: 'Bill Payment',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="receipt-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        title: 'Profile',
        drawerLabel: 'Profile',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Feedback" 
      component={FeedbackScreen}
      options={{
        title: 'Feedback',
        drawerLabel: 'Feedback',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="chatbubble-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="RateUs" 
      component={RateUsScreen}
      options={{
        title: 'Rate Us',
        drawerLabel: 'Rate Us',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="star-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="TransactionHistory" 
      component={TransactionHistoryScreen}
      options={{
        title: 'Transaction History',
        drawerLabel: 'Transaction History',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="time-outline" size={size} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#0072ff',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
  },
  drawerContent: {
    flex: 1,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AppNavigator;