import React, { useState, useEffect, useContext } from "react";
import styles from './gameTable.module.css';
import QuestionJeopardy from "../questionJeopardy/questionJeopardy";
import { SignalRContext } from "@/app/SignalRContext";
const GameTable = (props) => {
    const { topic, questions, questionsText, questionsAnswers } = props.gameContent;
   
    //console.log(counter);
    
  
    //const [hasClicked, setHasClicked] = useState(false)

    const connection = useContext(SignalRContext);
    const [content, setContent] = useState(null);
    const [counter, setCounter] = useState(0);


    // Handle Question flag
    const [flag, setFlag] = useState(false);
    const [a, setA] = useState(null);
    const [b, setB] = useState(null);

    // OpenQuestion
    const [hasClicked, setHasClicked] = useState(false);


    const handleClick = (topicIndex, questionIndex) => {
        setFlag(true);
        setA(topicIndex);
        setB(questionIndex);    
    }
    connection.on("OpenQuestion", (tIndex, qIndex) => {
        setHasClicked(true);
        setContent(
            <QuestionJeopardy topicIndex={tIndex} questionIndex={qIndex} questionsList={questionsText} Answers={questionsAnswers} costList={questions} params={props.params} />
        );
        document.getElementById(`${tIndex}-${qIndex}`).style.visibility = 'hidden';
    });
    connection.on("QuestionResolve", () => {
        setContent(null)
    });

    useEffect(() => {
        if (flag) {
            connection.invoke("HandleQuestion", props.params[1], a, b);
            console.log("pizdec");
            setFlag(false);
        }
    }, [flag]);
    useEffect(() => {
        if (hasClicked) {
            setCounter(counter+1);
          
            
            const timeoutId = setTimeout(() => {
                setHasClicked(false)
            }, 5000) 
            return () => clearTimeout(timeoutId)
        }
    }, [hasClicked]);

    useEffect(() => {
        console.log(counter);
        if (counter == questions.length)
            connection.invoke("ChangeRound", props.params[1]);
    }, [counter]);

    return (
        <>
            {content}
            <div className={styles['game-container']}>
                <div className={styles['topic-container']}>
                    {topic.map((topic, index) => {
                        return (
                            <div className={styles['game-card']}>{topic}</div>
                        );
                    })}
                </div>
                <div className={styles['questions-container']}>
                    {questions.map((elem, index) => {
                        return (
                            <div className={styles['string-container']}>
                                {Object.values(elem).map((value, elemIndex) => {
                                    return <div key={index} id={`${index}-${elemIndex}`} className={styles['game-card']} onClick={() => handleClick(index, elemIndex)}>{value}</div>;
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default GameTable;