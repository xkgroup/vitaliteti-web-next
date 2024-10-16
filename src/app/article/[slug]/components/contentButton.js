"use client";
import { useRouter } from "next/navigation";

const ContentButton = ({ category }) => {
  const router = useRouter();
  const handleNavigate = (category) => {
    router.push(`/rubrikat/${category.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return (
    <button
      className="article-header-button"
      onClick={() => handleNavigate(category)}
    >
      {category}
    </button>
  );
};

export default ContentButton;
