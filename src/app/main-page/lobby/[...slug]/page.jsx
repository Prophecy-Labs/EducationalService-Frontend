'use client'
import React, { useEffect, useState, useContext } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from './lobby.module.css';
import StudentList from "@/components/student-list/student-list";
import LobbyView from "@/components/lobbyView/lobbyView";
import LobbyViewStud from "@/components/LobbyVeiwForStudent/lobbyStudView";
import { useRouter } from 'next/navigation';
import { SignalRContext } from "@/app/SignalRContext";

export default function Lobby({ params }) {

    const router = useRouter();
    const [students, setStudents] = useState([]);
  //  const id = params.slug[0]
    const connectionCode = params.slug[0];
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");
    const addStudent = () => {
        setStudents([...students]);
    };
   // const [gameName, setGameName] = useState("");
    
    
    const [gameInformation, setGameInformation] = useState(
        {
        gameTitle: '',
        GameName: '',
        description: '',
        image: require('../../../../img/jeopardy.svg'),
    });
    const connection = useContext(SignalRContext);

    const [teacherName, setTeacherName] = useState('');
    let GameID = undefined;
    const [member, setMember] = useState(role);
    const [container, setContainer] = useState(null);
    useEffect(() => {
        if (connection && connection._connectionState == "Disconnected") {
            connection.start()
                .then(() => {
                    connection.invoke("JoinTeam", connectionCode, name, role);
                    connection.on("Notify", (object) => {
                        console.log(object);
                        setTeacherName(object.userName);
                        students.splice(0, students.length);
                        students.push(...object.players.map(item => item.name));
                        addStudent();
                        GameID = object.gameID;
                        setGameInformation(
                            {
                                gameTitle: 'своя игра',
                                name: object.gameName,
                                description: '',
                                image: require('../../../../img/jeopardy.svg'),
                            }
                        );
                        //console.log(teacherName);
                    });
                });
    }
       
        connection.on("GamePush", () => {
            router.push(`/main-page/jeopardy/${connectionCode}/${GameID}`);
        })
            
        
    }, []);

    useEffect(() => {
        const startGame = () => {
            connection.invoke("StartGame", connectionCode);
        }
        if (member === 'teacher') {
            setContainer(
                <div className="left-container">
                    <span className={styles["top-span"]}>КОД ПОДКЛЮЧЕНИЯ: {connectionCode}</span>
                    <div className={styles['game-settings']}>
                        <button className={styles['btn-start']} onClick={startGame}>Начать сессию</button>
                        <LobbyView data={gameInformation} />
                        <button className={styles['btn-end']}>закрыть сессию</button>
                    </div>
                </div>
            );
        } else {
            setContainer(
                <div className="left-container">
                    <span className={styles['top-span']}>Организатор: {teacherName}</span>
                    <div className={styles['game-settings']}>
                        <LobbyViewStud data={gameInformation} />
                        <button className={styles['disconnect-btn']}>отключиться</button>
                    </div>
                </div>
            );
        }
    }, [teacherName, gameInformation]);

    //заменить gameInformation = {} на {gameInformation} = props, в котором данные будут так же написаны, их можно получить в gameCard и передать в лобби.(пример такого присвоения есть в gameView.jsx)

    return (
        <>
           
            <Header />
                    <div className={styles['container']}>
                        {container}
                        <StudentList students={students} className={styles['student-list']} />
                    </div>
                <Footer />
        </>
    )
}