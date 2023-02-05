import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="left-col">
        <Skeleton />
      </div>
      <div className="middle-col">
        <Skeleton />
      </div>
      <div className="right-col">
        <Skeleton />
      </div>
    </div>
  );
};

export default CardSkeleton;
