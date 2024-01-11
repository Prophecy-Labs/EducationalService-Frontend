'use client'
import React from "react";
import styles from "./main-page.module.css";
import Header from "@/components/header/header";
import GameCard from "@/components/gameCard/gameCard";
import Footer from "@/components/footer/footer";
import { SignalRContext } from "@/app/SignalRContext";
import { useContext, useEffect, useState } from 'react'
export default function MainPage({ params }) {
    //const context = useContext(SignalRContext);
    const id = params.id;
    const accessToken = localStorage.getItem("token");
    let [gameList, setGameList] = useState([]);
  
    useEffect(() => {
        fetch(`/api/${id}/jeopardy`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    console.log(data)
                    setGameList(data.map(game => game.name));;
                }
            });
    }, []);
    return(
        <>
        
            <Header id={ id } />
            <div className={styles['container']}>
                {gameList.map((game) => {
                    return (
                        <GameCard
                            gameName="Своя игра"
                            gameDescr={game}
                            image={require('../../../img/jeopardy.svg')}
                            gameType="test"
                            teacherName={ id }
                        />
                    );
                })}
            </div>
            <Footer />
        </>
    );
}