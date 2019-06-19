import React from "react";

const PhotoGrid = props => {
  return (
    <section className="cards">
      {props.photos.map(photo => (
        <img src={photo.urls.regular} />
      ))}
    </section>
  );
};

export default PhotoGrid;
