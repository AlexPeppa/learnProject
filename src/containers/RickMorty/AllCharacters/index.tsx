import React, { FC } from "react";
import style from "./allCharacters.module.css";
import RickMortyPagination from "./Pagination/pagination";
import { Character } from "src/store/rickMorty/childs/characters";
import { PropsAllCharacters } from "src/models/rickMorty";

export const AllCharacters: FC<PropsAllCharacters> = ({ characters }) => {
  return (
    <div>
      <div className={style.infoWrapper}>
        {characters.map((character) => (
          <div key={character.id}>
            <div className={style.info}>
              <div>
                <div>
                  Name: <b className={style.text}>{character.name}</b>
                </div>
                <div>
                  Gender: <b>{character.gender}</b>
                </div>
              </div>
              <div>
                <img className={style.img} src={character.image} alt="characterPicture" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <RickMortyPagination />
    </div>
  );
};
