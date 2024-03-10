import {
  RouterProvider,
} from "react-router-dom";

import router from './router';
import { useEffect } from 'react';
import { useUpdate } from '@common/stores/update';
import AppNotification from '@common/components/ui/AppNotification';
import useNotificationStore from '@common/stores/notification';
import AppConfirm from "@common/components/ui/AppConfirm";

function App() {
  const updateSWMessage = useUpdate(s => s.message);
  const { showNotification } = useNotificationStore();
  useEffect(() => {
    updateSWMessage && showNotification({ message: updateSWMessage, duration: 10000, type: 'info' });
  }, [updateSWMessage]);


  return <>
    <RouterProvider router={router} />
    <AppNotification />
    <AppConfirm />
  </>
}

export default App;
