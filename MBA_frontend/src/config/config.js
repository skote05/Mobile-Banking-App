// Configuration for the Mobile Banking App
const config = {
  // Development configuration
  development: {
    apiBaseURL: 'http://192.168.1.3:8080',
    // For mobile testing on physical device, use your computer's IP address
    // apiBaseURL: 'http://192.168.1.100:8080', // Replace with your computer's IP
  },
  
  // Production configuration
  production: {
    apiBaseURL: 'https://your-production-domain.com', // Replace with your production URL
  },
  
  // Get current environment
  getCurrentConfig() {
    // You can change this to 'production' when deploying
    const environment = __DEV__ ? 'development' : 'production';
    return this[environment];
  },
  
  // Get API base URL
  getApiBaseURL() {
    return this.getCurrentConfig().apiBaseURL;
  }
};

export default config; 