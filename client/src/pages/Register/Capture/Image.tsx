import { FC, memo } from "react";
import { FaTimes } from "react-icons/fa";

import "./image.scss";
export interface ImageData {
  id: number | string;
  img: string;
}

interface Props {
  onDelete: (id: string | number) => void;
  data: ImageData[];
}

const Image: FC<Props> = memo(({ onDelete, data }) => {
  return (
    <div className="images-container">
      <div className="images-body">
        {data?.map((item) => (
          <div className="img-item" key={item?.id}>
            <img src={item?.img} alt="pic" />
            <div className="action" onClick={onDelete.bind(null, item?.id)}>
              <FaTimes />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Image;
