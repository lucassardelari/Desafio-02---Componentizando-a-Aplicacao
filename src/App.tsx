import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import { MovieProvider } from './hooks/useMovies';

export function App() {
  return (
    <MovieProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MovieProvider>
  )
}