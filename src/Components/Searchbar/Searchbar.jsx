import { useState } from "react";
import { ImSearch } from "react-icons/im";
import Notiflix from "notiflix";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() === "") {
      Notiflix.Notify.warning("Please, enter a request");
      return;
    }
    onSubmit(query);
    setQuery("");
    e.target.reset();
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" id="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          className="search-form__input"
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export { Searchbar };
