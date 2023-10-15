import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { AppDispatch } from "src/store";
import { setCurrentPage } from "src/store/rickMorty/childs/characters";
import debounce from "lodash.debounce";

type Props = DispatchProps & OwnProps;

const SearchInput: FC<Props> = ({
  setSearchedCharacter,
  searchedCharacter,
  currentPage,
  getCharacters,
  setSelectedPage,
}) => {
  const getCharacterDebounce = useCallback(
    debounce((characterName: string) => {
      getCharacters({ page: currentPage, name: characterName });
    }, 200),
    []
  );
  const handleChange = (event: { target: { value: string } }) => {
    setSearchedCharacter(event.target.value);
    setSelectedPage(1);
    getCharacterDebounce(event.target.value);
  };

  const showAllCharacters = () => {
    setSearchedCharacter("");
    setSelectedPage(1);
    getCharacters({ page: currentPage, name: "" });
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "1px 5px",
          display: "flex",
          alignItems: "center",
          width: 250,
          borderRadius: 3,
        }}
      >
        <InputBase
          onChange={handleChange}
          type="text"
          value={searchedCharacter}
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search Characters"
        />
        <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={() => showAllCharacters()}
          color="primary"
          sx={{ p: "8px" }}
          aria-label="directions"
        >
          <DeleteForeverOutlinedIcon sx={{ color: "#ff00de" }} />
        </IconButton>
      </Paper>
    </>
  );
};

type OwnProps = {
  setSearchedCharacter: (name: string) => void;
  searchedCharacter: string;
  currentPage: number;
  getCharacters: ({ page, name }: { page: number; name: string }) => void;
  setSelectedPage: (page: number) => void;
};

type DispatchProps = {
  setSelectedPage: (page: number) => void;
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setSelectedPage: (page: number) => dispatch(setCurrentPage(page)),
});

export default connect<null, DispatchProps>(null, mapDispatchToProps)(SearchInput);
