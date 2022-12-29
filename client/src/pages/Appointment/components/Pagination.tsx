import { memo } from 'react';
import './pagination.scss';
interface Props {
  length: number;
  current: number;
}
const Pagination = memo(({ length, current }: Props) => {
  return (
    <div className='pagination-container'>
      <div className='pagination-body'>
        {Array.from({ length }, (_, i) => (
          <div
            key={i}
            className={`pagination-item ${
              current === i ? 'active' : current > i ? 'finish' : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
});

export default Pagination;
