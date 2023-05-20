import React from 'react';
import './HeroSection.css';

function HeroSection({
    lightBg,
    lightText,
    img2,
    lightTextDesc,
    headline,
    description,
    img,
    alt,
    sub2,
    imgStart
}) {
    return (
        <>
            <div
                className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
            >
                <div className='container'>
                    <div
                        className='row home__hero-row'
                        style={{
                            display: 'flex',
                            flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
                        }}
                    >
                        <div className='col'>
                            <div className='home__hero-text-wrapper'>
                                <h1 className={lightText ? 'heading' : 'heading dark'}>
                                    {headline}
                                </h1>
                                <p
                                    className={
                                        lightTextDesc
                                            ? 'home__hero-subtitle'
                                            : 'home__hero-subtitle dark sub2'
                                    }
                                >
                                    {description}
                                </p>

                            </div>
                        </div>
                        <div className='col'>
                            <div className={
                                img2 ? 'home__hero-img-wrapper img2' : 'home__hero-img-wrapper'
                            }
                                >
                                <img src={img} alt={alt} className={
                                    img2 ? 'home__hero-img img2' : 'home__hero-img'
                                } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;