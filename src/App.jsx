import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'redux/store';
import Contacts from 'components/Contacts';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Contacts />
      </PersistGate>
    </Provider>
  );
}

export default App;
