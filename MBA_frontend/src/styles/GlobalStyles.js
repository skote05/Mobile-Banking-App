import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette
export const Colors = {
  // Primary Colors
  primary: '#0072ff',
  primaryLight: '#00c6ff',
  primaryDark: '#0056b3',
  
  // Secondary Colors
  secondary: '#6c757d',
  secondaryLight: '#adb5bd',
  secondaryDark: '#495057',
  
  // Success/Error Colors
  success: '#27ae60',
  error: '#dc3545',
  warning: '#f39c12',
  info: '#3498db',
  
  // Background Colors
  background: '#f8f9fa',
  surface: '#ffffff',
  card: '#ffffff',
  
  // Text Colors
  textPrimary: '#2c3e50',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  textWhite: '#ffffff',
  
  // Border Colors
  border: '#e9ecef',
  borderLight: '#f1f3f4',
  
  // Gradient Colors
  gradientStart: '#00c6ff',
  gradientEnd: '#0072ff',
  
  // Status Colors
  online: '#27ae60',
  offline: '#e74c3c',
  pending: '#f39c12',
};

// Typography
export const Typography = {
  // Font Sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  
  // Font Weights
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 40,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  base: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primary: {
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Layout
export const Layout = {
  screenWidth: width,
  screenHeight: height,
  headerHeight: 80,
  tabBarHeight: 60,
};

// Global Styles
export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Gradient Container
  gradientContainer: {
    flex: 1,
  },
  
  // Safe Area
  safeArea: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
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
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    color: Colors.textWhite,
    flex: 1,
    textAlign: 'center',
  },
  
  headerRight: {
    width: 40,
  },
  
  // Content Container
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  
  // Section Styles
  section: {
    marginBottom: Spacing['2xl'],
  },
  
  sectionTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  
  sectionSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  
  // Card Styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  
  cardContent: {
    flex: 1,
  },
  
  // Input Styles
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  
  label: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  
  input: {
    height: 50,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  
  inputError: {
    borderColor: Colors.error,
  },
  
  errorText: {
    fontSize: Typography.sm,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  
  // Button Styles
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  
  buttonDisabled: {
    opacity: 0.6,
  },
  
  buttonText: {
    color: Colors.textWhite,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    marginLeft: Spacing.sm,
  },
  
  // Icon Container
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    marginTop: Spacing.base,
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  
  emptyText: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
  
  emptySubtext: {
    fontSize: Typography.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  
  // List Styles
  listContainer: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  
  listItem: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Picker Styles
  pickerWrapper: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  
  picker: {
    height: 50,
    width: '100%',
  },
  
  // Toggle Styles
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  
  activeToggle: {
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  activeText: {
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  
  inactiveText: {
    color: Colors.textSecondary,
  },
  
  // Balance Styles
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  balanceLabel: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  
  balanceAmount: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.success,
  },
  
  // Account Styles
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  accountInfo: {
    flex: 1,
  },
  
  bankName: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  
  accountNumber: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  
  // Language Options
  languageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  languageOption: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  selectedLanguage: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  
  languageText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },
  
  selectedLanguageText: {
    color: Colors.textWhite,
    fontWeight: Typography.semibold,
  },
  
  // Details Row
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  detailLabel: {
    width: 120,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    fontSize: Typography.sm,
  },
  
  detailValue: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.sm,
  },
});

// Export commonly used values
export const commonValues = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  layout: Layout,
};