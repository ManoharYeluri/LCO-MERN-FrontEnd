import React from "react";
import "../styles.css";
import Base from "./Base";
import IWRITECODE from "../assets/images/iwritecode.jpg"

export default function Home() {
    return (
        <Base title="Home Page" description="Welcome to the T-shirt store">
            <div className="hero-image">
                <img src={IWRITECODE} alt="I Write Code" />
            </div>
        </Base>
    )
}