import { DisneyCharacter } from "../disney_character";
import React, { useContext } from 'react';
import { FavouritesContext } from '../App';

interface CharacterProps {
  character: DisneyCharacter;
  updateFavourites: (favourites: Array<number>) => void;
}

// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character : React.FC<CharacterProps> = ({ character,  updateFavourites}) => {

  const characterFavourites = useContext(FavouritesContext);

  let imageSrc = "https://picsum.photos/300/200/?blur";
  if(character.imageUrl) {
    imageSrc = character.imageUrl
  }

  const toggleFavouriteForCharacter = (characterId: number) => {
    if(!characterFavourites.includes(characterId)) {
      updateFavourites([...characterFavourites, characterId])
    } else {
      const updatedFavourites = characterFavourites.filter(id => id !== characterId)
      updateFavourites(updatedFavourites)
    }
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div onClick={() => toggleFavouriteForCharacter(character._id)} className="character-item__actions">
        {!characterFavourites.includes(character._id) ? 'Add to favourites' : 'Favourited'}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  

  )
}
  
export default Character