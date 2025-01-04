import React from "react";

interface TagsProps {
  tags: { [key: string]: string }; // Tags as {tagName: colorCode}
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex items-center">
      {Object.entries(tags).map(([tag, color], index) => (
        <span
          key={index}
          style={{ backgroundColor: `#${color}` }} // Set background color dynamically
          className="text-white px-2 py-1 rounded-full mx-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
