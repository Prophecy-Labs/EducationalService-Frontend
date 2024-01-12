'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import Button from "@/components/Button/button.jsx";
import styles from "./register-form.module.css";
import Label from "@/components/Label/label.jsx";


export default function RegForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        let name = data.name;
        fetch('/api/auth/register', {
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
                localStorage.setItem("role", "teacher");
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

            <Label text={'почта'} htmlFor={'email'}></Label>
            <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className={styles.register__input}
            />
            {errors.login && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}
            {errors.email && <span>This field is required</span>}

            <Button type="submit">регистрация</Button>
            <button className={styles.btn__lower} onClick={props.changeForm}>войти</button>
        </form>
    );
};