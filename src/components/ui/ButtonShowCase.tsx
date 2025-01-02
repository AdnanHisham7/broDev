import React from "react";
import Button from "./Button";

const ButtonShowcase: React.FC = () => {
  const variants = [
    'primary',
    'outlined',
    'success',
    'danger',
    'outlined-success',
    'outlined-danger',
  ];

  return (
    <div className="p-6 bg-customBg text-white">
      <h1 className="text-2xl font-bold mb-6">Button Showcase</h1>

          <div className="grid grid-cols-2 gap-4">
            {variants.map((variant) => (
              <Button
                key={`${variant}`}
                label={`Update Password`}
                onClick={() => alert(`${variant} button clicked`)}
                variant={variant as any}
              />
            ))}
          </div>

      <h2 className="text-xl font-semibold mb-4 mt-10">Buttons with Icons</h2>
      <div className="grid grid-cols-2 gap-4">
        <Button
          label="Previous"
          onClick={() => alert('Previous button clicked')}
          variant="outlined-success"
          iconRight={<span>✕</span>}
        />

        <Button
          label="Previous"
          onClick={() => alert('Previous button clicked')}
          variant="outlined-danger"
          iconLeft={<span>®</span>}
        />

        <Button
          label="Next"
          onClick={() => alert('Next button clicked')}
          variant="primary"
          iconLeft={<span>🚀</span>}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-10">Disabled Buttons</h2>
      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant) => (
          <Button
            key={`disabled-${variant}`}
            label="Disabled"
            onClick={() => {}}
            variant={variant as any}
            disabled
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonShowcase;