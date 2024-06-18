import React from "react";
import headerImg from "../../assets/img/headers.png";
import TrackVisibility from "react-on-screen";
import "../../assets/style/Login.css";

export default function Bienvenu() {
    return (
        <div>
            <TrackVisibility>
                <div className="imagelogin">
                    <img src={headerImg} alt="Header Img" className="Image" />
                </div>
            </TrackVisibility>
        </div>
    );
}