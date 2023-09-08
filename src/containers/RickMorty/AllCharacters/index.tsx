import React, { FC, useEffect } from "react";
import style from "./allCharacters.module.css";
import { RickMortyPagination } from "./Pagination/pagination";
import { Preloader } from "../Preloader/Preloader";
import { PropsAllCharacters } from "src/models/rickMorty/index";
import { ApiRequestStatus } from "src/store/rickMorty/constants";

export const AllCharacters: FC<PropsAllCharacters> = ({
  characters,
  loadingStatus,
  getCharacters,
}) => {
  useEffect(() => {
    getCharacters(1);
  }, []);

  return (
    <div>
      {loadingStatus === ApiRequestStatus.Pending && (
        <div>
          <Preloader />
        </div>
      )}
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
      <RickMortyPagination getCharacters={getCharacters} />
    </div>
  );
};
