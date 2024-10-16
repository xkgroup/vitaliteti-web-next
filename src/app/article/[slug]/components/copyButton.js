"use client";
import Image from "next/image";
import CopyLinkImage from "../../../assets/ArticleCopyLink.png";

const CopyLinkButton = ({ CopyLink }) => {
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={handleCopyLink}>
      <Image src={CopyLinkImage} alt="Copy Link" />
    </div>
  );
};

export default CopyLinkButton;
