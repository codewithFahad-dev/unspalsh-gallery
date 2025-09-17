import { useRef } from "react";
import { useAppContext } from "./context";

const Search = () => {
  const { setSearchTerm } = useAppContext();
  const searchRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) return;
    setSearchTerm(searchRef.current.value);
  };

  return (
    <section>
      <h2 className="title">Unsplash Gallery</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          placeholder="cat"
          ref={searchRef}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;
