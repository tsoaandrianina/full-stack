import { useState, useEffect } from "react";
import "../../assets/style/Login.css";
import TrackVisibility from "react-on-screen";

export default function Bienvenu() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Bienvenu chez e-Sante"];
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [text]);
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(false);
            setIndex((prevIndex) => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };
    return (
        <div>
            <TrackVisibility>
                {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                        <h2>
                            {``} <br></br>{" "}
                            <span data-period="2000" data-rotate='[ "Web Developer"]'>
                                <span className="accueil__title">{text}</span>
                            </span>
                        </h2>
                    </div>
                )}
            </TrackVisibility>
        </div>

    );
}