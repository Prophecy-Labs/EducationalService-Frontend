'use client'
import React, { useEffect, useState, useContext } from "react";
import styles from './Jeopardy.module.css';
import { HeaderLobby } from "@/components/headerLobby/HeaderLobby";
import Footer from "@/components/footer/footer";
import GameTable from "@/components/gameTable/gameTable";
import StudListJeopardy from "@/components/studentListJeopardy/studentListJeopardy";
import { SignalRContext } from "@/app/SignalRContext";
import { useParams } from 'next/navigation'
const Jeopardy = ({ params }) => {

    const connection = useContext(SignalRContext);
    const [code, gameID] = params.slug;
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");
    //const params = useParams < { tag: string; item: string } > ()
    //все данные о игре брать с пропса или с бд
    //если пропс, то передавать лучше props.gameInformation = gameInfornation
    //потом прописать const {data} = props.gameInformation, легче будет:)
   // const gameName = 'биология 9б царство грибов';
    const [gameName, setGameName] = useState("");
    const questions1 = {
        0: '100'
    }
    const qn1 = {
        0: 'Какой гриб самый крутой?11'
    }
    let [studList, setStudList] = useState([]);
    const [gameContent, setGameContent] = useState({
        topic: ['тема1'],
        questions: [questions1],
        questionsText: [qn1]
    });
    const changeContent = (content) => {
        setGameContent(content);
    }; 

  

    const [teacher, setTeacher] = useState(true);
    const [teacherName, setTeacherName] = useState(null);
    const [content, setContent] = useState(null);

   // const [hasChanged, setHasChanged] = useState(false);

    const [hasChanged, setHasChanged] = useState(false);
    const [activeRound, setActiveRound] = useState(0);
    const [GamePack, setGamePack] = useState(null);

    connection.on("Notify", (data) => {
        setTeacherName(data.userName);
        //console.log(data.players.map(player => ({ name: player.name, score: player.score })));
        setStudList(data.players.map(player => ({ name: player.name, score: player.score })));

    });
    connection.on("SwitchRound", () => {
        setHasChanged(true);
    });

    useEffect(() => {
        if (hasChanged) {
            setActiveRound(activeRound => activeRound + 1);
            console.log("Dobralis do pervoy huyni " + activeRound);
            const timeoutId = setTimeout(() => {
                setHasChanged(false)
            }, 5000)
            return () => clearTimeout(timeoutId)
        }
    }, [hasChanged]);

    useEffect(() => {
        console.log(activeRound);
        if (GamePack != undefined) {
            changeContent(GamePack[activeRound]);
            let cards = document.querySelectorAll(".gameTable_game-card-topic___rKrM");
            cards.forEach(card => {
                card.style.visibility = 'visible';
            });
        }
    }, [activeRound]);

    useEffect(() => {
        if (GamePack)
            changeContent(GamePack[0]);
    }, [GamePack]);

    useEffect(() => {
        connection.invoke("GetHubInfo", code);
        
        fetch(`http://localhost:5000/api/gamepack/${gameID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
           // body: JSON.stringify({ login:"pepega", name:"jeopardy_test"})
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data.topicPacks.map(topicPack => topicPack.questionPack.map(question => question.reward)))
                //GamePack = {
                //    topic: data.topicPacks.map(topicPack => topicPack.topic.title),
                //    questions: data.topicPacks.map(topicPack => topicPack.questionPack.map(question => question.reward)),
                //    questionsText: data.topicPacks.map(topicPack => topicPack.questionPack.map(question => question.text)),
                //    questionsAnswers: data.topicPacks.map(topicPack => topicPack.questionPack.map(question => question.answer))
                //}

                let rounds = [1, 2, 3];


                setGamePack(
                    rounds.map(round => {
                    let temp = {
                        topic: [],
                        questions: [],
                        questionsText: [],
                        questionsAnswers: []
                    };

                    data.topicPacks.forEach(pack => {
                        if (pack.topic.round === round) {
                            temp.topic.push(pack.topic.title);
                            temp.questions.push(pack.questionPack.map(question => question.reward));
                            temp.questionsText.push(pack.questionPack.map(question => question.text));
                            temp.questionsAnswers.push(pack.questionPack.map(question => question.answer));
                        }
                    });
                    return temp;

                }));
                setGameName(data.game.name);
            });


        if (teacher){
            setContent(
                <button className={styles['btn-end']}>завершить сессию</button>
            )
        } else {
            setContent();
        }
    }, []);

    return (
        <>
            <HeaderLobby />
            {content}
            <div className={styles['container']}>
                <p className={styles['game-title']}>{gameName} Раунд {activeRound+1}</p>
                <GameTable gameContent={gameContent} params={[name, code, role]} />
                <StudListJeopardy studList={studList} teacherName={teacherName} className={styles['stud-list']} />
            </div>
            <Footer/>
        </>
    );
}

export default Jeopardy;