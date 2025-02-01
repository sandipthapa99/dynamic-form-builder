import { Toaster } from './components/ui/toaster';
import DesignerContextProvider from './context/DesignerContext';
import AppRoutes from './routes';

function App() {
  return (
    <DesignerContextProvider>
      <Toaster />
      <AppRoutes />
    </DesignerContextProvider>
  );
}

export default App;
