import React, { useEffect, useState } from "react";
import styles from './jeopardyPriceEditor.module.css';

export const JeopardyPriceEditor = (props) => {

    const {content} = props;

    return (
        <div className={styles['price-container']}>
            {content.map((value, id) => {
                return (
                    <span key={id} className={styles['top-text']}>{value}</span>
                )
            })}
        </div>
    )//в конце дополнительное окно создано для того, чтобы grid не смещался, если вопросов меньше 6
}