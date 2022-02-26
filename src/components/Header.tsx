import { useMovies } from "../hooks/useMovies"
import './../styles/content.scss';

export function Header() {
    const { selectedGenre } = useMovies();

    return (
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
    )
}