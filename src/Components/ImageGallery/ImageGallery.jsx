import { useState, useEffect } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
const picturesApiService = new PicturesApiService();

export default function ImageGallery({ searchValue }) {
  const [searchResult, setSearchResult] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    picturesApiService.resetPage();
    setStatus("pending");
    picturesApiService.query = searchValue;
    console.log(searchValue);
    picturesApiService.fetchPictures().then((fetchResponse) => {
      if (fetchResponse.data.hits.length > 0) {
        setSearchResult(fetchResponse.data.hits);
        setErrorText(null);
        setStatus("resolved");
        setTotalHits(fetchResponse.data.totalHits);
      } else {
        setErrorText("Nothing found");
        console.log(errorText);
        setStatus("rejected");
      }
    });
  }, [searchValue, errorText]);

  function onLoadMore(data) {
    setSearchResult((prevState) => prevState.concat(data));
  }
  function handleModal(url) {
    setShowModal(!showModal);
    setLargeImageURL(url);
  }
  function onModalClose() {
    setShowModal(!showModal);
  }

  if (status === "pending") {
    return <Loader />;
  }
  if (status === "rejected") {
    return <h1>Enter a coorect request</h1>;
  }
  if (status === "resolved") {
    return (
      <div>
        {showModal && (
          <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
        )}
        <ul className="ImageGallery">
          <ImageGalleryItem datas={searchResult} handleModal={handleModal} />
        </ul>

        {totalHits > 12 && (
          <Button
            searchValue={searchValue}
            totalHits={totalHits}
            onLoadMore={onLoadMore}
          />
        )}
      </div>
    );
  }
}
