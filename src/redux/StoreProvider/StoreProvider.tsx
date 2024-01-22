import { Provider } from 'react-redux'
import { store } from '../store'

function StoreProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
