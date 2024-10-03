'use client'
import {useRouter} from "next/navigation";

const ContentButton = ({category}) => {
    const router = useRouter()
    const handleNavigate = (category) => {
        router.push(`/rubrikat/${category.replace(/\s+/g, "-").toLowerCase()}`);
    };

    return <button
        className="section-two-news-card-button"
        onClick={() => handleNavigate(category)}
    >
        {category}
    </button>
}

export default ContentButton;