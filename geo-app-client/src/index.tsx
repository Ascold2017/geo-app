import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'regenerator-runtime/runtime'
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { register } from './servicesWorkerRegistration'
import { usePush } from './app/common/stores/push';
import { useUpdate } from './app/common/stores/update';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

register({
  async onRegister(registration) {
    const subscribePush = usePush.getState().subscribePush
    subscribePush(registration)
  },
  onUpdate() {
    const showMessage = useUpdate.getState().showMessage
    showMessage('Доступно обновление! Закройте приложение и откройте снова.')
  }
});