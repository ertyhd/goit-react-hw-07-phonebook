import { Provider } from 'react-redux';

import { store } from './redux/store';
import Contacts from 'components/Contacts';

function App() {
  return (
    <Provider store={store}>
      <Contacts />
    </Provider>
  );
}

export default App;
