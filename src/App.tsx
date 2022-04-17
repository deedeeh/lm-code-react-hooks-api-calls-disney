import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';
import axios from 'axios';

const initialValue = (favourites: Array<number>) => [];

export const FavouritesContext = React.createContext<Array<number>>([]);
export const UpdateFavouritesContext = React.createContext<(favourites: Array<number>) => void>(initialValue);

const App : React.FC = () => {

	const [currentPage, setCurrentPage] = useState<number>(1);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([]);

  useEffect(() => { 
    getCharacters(currentPage);
  }, [currentPage]);


  const getCharacters = async (pageNumber: number) => {
    try {
      const apiResponse = await axios(`https://api.disneyapi.dev/characters?page=${pageNumber}`);
      setCharacters(apiResponse.data.data);
    } catch(error) {
      console.log(error);
    } 
  } 

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <UpdateFavouritesContext.Provider value={setCharacterFavourites}>
        <div className="page">
          <Header currentPage={currentPage} />
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <CharacterContainer 
            characters={characters} 
          />
        </div>
      </UpdateFavouritesContext.Provider>
    </FavouritesContext.Provider>
  );
}

export default App;
