import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface UploadPostForm2Props {
  images: string[];
  ratio: string;
  onRatioChange: (ratio: string) => void;
}

export interface UploadPostForm2Handle {
  handleCrop: () => Promise<string[]>;
}

const UploadPostForm2 = forwardRef<UploadPostForm2Handle, UploadPostForm2Props>(
  ({ images, ratio, onRatioChange }, ref) => {
    const [displayDims, setDisplayDims] = useState<
      { width: number; height: number }[]
    >([]);

    // Add handler for image load
    const handleImageLoad = (img: HTMLImageElement, index: number) => {
      setDisplayDims((prev) => {
        const newDims = [...prev];
        newDims[index] = { width: img.width, height: img.height };
        return newDims;
      });
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [crops, setCrops] = useState<Crop[]>(() =>
      Array(images.length).fill({
        unit: "%",
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      })
    );

    const aspectRatios: { [key: string]: number } = {
      "4:5": 4 / 5,
      "1:1": 1,
      "16:9": 16 / 9,
    };

    // const imgRefs = useRef<HTMLImageElement[]>([]);
    const currentAspect = aspectRatios[ratio];

    useEffect(() => {
      const updateCropForAllImages = async () => {
        const newCrops = await Promise.all(
          images.map(async (imgSrc) => {
            const img = new Image();
            img.src = imgSrc;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            return createCenteredCrop(img, currentAspect);
          })
        );
        setCrops(newCrops);
      };

      updateCropForAllImages();
    }, [ratio, images]);

    const createCenteredCrop = (
      img: HTMLImageElement,
      aspect: number
    ): Crop => {
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let width, height;

      if (imgAspect > aspect) {
        // Image is wider than crop aspect
        height = 100;
        width = height * aspect;
      } else {
        // Image is taller than crop aspect
        width = 100;
        height = width / aspect;
      }

      return {
        unit: "%",
        width,
        height,
        x: (100 - width) / 2,
        y: (100 - height) / 2,
      };
    };

    const getCroppedImg = (
      image: HTMLImageElement,
      crop: Crop
    ): Promise<string> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return Promise.reject("Canvas context not found");

      // Calculate crop dimensions based on unit
      let cropX, cropY, cropWidth, cropHeight;

      if (crop.unit === "%") {
        // Convert percentages to pixels based on natural dimensions
        cropX = (crop.x * image.naturalWidth) / 100;
        cropY = (crop.y * image.naturalHeight) / 100;
        cropWidth = (crop.width * image.naturalWidth) / 100;
        cropHeight = (crop.height * image.naturalHeight) / 100;
      } else {
        // Handle 'px' unit (though not used in current setup)
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        cropX = crop.x * scaleX;
        cropY = crop.y * scaleY;
        cropWidth = crop.width * scaleX;
        cropHeight = crop.height * scaleY;
      }

      // Set canvas dimensions to match the crop area
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw the cropped image onto the canvas
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            resolve(URL.createObjectURL(blob));
          },
          "image/jpeg",
          0.9
        );
      });
    };

    const handleCrop = async () => {
      const croppedImages = await Promise.all(
        images.map(async (imgSrc, index) => {
          const img = new Image();
          img.crossOrigin = "anonymous"; // Add if needed for CORS
          img.src = imgSrc;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = () => resolve(null); // Handle errors
          });

          if (!img.naturalWidth) return ""; // Handle failed loads

          return getCroppedImg(img, crops[index]);
        })
      );
      return croppedImages.filter((url) => url !== ""); // Filter out failed crops
    };

    useImperativeHandle(ref, () => ({
      handleCrop,
    }));

    const handleCropChange = (crop: Crop, index: number) => {
      setCrops((prev) => {
        const newCrops = [...prev];
        newCrops[index] = crop;
        return newCrops;
      });
    };

    return (
      <div className="grid grid-cols-2 gap-8 min-h-[250px]">
        <div className="relative bg-gray-800 rounded-xl p-4">
          <div className=" bg-gray-700 rounded-lg overflow-hidden">
            <ReactCrop
              crop={crops[currentIndex]}
              onChange={(c) => handleCropChange(c, currentIndex)}
              aspect={currentAspect}
              onImageLoaded={(img) => handleImageLoad(img, currentIndex)}
              keepSelection
              disabled // Add this prop to disable all interactions
            >
              <img
                src={images[currentIndex]}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </ReactCrop>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === idx ? "bg-blue-600" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-gray-300 text-lg">Select Aspect Ratio</h3>
            <div className="flex items-center justify-center gap-4">
              {["4:5", "1:1", "16:9"].map((r) => (
                <button
                  key={r}
                  onClick={() => onRatioChange(r)}
                  className={`p-4 rounded-lg ${
                    ratio === r
                      ? "bg-blue-600/30 border-2 border-blue-500"
                      : "bg-gray-800"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      ratio === r ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    {r}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default UploadPostForm2;
