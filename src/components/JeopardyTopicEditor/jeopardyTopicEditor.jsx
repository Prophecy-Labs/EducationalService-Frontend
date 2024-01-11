import React, { useEffect, useState } from "react";
import styles from './jeopardyTopicEditor.module.css';

export const JeopardyTopicEditor = (props) => {

    const {topics, setOpenModal, setTopics, setQuestionText, questionText, gamePack, activeRound} = props;
    const [content, setContent] = useState(null);
    useEffect(() => {
        if (topics.length < 6) {
            setContent (
                <button className={styles['topic-plus']} onClick={() => setOpenModal(true)}><span>+</span></button>
            )
        } else {
            setContent(null);
        }
    }, [topics]);

    const handleDeleteTopic = (id) => {
        const updatedTopics = topics.filter((topic, index) => index !== id); 
        const updatedQuestions = questionText.filter((question, index) => index !== id);
        gamePack[activeRound].splice(id, 1);
        setQuestionText(updatedQuestions);
        setTopics(updatedTopics);
    }


    return (
        <div className={styles['topic-container']}>
            <span className={styles['top-text']}>тема</span>
            {topics.map((topic, id) => {
                return (
                    <div key={id} className={styles['topic-card']}>
                        {topic}
                        <button className={styles['delete-topic__btn']} onClick={() => handleDeleteTopic(id)}>Удалить</button>
                    </div>
                )
            })}
            {content}
        </div>
    )
}