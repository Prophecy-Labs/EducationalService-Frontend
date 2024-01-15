'use client'
import React, { useEffect, useState } from "react";
import styles from './Editor.module.css';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Head from "next/head";
import { JeopardyTopicEditor } from "@/components/JeopardyTopicEditor/jeopardyTopicEditor";
import { JeopardyPriceEditor } from "@/components/JeopardyPriceEditor/jeopardyPriceEditor";
import { JeopardyQuestionTable } from "@/components/JeopardyQuestionTable/jeopardyQuestionTable";
import { JeopardyModalQuestion } from "@/components/JeopardyModalQuestion/jeopardyModalQuestion";
import { JeopardyModalTopic } from "@/components/JeopardyModalTopic/jeopardyModalTopic";
import { ButtonsJeopardyEditor } from "@/components/buttonsJeopardyEditor/buttonsJeopardyEditor";
import { useRouter } from 'next/navigation';
const Editor = ({ params }) => {
    const router = useRouter();
    const id = params.slug[0];
    const accessToken = localStorage.getItem("token");
    //console.log(id);
    const [gamePack, setGamePack] = useState({ '1':[], '2':[], '3':[] });
    const [topicRounds, setTopicRounds] = useState({
        '1': [],
        '2': [],
        '3': []
    });
    const [questionsRounds, setQuestionsRounds] = useState({
        '1': [],
        '2': [],
        '3': []
    });
    const [activeRound, setActiveRound] = useState(1);
    //всё переделано в useState, чтобы можно было добавлять новые темы и вопросы
    const [topics, setTopics] = useState(topicRounds[activeRound]);
    const [questionText, setQuestionText] = useState(questionsRounds[activeRound]);
    //обращение к элементам не изменилось

    const [openModalQuestion, setOpenModalQuestion] = useState(false);
    const [openModalTopic, setOpenModalTopic] = useState(false);

    //добавление новой темы
    const topicPlus = (newTopic) => {
        const newTopics = [...topics, newTopic];

        questionsRounds[activeRound] = [...questionText, {}];
        setQuestionsRounds(questionsRounds);
        setQuestionText(questionsRounds[activeRound]);

        topicRounds[activeRound] = newTopics;
        setTopicRounds(topicRounds);
        setTopics(topicRounds[activeRound]);

       // console.log(topicRounds);
        //console.log(activeRound);
    }


    const [questionId, setQuestionId] = useState(-1);
    const [topicId, setTopicId] = useState(-1);
    //добавление нового вопроса
    const questionPlus = (newQuestion) => {
        if (questionId !== -1 && topicId !== -1) {


           // const newQuestions = [...questionsRounds[activeRound]];
            //newQuestions[topicId] ||= {};
            questionsRounds[activeRound][topicId][questionId] = newQuestion;

            setQuestionsRounds(questionsRounds);
            //topicRounds[activeRound][topicId][questionId] = newQuestion;
            setQuestionText(questionsRounds[activeRound]);
        }
    }

    const createQuestion = (topicId, questionId) => {
        setOpenModalQuestion(true);
        setQuestionId(questionId);
        setTopicId(topicId);
    }

    const saveGame = () => {
        const name = document.getElementById(`name-input`).value;
        fetch(`http://localhost:5000/api/gamepack/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                game: { name: name }, topicPacks: gamePack[1].concat(gamePack[2].concat(gamePack[3]))
            })
        })
            .then(response => response.json())
            .then(data => {
            });
        router.push(`/main-page/${id}`);
    }

    const content = ['100', '200', '300', '400', '500', '600'];

    return (
        <>
            <Header />
            <JeopardyModalQuestion 
                openModal={openModalQuestion}
                questionPlus={questionPlus}
                setOpenModal={setOpenModalQuestion}
                questionId={questionId}
                topicId={topicId}
                gamePack={gamePack}
                setGamePack={setGamePack}
                activeRound={activeRound}
            />
            <JeopardyModalTopic openModal={openModalTopic} topicPlus={topicPlus} setOpenModal={setOpenModalTopic} gamePack={gamePack}
                setGamePack={setGamePack} activeRound={activeRound} />
            <main className={styles['main-container']}>
                <JeopardyTopicEditor 
                    topics={topics}
                    setOpenModal={setOpenModalTopic}
                    setTopics={setTopics}
                    setQuestionText={setQuestionText}
                    questionText={questionText}
                    activeRound={activeRound}
                    gamePack={gamePack}
                        />
                <div className={styles['question-container']}>
                    <JeopardyPriceEditor content={content} />
                    <JeopardyQuestionTable
                        questionText={questionText}
                        setQuestionText={setQuestionText}
                        createQuestion={createQuestion}
                        activeRound={activeRound}
                        gamePack={gamePack}                    />
                </div>
                <ButtonsJeopardyEditor setActiveRound={setActiveRound} topicRounds={topicRounds} questionsRounds={questionsRounds} setQuestionText={setQuestionText} setTopics={setTopics} />
            </main>
            <div className={styles['game-settings']}>
                <label>
                    <input type="text" id="name-input" placeholder="введите название игры" className={styles['game-name__input']} />
                </label>
                <button className={styles['save__btn']} onClick={saveGame}>сохранить игру</button>
            </div>
            <Footer />
        </>
    );
}

export default Editor;