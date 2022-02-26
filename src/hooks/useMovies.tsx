import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData {
  movies: MovieProps[];
  genres: GenreResponseProps[];
  setGenreID: (id: number) => Promise<void>;
  selectedGenre: GenreResponseProps;
}

interface MovieProviderProps {
  children: ReactNode;
}


export const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export function MovieProvider({ children }: MovieProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
    getGenrerAndMovies(selectedGenreId)
  }, []);

  async function getGenrerAndMovies(id: number){
    api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${id}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  async function setGenreID(id:number) {
      await getGenrerAndMovies(id);
  }

  return (
    <MovieContext.Provider value={{ movies, genres, setGenreID, selectedGenre }}>
      {children}
    </MovieContext.Provider>
  )

}

export function useMovies() {
  const context = useContext(MovieContext);

  return context;
}