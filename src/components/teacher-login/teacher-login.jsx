'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import Button from "@/components/Button/button.jsx";
import styles from "./teacher-login.module.css";
import Label from "@/components/Label/label.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const router = useRouter();
    const onSubmit = (data) => {
        const name = data.name;
        fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", name);
                router.push(`/main-page/${data.id}`);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    };

    return (
        <form className={`${styles.register__form}`} onSubmit={handleSubmit(onSubmit)}>
            <Label text={'логин'}
                   htmlFor={'login'}></Label>
            <input
                id="login"
                type="text"
                {...register("name", { required: true })}
                className={styles.register__input}
            />

            <Label text={'пароль'} htmlFor={'password'}></Label>
            <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className={styles.register__input}
            />

            {errors.login && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <Button type="submit">вход</Button>
            <button className={styles.btn__lower} onClick={props.changeForm}>регистрация</button>
            <button className={styles.btn__lower} onClick={props.changeStudentForm}>Я ученик</button>
        </form>
    );
};