import React, { useEffect, useRef, useState } from "react";
import Stepper, { Step } from "./Stepper";
import UploadPostForm1 from "../forms/UploadPostForm1";
import UploadPostForm2, {
  UploadPostForm2Handle,
} from "../forms/UploadPostForm2";
import UploadPostForm3 from "../forms/UploadPostForm3";
import { toast } from "sonner";

interface UploadPostStepperProps {
  onComplete: () => void;
}

const UploadPostStepper: React.FC<UploadPostStepperProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [ratio, setRatio] = useState("4:5");
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    tags: [] as string[],
    hideLikes: false,
    pinPost: false,
  });

  const handleImageUpload = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      // Cleanup blob URLs
      croppedImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [croppedImages]);

  const form2Ref = useRef<UploadPostForm2Handle>(null);

  const handleStepChange = async (step: number) => {
    if (step > currentStep) {
      switch (currentStep) {
        case 1:
          if (images.length === 0) {
            toast.warning("Please upload at least one image");
            return;
          }
          break;
        case 2:
          try {
            const cropped = await form2Ref.current?.handleCrop();
            if (!cropped || cropped.length === 0) {
              toast.warning("Failed to crop images");
              return;
            }
            setCroppedImages(cropped);
          } catch (error) {
            toast.error("Failed to crop images");
            return;
          }
          break;
      }
    }
    setCurrentStep(step);
  };

  const handleFinalSubmit = async () => {
    // Convert blob URLs to Files for upload
    const imageFiles = await Promise.all(
      croppedImages.map(async (blobUrl) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], "image.jpg", { type: "image/jpeg" });
      })
    );

    // Create FormData for submission
    const formPayload = new FormData();
    imageFiles.forEach((file) => formPayload.append("images", file));
    formPayload.append("category", formData.category);
    formPayload.append("description", formData.description);
    formPayload.append("tags", JSON.stringify(formData.tags));
    formPayload.append("hideLikes", String(formData.hideLikes));
    formPayload.append("pinPost", String(formData.pinPost));

    // Submit to your API
    // try {
    //   const response = await fetch('/api/posts', {
    //     method: 'POST',
    //     body: formPayload
    //   });
    //   // Handle response...
    // } catch (error) {
    //   // Handle error...
    // }
    console.log(formData, formPayload, imageFiles);
  };

  return (
    <div className="w-full">
      <Stepper
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onFinalSubmit={handleFinalSubmit}
        onClose={onComplete}
        steps={[
          { title: "Upload Images" },
          { title: "Adjust Content" },
          { title: "Details" },
        ]}
      >
        <Step>
          <UploadPostForm1
            images={images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        </Step>

        <Step>
          <UploadPostForm2
            ref={form2Ref}
            images={images.map((img) => URL.createObjectURL(img))}
            ratio={ratio}
            onRatioChange={setRatio}
          />
        </Step>

        <Step>
          <UploadPostForm3
            {...formData}
            ratio={ratio} // Add this prop
            onCategoryChange={(val) =>
              setFormData((prev) => ({ ...prev, category: val }))
            }
            onDescriptionChange={(val) =>
              setFormData((prev) => ({ ...prev, description: val }))
            }
            onTagsChange={(val) =>
              setFormData((prev) => ({ ...prev, tags: val }))
            }
            onHideLikesChange={(val) =>
              setFormData((prev) => ({ ...prev, hideLikes: val }))
            }
            onPinPostChange={(val) =>
              setFormData((prev) => ({ ...prev, pinPost: val }))
            }
            croppedImages={croppedImages}
          />
        </Step>
      </Stepper>
    </div>
  );
};

export default UploadPostStepper;
