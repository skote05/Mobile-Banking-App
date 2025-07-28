import React, { useState } from 'react';
import {
    View,
    TextInput,
    Alert,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';

const SignupScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        contactNumber: '',
        address: '',
        dob: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        // Confirm password validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Contact number validation
        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        // Date of birth validation
        if (!formData.dob.trim()) {
            newErrors.dob = 'Date of birth is required';
        } else {
            const dobDate = new Date(formData.dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            if (isNaN(dobDate.getTime()) || age < 18 || age > 100) {
                newErrors.dob = 'Please enter a valid date of birth (must be 18+ years old)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSignup = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        const payload = {
            name: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
            contactNumber: formData.contactNumber.trim(),
            address: formData.address.trim(),
            dob: formData.dob,
        };

        console.log('Signup attempt:', payload);

        try {
            const response = await api.post('/auth/signup', payload, { timeout: 10000 });
            console.log('Signup response:', response.data);
            console.log('Signup successful! Please login.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            // Only log to console, don't show alert
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <ScrollView 
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Create Account</Text>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Username"
                                    value={formData.username}
                                    onChangeText={(text) => handleInputChange('username', text)}
                                    style={[styles.input, errors.username && styles.inputError]}
                                    placeholderTextColor="#666"
                                    autoCapitalize="words"
                                />
                                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Email"
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                    keyboardType="email-address"
                                    style={[styles.input, errors.email && styles.inputError]}
                                    placeholderTextColor="#666"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Password"
                                    value={formData.password}
                                    onChangeText={(text) => handleInputChange('password', text)}
                                    secureTextEntry
                                    style={[styles.input, errors.password && styles.inputError]}
                                    placeholderTextColor="#666"
                                    autoCapitalize="none"
                                />
                                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                    secureTextEntry
                                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                                    placeholderTextColor="#666"
                                    autoCapitalize="none"
                                />
                                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChangeText={(text) => handleInputChange('contactNumber', text)}
                                    keyboardType="phone-pad"
                                    style={[styles.input, errors.contactNumber && styles.inputError]}
                                    placeholderTextColor="#666"
                                />
                                {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Address"
                                    value={formData.address}
                                    onChangeText={(text) => handleInputChange('address', text)}
                                    style={[styles.input, errors.address && styles.inputError]}
                                    placeholderTextColor="#666"
                                    multiline
                                    numberOfLines={2}
                                />
                                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Date of Birth (YYYY-MM-DD)"
                                    value={formData.dob}
                                    onChangeText={(text) => handleInputChange('dob', text)}
                                    style={[styles.input, errors.dob && styles.inputError]}
                                    placeholderTextColor="#666"
                                />
                                {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
                            </View>

                            <TouchableOpacity 
                                style={[styles.signupBtn, isLoading && styles.signupBtnDisabled]} 
                                onPress={handleSignup}
                                disabled={isLoading}
                            >
                                <Text style={styles.signupText}>
                                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={styles.backBtn}
                            >
                                <Text style={styles.backText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    signupBtn: {
        backgroundColor: '#4facfe',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    signupBtnDisabled: {
        backgroundColor: '#cccccc',
    },
    signupText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    backBtn: {
        marginTop: 15,
        alignItems: 'center',
    },
    backText: {
        color: '#007bff',
        fontSize: 14,
    },
});

export default SignupScreen;
