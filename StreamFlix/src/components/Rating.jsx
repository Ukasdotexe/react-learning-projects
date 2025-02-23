import { useRef, useState } from "react";
import { Star } from "./Star";

export function Rating({ onRate, isWatched, userRating }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const numClicks = useRef(0);

  function handleSelectedStars(num) {
    setIsClicked(false);
    setSelectedStars(num);
  }

  function handleStarClick() {
    setIsClicked(true);
    numClicks.current += 1;
    console.log(numClicks.current);
  }

  return (
    <div className="rating">
      {isWatched ? (
        <p
          className="rate"
          style={{ gridColumn: "span 2", textAlign: "center" }}
        >
          You rated this movie {userRating} ⭐
        </p>
      ) : (
        <ul
          className="stars"
          onMouseLeave={() => !isClicked && setSelectedStars(0)}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <Star
              key={i + 1}
              id={i + 1}
              selectedStars={selectedStars}
              onHover={handleSelectedStars}
              onClick={handleStarClick}
            />
          ))}
        </ul>
      )}

      {!isWatched && <span className="rate"> {selectedStars}</span>}

      {isClicked && (
        <div className="btn-add-to-list" onClick={() => onRate(selectedStars)}>
          + Add to list
        </div>
      )}
    </div>
  );
}
