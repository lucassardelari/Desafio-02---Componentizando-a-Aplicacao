import { useMovies } from '../hooks/useMovies';
import './../styles/sidebar.scss';
import { Button } from './Button';

export function SideBar() {
  const { genres, setGenreID, selectedGenre } = useMovies();

  function handleClickButton(id: number) {
    setGenreID(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}