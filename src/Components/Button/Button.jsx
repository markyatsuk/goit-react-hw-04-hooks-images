import { useState } from "react";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";
const picturesApiService = new PicturesApiService();
function Button({ searchValue, onLoadMore, totalHits }) {
  const [status, setStatus] = useState("resolved");

  function onLoadMoreClick() {
    setStatus("pending");
    picturesApiService.query = searchValue;
    if (picturesApiService.page === 1) {
      picturesApiService.incrementPage();
    }

    picturesApiService.fetchPictures().then((fetchResponse) => {
      onLoadMore(fetchResponse.data.hits);
      if (12 * picturesApiService.page >= totalHits) {
        setStatus("rejected");
      } else {
        setStatus("resolved");
      }
    });
  }

  if (status === "pending") {
    return <Loader />;
  }
  if (status === "resolved") {
    return (
      <button type="button" className="Button" onClick={onLoadMoreClick}>
        Load more
      </button>
    );
  }
}

export { Button };
