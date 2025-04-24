
import { BackendConfig } from '@/types';

export const getBackendConfig = (): BackendConfig => {
  const type = localStorage.getItem('backendType') || 'supabase';
  const isSupabaseAvailable = navigator.onLine;
  
  // Use Supabase if it's the selected type and it's available
  if (type === 'supabase' && isSupabaseAvailable) {
    return {
      type: 'supabase',
      url: 'https://your-supabase-url.supabase.co', // This will be replaced with actual Supabase URL after integration
      apiKey: 'your-supabase-key' // This will be replaced with actual Supabase key after integration
    };
  } else {
    return {
      type: 'mongodb',
      url: 'http://localhost:3000/api'
    };
  }
};

export const setBackendType = (type: 'supabase' | 'mongodb'): void => {
  localStorage.setItem('backendType', type);
};

// Function to check backend availability
export const checkSupabaseAvailability = async (): Promise<boolean> => {
  try {
    // This would typically make a lightweight call to the Supabase API
    // to check if it's accessible.
    // For now, we'll just use navigator.onLine as a simple check
    return navigator.onLine;
  } catch {
    return false;
  }
};

export const switchBackendIfNeeded = async (): Promise<void> => {
  const currentType = localStorage.getItem('backendType') || 'supabase';
  
  if (currentType === 'supabase') {
    const isAvailable = await checkSupabaseAvailability();
    
    if (!isAvailable) {
      console.log('Supabase is not available, switching to MongoDB backend');
      setBackendType('mongodb');
    }
  }
};

// Run background check periodically
export const startBackendAvailabilityCheck = (): NodeJS.Timeout => {
  return setInterval(switchBackendIfNeeded, 30000); // Check every 30 seconds
};
