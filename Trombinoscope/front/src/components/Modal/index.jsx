import React, { useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./uitils/uitils/cropImage";
import { dataURLtoFile } from "./uitils/uitils/dataURLtoFile";
import "./index.css";
import img from "../../assets/image/up.jpg";

const Modal = ({ setprofilePicture, setModalShow }) => {
  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  

  const onUpload = async () => {
    if (!image) {
    } else {
      const canvas = await getCroppedImg(image, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertedUrlToFile = dataURLtoFile(
        canvasDataUrl,
        "cropped-image.jpeg"
      );
      setprofilePicture(convertedUrlToFile);
      setModalShow(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal_box">
        <div className="ModaleMain">
          <div className="imageBoxInput">
            <div className="containerRapper">
              {image ? (
                <>
                  <div className="wapperImg">
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  <div className="Slyder">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <img className="defoltImg" src={img} alt="" />
              )}
            </div>
          </div>
          <div className="Buttons">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onSelectFile}
              style={{ display: "none" }}
            />
            <button
              className="btn btn-danger mt-3 mb-2"
              onClick={triggerFileSelectPopup}
              style={{ marginRight: "10px" }}
            >
              Choisir
            </button>
            <button onClick={onUpload} className="btn btn-primary mt-3 mb-2">
              Télécharger
            </button>
          </div>
        </div>

        <button onClick={() => setModalShow(false)} className="close_button">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
