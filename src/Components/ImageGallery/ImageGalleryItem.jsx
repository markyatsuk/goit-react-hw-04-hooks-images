function ImageGalleryItem({ datas, handleModal }) {
  return datas.map(({ webformatURL, tags, largeImageURL }, index) => {
    return (
      <li className="ImageGalleryItem" key={index}>
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={() => handleModal(largeImageURL)}
        />
      </li>
    );
  });
}

export { ImageGalleryItem };
