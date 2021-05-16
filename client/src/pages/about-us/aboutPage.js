import React from 'react'
import titles from "../../modules/titles.module.css";
import numbers from "../../modules/numbers.module.css";

import './aboutPage.css'
import {Header} from "../../components/header/header";
import {Dots} from "../../components/dots/dots";
import {Footer} from "../../components/footer/footer";
import ParticlesComponent from "../../components/particles-background/ParticlesComponent";
export const AboutPage = () => {


    return (
        <>
            <Header/>
            <div className="content">
                <Dots/>
                <div className="left-side">
                    <div className="about-club">
                        <h2 className={titles.sub_title}>
                            Приходи и отдыхай с друзьями
                        </h2>
                        <h1 className={titles.about_title}>
                            Первый компьютерный клуб <span>в Запорожье</span>
                        </h1>
                        <p className="title-text">
                            Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.
                        </p>
                    </div>

                    <div className="about-club-in-numbers">
                        <h2 className={titles.title}>О “Gaming <span>Club</span>” в цифрах</h2>
                        <div className="item item_1">
                            <div className={numbers.gm_in_numbers}>20</div>
                            <div className="text">комьютеров в VIP-ZONE</div>
                        </div>
                        <div className="item item_2">
                            <div className={numbers.gm_in_numbers}>68</div>
                            <div className="text">комьютеров в Standard-ZONE</div>
                        </div>
                        <div className="item item_3">
                            <div className={numbers.gm_in_numbers}>4</div>
                            <div className="text">PS4 pro для игры с друзьями</div>
                        </div>
                        <div className="item item_4">
                            <div className={numbers.gm_in_numbers}>40+</div>
                            <div className="text">лан-турниров </div>
                        </div>
                    </div>
                    {/*<div className="news">*/}
                    {/*    <h2 className={titles.title}>Что у нас тут <div>новенького</div>?</h2>*/}
                    {/*    <div className="news_item news_item_1">ZP Fast CUP 5 vs 5</div>*/}
                    {/*    <div className="news_item news_item_2">standard-zone</div>*/}
                    {/*</div>*/}
                </div>
                {/*<Slider />*/}
            </div>
            <Footer/>
            <ParticlesComponent />
        </>
    )
}
