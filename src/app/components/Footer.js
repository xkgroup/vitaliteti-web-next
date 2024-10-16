import React from "react";
import Logo from "./../assets/FooterLogo.png";
import Facebook from "./../assets/FooterFacebook.png";
import Twitter from "./../assets/FooterTwitter.png";
import Instagram from "./../assets/FooterInstagram.png";
import Youtube from "./../assets/FooterYoutube.png";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-body">
        <div className="footer-info">
          <Image alt={"alt"} src={Logo} className="footer-logo" />
          <button className="footer-button">
            <h1 className="footer-button-text">Newsletters</h1>
          </button>
          <h1 className="footer-info-follow">Follow us</h1>
          <div className="footer-info-social">
            <a
              href="https://www.facebook.com/people/Vitaliteti/61559428040819/?paipv=0&eav=Afb0SD5Y3vJk9wYbQkxaxrKJ53eDW0vG8txVjwMd7xXfuqLyZMsG6yQ9gV97Q8dn9W4&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={"alt"}
                src={Facebook}
                className="footer-info-social-logo"
              />
            </a>

            <Link href={""}>
              <Image alt={"alt"} src={Twitter} />
            </Link>
            <Link href={""}>
              <Image alt={"alt"} src={Instagram} />
            </Link>
            <Link href={""}>
              <Image alt={"alt"} src={Youtube} />
            </Link>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-links-column">
            <Link
              href="/rubrikat/keshilla-mjekesore"
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Keshilla Mjekësore</h1>
            </Link>
            <Link
              href="/rubrikat/ushqimi-dhe-dieta"
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Ushqimi dhe Dieta</h1>
            </Link>
            <Link
              href="/rubrikat/psikologji"
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Psikologji</h1>
            </Link>
            <Link
              href="/rubrikat/shendetesi-lajme"
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Shendetsi dhe lajme</h1>
            </Link>
            <Link
              href="/rubrikat/temat-javore"
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Temat javore</h1>
            </Link>
            <Link
              href={""}
              // onClick={() =>
              //     window.scrollTo({
              //         top: 0,
              //         behavior: "smooth",
              //     })
              // }
              className="footer-links-column-link"
            >
              <h1 className="footer-links-column-text">Te tjera</h1>
            </Link>
          </div>
          <div className="footer-links-column">
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">About us</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">Editorial Process</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">Privacy Policy</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">Terms of Service</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">Advertise</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text2">
                Your Privacy Choices
              </h1>
            </Link>
          </div>
          <div className="footer-links-column">
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text">Medical Expert Board</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text">Anti-Racism Pledge</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text">Product Vetting</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text">Careers</h1>
            </Link>
            <Link href={""} className="footer-links-column-link">
              <h1 className="footer-links-column-text">Contact</h1>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="footer-end-text">
          Përmbajtja e Vitaliteti është vetëm për qëllime informative dhe
          edukative. Faqja jonë e internetit nuk ka për qëllim të jetë një
          zëvendësim për këshilla profesionale mjekësore, diagnozë ose trajtim.
        </p>
      </div>
    </div>
  );
};

export default Footer;
