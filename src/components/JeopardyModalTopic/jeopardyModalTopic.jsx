import React, { useState } from "react";
import styles from './jeopardyModalTopic.module.css';
import classNames from "classnames";

export const JeopardyModalTopic = (props) => {
    //не забудь установить classNames
    const { openModal, topicPlus, setOpenModal, gamePack, setGamePack, activeRound } = props;

    const [newTopic, setNewTopic] = useState("");

    const handleInputChange = (e) => {
        setNewTopic(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        topicPlus(newTopic);
        gamePack[activeRound].push({ topic: { title: newTopic, round: activeRound }, questionPack: [] });
        //setGamePack(gamePack);
        console.log(gamePack);
        setNewTopic("");
        setOpenModal(false);
    };
    
    return (
        <div className={classNames(styles['modal-container'], {[styles['open']]: openModal})}>
            <div className={styles['modal-description']}>
                <button className={styles['close-btn']} onClick={() => setOpenModal(false)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3166 12.3922L24.0874 3.62137C24.8944 2.8143 24.8961 1.50352 24.0887 0.696075C23.2829 -0.109727 21.9715 -0.1108 21.1634 0.69735L12.3926 9.46813L3.6218 0.69735C2.81473 -0.10972 1.50395 -0.11137 0.696503 0.696075C-0.109299 1.50188 -0.110373 2.81322 0.697777 3.62137L9.46856 12.3922L0.697777 21.1629C-0.109292 21.97 -0.110942 23.2808 0.696503 24.0882C1.5023 24.894 2.81365 24.8951 3.6218 24.087L12.3926 15.3162L21.1634 24.087C21.9704 24.894 23.2812 24.8957 24.0887 24.0882C24.8945 23.2824 24.8955 21.9711 24.0874 21.1629L15.3166 12.3922Z" fill="#3A3A3A"/>
                </svg></button>
                <form className={styles['form-modal']} onSubmit={handleSubmit}>
                    <div className={styles['new-answer']}>
                        <span className={styles['new-title']}>Название темы</span>
                        <input type='text' className={styles['input-answer']} value={newTopic} placeholder='введите ответ на вопрос' onChange={handleInputChange} />
                    </div>
                    <button className={styles['submit-btn']} type='submit'>Применить</button>
                </form>
            </div>
        </div>
    )
}