import "./SearchSkeleton.scss";

export default function SearchSkeleton() {
  return (
    <div className="SearchSkeleton">
      <div className="SearchSkeleton__inputWrapper">
        <div className="SearchSkeleton__input skeleton" />
        <div className="skeleton icon-skeleton" />
      </div>
    </div>
  );
}
