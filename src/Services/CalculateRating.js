import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export default function CalculateRating({item}) {
  const starsCount = Math.round(item);

  const goldStars = Array.from({ length: starsCount }, (_, i) => i + 1).map((star) => (
    <FontAwesomeIcon key={star} icon={solidStar} color="#ff5722" />
  ));

  const emptyStars = Array.from({ length: 5 - starsCount }, (_, i) => i + 1).map((star) => (
    <FontAwesomeIcon key={star} icon={regularStar} color="#ff5722" />
  ));

  return (
    <div>
      {goldStars}
      {emptyStars}
    </div>
  );
}
