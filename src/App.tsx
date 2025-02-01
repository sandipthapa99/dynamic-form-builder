import DesignerContextProvider from './context/DesignerContext';
import AppRoutes from './routes';

function App() {
  return (
    <DesignerContextProvider>
      <AppRoutes />
    </DesignerContextProvider>
  );
}

export default App;
