import React, { useState, useRef } from 'react';
import './SpinWheel.css';

const SpinningWheel = ({ sections, onSpin }) => {
    const [spinning, setSpinning] = useState(false);
    const wheelRef = useRef(null);
    const [btnSpin, setBtn] = useState('Spin Me');
    const spin = () => {
        if (!spinning) {
            const randomDegree = Math.floor(Math.random() * 360); // Random degree for rotation
            const spins = 10; // Number of complete spins
            const totalRotation = 360 * spins + randomDegree;

            setSpinning(true);
            wheelRef.current.style.transition = 'transform 3s ease-out';
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

            setTimeout(() => {
                const selectedSection = Math.floor(randomDegree / (360 / sections.length));
                //setSpinning(false);
                onSpin(sections[selectedSection]);
            }, 3500); // Wait for 3.5 seconds to match the animation duration

        }
        setBtn('Spinned')
        // setSpinning(true)

    };

    return (
        <div className="spinning-wheel-container">
            <div className={`spinning-wheel ${spinning ? 'spinning' : ''}`} ref={wheelRef}>
                {sections.map((section, index) => (
                    <div className={`wheel-section section-${index}`} key={index}>
                        {'coins'}
                    </div>
                ))}
            </div>
            <button className="spin-button" onClick={spin} disabled={spinning}>
                {btnSpin}
            </button>
        </div>
    );
};

export default SpinningWheel;
