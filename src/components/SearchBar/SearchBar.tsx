import { useRef } from 'react';

import { ReactComponent as CloseBtn } from './../../assets/close-btn.svg';
import css from './searchBar.module.scss';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
  searchTags: string[];
  onRemoveSearchTag: (searchTag: string) => void;
}

const SearchBar = ({
  onSearch,
  searchTags,
  onRemoveSearchTag,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={css['search-container']}>
      <div>
        <input
          className={css['search-bar']}
          ref={inputRef}
          type='search'
          placeholder='Search...'
          onKeyDown={(e) => {
            const target = e.target as HTMLInputElement;
            if (e.key === 'Enter' && target.value) {
              onSearch(target.value);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }
          }}
        />
      </div>
      <div
        className={`${css['search-tags']} ${
          searchTags.length > 0 ? '' : css.empty
        }`}
      >
        {searchTags.map((tag, index) => (
          <div key={index} className={css['search-tag']}>
            <span>
              <span>
                Showing results for <span className={css.tag}>{tag}</span>
              </span>
            </span>
            <button onClick={() => onRemoveSearchTag(tag)}>
              <CloseBtn width={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
