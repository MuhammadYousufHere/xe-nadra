/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef } from "react";
import Webcam from "react-webcam";
import Images, { ImageData } from "./Image";
import { IoCamera } from "react-icons/io5";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import "./styles.scss";

export interface ImageCaptureProps {
  data: ImageData[];
  onDelete: (id: string | number) => void;
  onCapture: () => void;
  error?: string;
}
const ImageCapture = forwardRef<Webcam, ImageCaptureProps>(
  ({ data, onCapture, onDelete, error }, ref) => {
    return (
      <>
        <div className="capture-image">
          <div className="capture-image_body">
            <div className="capture-image_body_header">
              <p className="title">Please Capture an Image</p>
            </div>
            <main>
              <div className="camera-container">
                <Webcam
                  audio={false}
                  imageSmoothing={true}
                  width={300}
                  height={300}
                  ref={ref}
                  videoConstraints={{
                    facingMode: "user",
                  }}
                  screenshotFormat="image/jpeg"
                />
              </div>
              <div className="cam-action">
                <button type="button" className="capture" onClick={onCapture}>
                  <IoCamera />
                </button>
              </div>

              <Images data={data} onDelete={onDelete} />
            </main>
          </div>
        </div>
        {error && <ErrorMessage message={error} />}
      </>
    );
  }
);

export default ImageCapture;
