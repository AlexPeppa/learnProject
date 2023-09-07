import React, { FC, useEffect } from "react";
import style from "./allCharacters.module.css";
import { PropsAllCharacters } from "src/store/rickMorty/models";
import { RickMortyPagination } from "./Pagination/pagination";
import { Preloader } from "../Preloader/Preloader";

export const AllCharacters: FC<PropsAllCharacters> = ({
  characters,
  page,
  isLoading,
  error,
  getCharacters,
}) => {
  useEffect(() => {
    getCharacters(page);
  }, [page]);

  return (
    <div>
      {isLoading && (
        <div>
          <Preloader />
        </div>
      )}
      {error && <div>Error</div>}
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
                <img className={style.img} src={character.image} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <RickMortyPagination />
    </div>
  );
};
