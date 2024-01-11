import React, { useEffect } from "react";
import styles from './jeopardyQuestionTable.module.css';

export const JeopardyQuestionTable = (props) => {

    const fillRemainingSpaces = (row, rowLength, topicID) => {//эта штука отвечает за вывод плюсов или вопросов
        let spaces = [];
        for (let i = 0; i < rowLength; i++) {
            if (!row.hasOwnProperty('q' + (100 * (i+1)))) {
                spaces.push(
                    <button className={styles['question-plus']} onClick={() => createQuestion(topicID, 'q' + (100 * (i+1)))}><span>+</span></button>
                );
            } else {
                spaces.push(
                    <div key={'q' + (100 * (i+1))} className={styles['question-card']}>{row['q' + (100 * (i+1))]}
                    <button className={styles['delete-question__btn']} onClick={() => handleDeleteQuestion(topicID, 'q' + (100 * (i+1)))}>Удалить</button>
                    </div>
                )
            }
        }
        return spaces;
    }

    const { questionText, createQuestion, setQuestionText, activeRound, gamePack } = props;

    const handleDeleteQuestion = (topicID, questionId) => {
        setQuestionText(prevQuestions => {
            const index = prevQuestions.findIndex(q => q[questionId]);
            gamePack[activeRound][topicId].questionPack = gamePack[activeRound][topicId].questionPack.filter(function (item) {
                return item.questionId !== questionId;
            });
            if (index !== -1) {
                const updatedQuestion = {...prevQuestions[topicID]};
                delete updatedQuestion[questionId];
    
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[topicID] = updatedQuestion;
    
                return updatedQuestions;
            }
            return prevQuestions;
        });
    }

    return (
        <div className={styles['question-table']}>
            {questionText.map((questions, id) => {
                const spaces = fillRemainingSpaces(questions, 6, id);
                return (
                    <div key={id} className={styles['string-content']}>
                        {spaces}
                    </div>
                )
            })}
        </div>
    )
}