import { useAppContext } from "./context";

const Gallery = () => {
  const { isLoading, isDarkMode, isError, error, images } = useAppContext();

  if (isLoading) {
    return (
      <section className="image-container">
        <div className="loader"></div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="image-container">
        <h5 className="error" style={{ color: isDarkMode ? "#fff" : "red" }}>
          ❌ {error.response.data.errors[0]}
        </h5>
      </section>
    );
  }

  if (images.length <= 0) {
    return (
      <section className="image-container">
        <h5>No Results found...</h5>
      </section>
    );
  }

  return (
    <ul className="image-container">
      {images.map((img) => {
        return (
          <li key={img?.id}>
            <img
              src={img?.urls?.regular}
              alt={img?.alt_description}
              className="img"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Gallery;
