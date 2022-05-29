import { useState } from "react";
import { Searchbar } from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

export function App() {
  const [searchValue, setSearchValue] = useState("");

  function handleFormSubmit({ query }) {
    setSearchValue(query);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchValue={searchValue} />
    </div>
  );
}
