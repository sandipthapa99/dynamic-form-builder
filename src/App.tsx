import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import AppRoutes from './routes';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<p>Loading...</p>}>
          <AppRoutes />
          <UserButton />
        </Suspense>
      </SignedIn>
    </>
  );
}

export default App;
