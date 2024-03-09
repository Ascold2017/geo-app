import {create} from 'zustand';

// Define the interface for the state
interface UpdateServiceState {
  message: string;
  showMessage: (str: string) => void;
  clearMessage: () => void;
  getDeviceId: () => string;
}

// Create the store using zustand
export const useUpdate = create<UpdateServiceState>((set) => ({
  message: '',
  showMessage: (str: string) => set({ message: str }),
  clearMessage: () => set({ message: '' }),
  getDeviceId: () => {
    const genDeviceId = () => {
      const userAgent = window.navigator.userAgent;
      const platform = window.navigator.platform;
      const timestamp = Date.now();
      
      return `${userAgent}-${platform}-${timestamp}`;
    };
    const lsDeviceId = localStorage.getItem('device-id');
    if (lsDeviceId) {
      return lsDeviceId;
    } else {
      const deviceId = genDeviceId();
      localStorage.setItem('device-id', deviceId);
      return deviceId;
    }
  }
}));
