import React from "react";
import Facebook from "../../../assets/ArticleFacebook.png";
import Twitter from "../../../assets/ArticleTwitter.png";
import Arrow from "../../../assets/SectionTwoArrow.png";
import MainNewsTime from "../../../assets/SectionTwoMainNewsTime.png";
import NewsFourImageOne from "../../../assets/SectionTwoNewsTematOne.svg";
import NewsFourImageTwo from "../../../assets/SectionTwoNewsTematTwo.svg";
import NewsFourImageThree from "../../../assets/SectionTwoNewsTematThree.svg";
import NewsFourImageFour from "../../../assets/SectionTwoNewsTematFour.svg";
import CopyButton from '../components/copyButton'
import Link from "next/link";
import Image from "next/image";
import ContentButton from "@/app/article/[slug]/components/contentButton";


export default async function Article({params}) {
    const {slug} = params
    const response = await fetch(
        `https://cms.vitaliteti.com/api/articles?filters[slug][$eq]=${slug}&populate=image`,
        {
            headers: {
                Authorization: "Bearer 72ba30bd8b915f55e6ba19384693a0e5a0d87c463c654fbbbdaa67be2543d372c676ee1f3232c729265aa65422f7cf1b3584ae52c051ad8677f7c7d65cf346cf31dbfda0c25623be3948774b735bf017bc4504d59a510a6b00fe9fb40d9443138389f64531577f02412501358bb2e70e4a8c9c48e12d659a4439dc1c62e3377c",
            },
        }
    );
    const data = await response.json();
    if (!data || !data.data || data.data.length === 0) {
        return <div className="section">Loading...</div>;
    }

    const articleData = data.data[0].attributes;
    const baseUrl = "https://cms.vitaliteti.com";
    const imageUrl = articleData.image?.data?.attributes?.url
        ? baseUrl + articleData.image.data.attributes.url
        : null;

    const article = {
        image: imageUrl,
        title: articleData.title,
        category: articleData.category,
        fullDescription: articleData.description,
        author: articleData.author || null,
        createdAt: articleData.createdAt,
    };

    if (!article) {
        return <div className="section">Loading...</div>;
    }

    const timeSince = (date) => {
        const now = new Date();
        const createdAt = new Date(date);
        const diffInMs = now - createdAt;

        const msInHour = 1000 * 60 * 60;
        const msInDay = msInHour * 24;
        const msInWeek = msInDay * 7;
        const msInMonth = msInDay * 30;

        if (diffInMs < msInHour) {
            return `${Math.floor(diffInMs / (1000 * 60))} minuta me pare`;
        } else if (diffInMs < msInDay) {
            return `${Math.floor(diffInMs / msInHour)} ore me pare`;
        } else if (diffInMs < msInWeek) {
            return `${Math.floor(diffInMs / msInDay)} dite me pare`;
        } else if (diffInMs < msInMonth) {
            return `${Math.floor(diffInMs / msInWeek)} jave me pare`;
        } else {
            return `${Math.floor(diffInMs / msInMonth)} muaj me pare`;
        }
    };

    return (
        <div className="section">
            <div className="section-body-1">
                <button
                    className="article-header-button"
                    // onClick={() => handleNavigateToRubrikat(article.category)}
                >
                    {article.category}
                </button>
                <h1 className="article-header-title">{article.title}</h1>
                {article.image ? (
                    <img
                        src={article.image}
                        className="article-header-image"
                        alt="Article Header"
                    />
                ) : (
                    <div className="article-header-image">Image not available...</div>
                )}
            </div>

            <div className="section-body-2">
                <div className="article-information">
                    <h1 className="article-information-time">
                        {timeSince(article.createdAt)}
                    </h1>
                    <div className="article-information-social">
                        <a
                            href="https://www.facebook.com/people/Vitaliteti/61559428040819/?paipv=0&eav=Afb0SD5Y3vJk9wYbQkxaxrKJ53eDW0vG8txVjwMd7xXfuqLyZMsG6yQ9gV97Q8dn9W4&_rdr"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src={Facebook} alt="Facebook"/>
                        </a>
                        <Link href={''}>
                            <Image src={Twitter} alt="Twitter"/>
                        </Link>
                        <CopyButton />
                    </div>
                </div>

                <div className="section-body-2-text">
                    {article.fullDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph.children?.[0]?.text || ""}</p>
                    ))}
                </div>
            </div>

            <div className="section-two-header">
                <h1 className="section-two-header-title">
                    Ju gjithashtu mund te pelqeni
                </h1>
                <div className="section-two-header-link">
                    <Link href={''}
                          className="section-two-header-link-text"
                          // onClick={() => handleNavigateToRubrikat("Temat Javore")}
                    >
                        SHIKO TË GJITHA “TEMAT JAVORE”
                    </Link>
                    <Image src={Arrow} alt="Arrow"/>
                </div>
            </div>
            <div className="section-two-news">
                <div className="section-two-news-card">
                    <Image
                        src={NewsFourImageOne}
                        className="section-two-news-card-image"
                        alt="News 1"
                    />
                    <ContentButton category={'Temat Javore'}/>
                    <h1 className="section-two-news-card-title">
                        Ushqimet që i shmangin kardiologët
                    </h1>
                    <h1 className="section-two-news-card-text">
                        Kardiologët dëshmojnë rregullisht për efektet negative që ka
                        ushqyerja e dobët në shëndetin e zemrës së pacientëve të tyre. Dhe
                        derisa është në rregull shijimi i herëpashershëm i disa ushqimeve jo
                        ...
                    </h1>
                    <div className="section-two-news-card-time">
                        <Image src={MainNewsTime} alt="Time"/>
                        <h1 className="section-two-news-card-time-text">3 javë më parë</h1>
                    </div>
                </div>
                <div className="section-two-news-card">
                    <Image
                        src={NewsFourImageTwo}
                        className="section-two-news-card-image"
                        alt="News 2"
                    />
                    <ContentButton category={'Temat Javore'}/>
                    <h1 className="section-two-news-card-title">
                        Parandaloni alergjitë te fëmijët duke nisur ushqimet e forta që nga
                        muaji i katërt
                    </h1>
                    <h1 className="section-two-news-card-text">
                        Një studim i ri, zbulon se fëmijët që hanë ushqime të forta që nga
                        muaji i katërt i jetës, kanë më pak mundësi të përfitojnë alergji.
                    </h1>
                    <div className="section-two-news-card-time">
                        <Image src={MainNewsTime} alt="Time"/>
                        <h1 className="section-two-news-card-time-text">2 javë më parë</h1>
                    </div>
                </div>
                <div className="section-two-news-card">
                    <Image
                        src={NewsFourImageThree}
                        className="section-two-news-card-image"
                        alt="News 3"
                    />
                    <ContentButton category={'Temat Javore'}/>
                    <h1 className="section-two-news-card-title">
                        Këto janë disa ushqime që shpëtojnë mushkërinë
                    </h1>
                    <h1 className="section-two-news-card-text">
                        Mushkëritë janë pre e shumë kimikateve, që shkaktojnë një sërë
                        sëmundjesh të rrezikshme. Një prej substancave më të dëmshme për
                        mushkëritë është nikotina, të cilën e marrin jo vetëm
                        duhanpirësit...
                    </h1>
                    <div className="section-two-news-card-time">
                        <Image src={MainNewsTime} alt="Time"/>
                        <h1 className="section-two-news-card-time-text">1 javë më parë</h1>
                    </div>
                </div>
                <div className="section-two-news-card">
                    <Image
                        src={NewsFourImageFour}
                        className="section-two-news-card-image"
                        alt="News 4"
                    />
                    <ContentButton category={'Temat Javore'}/>
                    <h1 className="section-two-news-card-title">
                        Vitamina që duhet të merrni gjatë verës për shëndetin tuaj
                    </h1>
                    <h1 className="section-two-news-card-text">
                        Vera është një ndër stinët që duhet të kujdesemi më shumë për
                        organizmin tonë, pasi rrezet e forta të diellit dhe temp...
                    </h1>
                    <div className="section-two-news-card-time">
                        <Image src={MainNewsTime} alt="Time"/>
                        <h1 className="section-two-news-card-time-text">1 muaj më parë</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};