import React from "react";
import config from "config";

/**
 * Img component displays an image, which is an SVG element if src ends with '.svg', or an image element otherwise.
 *
 * @param {string} src - The image source URL or SVG content.
 * @param {string} [alt] - The alternative text for the image (only for <img>).
 * @param {string} [width] - The width of the image (only for <img>).
 * @param {string} [height] - The height of the image (only for <img>).
 * @returns {JSX.Element} An SVG element or an image element.
 */
interface ImgProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  // Add other props as needed
}

const Img: React.FC<ImgProps> = ({ src, alt, width, height, className }) => {
  if (src.endsWith(".svg")) {
    // If src ends with '.svg', treat it as SVG content
    return (
      <svg width={width} height={height} className={className}>
        <g dangerouslySetInnerHTML={{ __html: src }} />
        {/* Add other SVG elements and attributes as needed */}
      </svg>
    );
  } else {
    // Otherwise, treat it as an <img> element
    return (
      <img
        src={config.STATIC_FILES_DIR + src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }
};

export default Img;
