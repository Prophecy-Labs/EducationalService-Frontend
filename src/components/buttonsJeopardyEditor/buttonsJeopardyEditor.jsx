import React from "react";
import styles from './buttonsJeopardyEditor.module.css';

export const ButtonsJeopardyEditor = (props) => {

    let { setActiveRound, setTopics, topicRounds, questionsRounds, setQuestionText } = props;

    const handleClick = (num) => {
        return () => {
            setActiveRound(num);
            setTopics(topicRounds[num]);
            setQuestionText(questionsRounds[num]);
        //    console.log(round);
        }
    }

    return (
        <div className={styles['container']}>
            <span>Выбор раунда</span>
            <div className={styles['buttons-container']}>
                <button className={styles['round-btn']} onClick={handleClick(1)}>1</button>
                <button className={styles['round-btn']} onClick={handleClick(2)}>2</button>
                <button className={styles['round-btn']} onClick={handleClick(3)}>3</button>
            </div>
        </div>
    )
}