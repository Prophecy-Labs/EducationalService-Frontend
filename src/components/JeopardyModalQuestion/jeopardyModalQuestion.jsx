import React, { useState } from "react";
import styles from './jeopardyModalQuestion.module.css';
import classNames from "classnames";

export const JeopardyModalQuestion = (props) => {
    //не забудь установить classNames
    const { openModal, questionPlus, setOpenModal, gamePack, setGamePack, questionId, topicId, activeRound } = props;

    const [newQuestion, setNewQuestion] = useState('');//только этот используется
    const [newAnswer, setNewAnswer] = useState('');

    const handleTextareaChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleInputChange = (e) => {
        setNewAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        gamePack[activeRound][topicId].questionPack.push({ text: newQuestion, answer: newAnswer, reward: parseInt(questionId.substr(1)), image: "", music: ""});
        questionPlus(newQuestion);
        setNewQuestion('');
        setNewAnswer('');
        setOpenModal(false);
    }
    
    return (
        <div className={classNames(styles['modal-container'], {[styles['open']]: openModal})}>
            <div className={styles['modal-description']}>
                <button className={styles['close-btn']} onClick={() => setOpenModal(false)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3166 12.3922L24.0874 3.62137C24.8944 2.8143 24.8961 1.50352 24.0887 0.696075C23.2829 -0.109727 21.9715 -0.1108 21.1634 0.69735L12.3926 9.46813L3.6218 0.69735C2.81473 -0.10972 1.50395 -0.11137 0.696503 0.696075C-0.109299 1.50188 -0.110373 2.81322 0.697777 3.62137L9.46856 12.3922L0.697777 21.1629C-0.109292 21.97 -0.110942 23.2808 0.696503 24.0882C1.5023 24.894 2.81365 24.8951 3.6218 24.087L12.3926 15.3162L21.1634 24.087C21.9704 24.894 23.2812 24.8957 24.0887 24.0882C24.8945 23.2824 24.8955 21.9711 24.0874 21.1629L15.3166 12.3922Z" fill="#3A3A3A"/>
                </svg></button>
                <form className={styles['form-modal']} onSubmit={handleSubmit}>
                    <div className={styles['new-question']}>
                        <span className={styles['new-title']}>вопрос</span>
                        <input className={styles['textarea-question']} value={newQuestion} placeholder="введите вопрос" onChange={handleTextareaChange} required />
                    </div>
                    <div className={styles['new-answer']}>
                        <span className={styles['new-title']}>ответ</span>
                        <input type='text' className={styles['input-answer']} value={newAnswer} placeholder='введите ответ на вопрос' onChange={handleInputChange} required />
                    </div>
                    <div className={styles['bottom-modal']}>
                        <div className={styles['custom-checkbox']}>
                            <label>
                                Аукцион
                                <input className={styles['checkbox-hidden']} type='checkbox' />
                                <div className={styles['checkbox']}>
                                    <svg className={styles['checkmark']} xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none">
                                <path d="M21.373 0.756427L10.6398 11.4937C10.5223 11.6039 10.3672 11.6652 10.2061 11.6652C10.045 11.6652 9.88988 11.6039 9.77233 11.4937L3.6344 5.35578C3.45335 5.13278 3.22738 4.95039 2.97119 4.8205C2.71499 4.69061 2.43431 4.61612 2.14743 4.60187C1.86054 4.58763 1.57386 4.63396 1.30606 4.73784C1.03826 4.84172 0.795335 5.00082 0.593092 5.2048C0.39085 5.40877 0.233824 5.65305 0.132234 5.92173C0.0306436 6.1904 -0.0132336 6.47746 0.00345712 6.76422C0.0201479 7.05098 0.0970329 7.33101 0.229108 7.58608C0.361184 7.84116 0.545489 8.06557 0.77003 8.2447L8.75753 16.2527C8.81798 16.3154 8.88369 16.3729 8.95394 16.4245L9.00713 16.4613C9.06095 16.5065 9.12003 16.545 9.18309 16.5759C9.33345 16.6668 9.49605 16.7357 9.66594 16.7805C9.76661 16.8075 9.86921 16.8267 9.97283 16.8378C10.0491 16.8431 10.1257 16.8431 10.202 16.8378H10.4311C10.5527 16.8215 10.673 16.7969 10.7912 16.7642C10.9181 16.7243 11.0413 16.6736 11.1595 16.6127C11.2772 16.5468 11.3894 16.4715 11.495 16.3877C11.5484 16.346 11.599 16.3009 11.6464 16.2527L24.2578 3.64535C24.4824 3.46621 24.6667 3.2418 24.7988 2.98673C24.9308 2.73165 25.0077 2.45162 25.0244 2.16486C25.0411 1.87811 24.9972 1.59105 24.8956 1.32237C24.7941 1.05369 24.637 0.809416 24.4348 0.60544C24.2325 0.401464 23.9896 0.242359 23.7218 0.138479C23.454 0.0345998 23.1673 -0.0117259 22.8805 0.00251683C22.5936 0.0167596 22.3129 0.0912517 22.0567 0.221145C21.8005 0.351039 21.5745 0.533422 21.3935 0.756427H21.373Z" fill="#64DC97"/>
                                </svg>
                                </div>
                            </label>
                        </div>
                        <div className={styles['custom-checkbox']}>
                            <label>
                                Кот в мешке
                                <input className={styles['checkbox-hidden']} type='checkbox' />
                                <div className={styles['checkbox']}>
                                    <svg className={styles['checkmark']} xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none">
                                <path d="M21.373 0.756427L10.6398 11.4937C10.5223 11.6039 10.3672 11.6652 10.2061 11.6652C10.045 11.6652 9.88988 11.6039 9.77233 11.4937L3.6344 5.35578C3.45335 5.13278 3.22738 4.95039 2.97119 4.8205C2.71499 4.69061 2.43431 4.61612 2.14743 4.60187C1.86054 4.58763 1.57386 4.63396 1.30606 4.73784C1.03826 4.84172 0.795335 5.00082 0.593092 5.2048C0.39085 5.40877 0.233824 5.65305 0.132234 5.92173C0.0306436 6.1904 -0.0132336 6.47746 0.00345712 6.76422C0.0201479 7.05098 0.0970329 7.33101 0.229108 7.58608C0.361184 7.84116 0.545489 8.06557 0.77003 8.2447L8.75753 16.2527C8.81798 16.3154 8.88369 16.3729 8.95394 16.4245L9.00713 16.4613C9.06095 16.5065 9.12003 16.545 9.18309 16.5759C9.33345 16.6668 9.49605 16.7357 9.66594 16.7805C9.76661 16.8075 9.86921 16.8267 9.97283 16.8378C10.0491 16.8431 10.1257 16.8431 10.202 16.8378H10.4311C10.5527 16.8215 10.673 16.7969 10.7912 16.7642C10.9181 16.7243 11.0413 16.6736 11.1595 16.6127C11.2772 16.5468 11.3894 16.4715 11.495 16.3877C11.5484 16.346 11.599 16.3009 11.6464 16.2527L24.2578 3.64535C24.4824 3.46621 24.6667 3.2418 24.7988 2.98673C24.9308 2.73165 25.0077 2.45162 25.0244 2.16486C25.0411 1.87811 24.9972 1.59105 24.8956 1.32237C24.7941 1.05369 24.637 0.809416 24.4348 0.60544C24.2325 0.401464 23.9896 0.242359 23.7218 0.138479C23.454 0.0345998 23.1673 -0.0117259 22.8805 0.00251683C22.5936 0.0167596 22.3129 0.0912517 22.0567 0.221145C21.8005 0.351039 21.5745 0.533422 21.3935 0.756427H21.373Z" fill="#64DC97"/>
                                </svg>
                                </div>
                            </label>
                        </div>
                        <button className={styles['submit-btn']} type='submit'>Применить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}