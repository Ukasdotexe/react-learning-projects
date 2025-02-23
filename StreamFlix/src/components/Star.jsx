export function Star({ id, selectedStars, onHover, onClick }) {
  const isSelected = id <= selectedStars;

  return (
    <li onMouseEnter={() => onHover(id)} onClick={onClick}>
      <i
        className={`fa fa-star star-icon large-star ${
          !isSelected ? "fa-star-o" : ""
        }`}
      ></i>
    </li>
  );
}
