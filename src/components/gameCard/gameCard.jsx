import React from "react";
import styles from "./gameCard.module.css";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from 'next/navigation';

export default function GameCard(props) {
    const router = useRouter();
    let { id, GameId, gameDescr, gameList, setGameList } = props;
    const accessToken = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const handleClickLobby = (e) => {
        e.preventDefault();
        //console.log({ GameId: GameId, userName: localStorage.getItem("userName") });
        fetch(`http://91.220.109.148:5000/api/session?userName=${name}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: gameDescr,gameID: GameId})
        })
            .then(response => response.text())
            .then(data => {
                router.push(`/main-page/lobby/${data}`)
            });
        
    }
    const handleClickDelete = (e) => {
        fetch(`http://91.220.109.148:5000/api/gamepack/${GameId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.text())
            .then(data => {     
                let newList = gameList.filter(function (item) {
                    return item.gameID !== GameId;
                });
                setGameList(newList);
            });
        
    }
    const backgroundClass = props.gameType === "test" ? styles.game__card1 : 
                        props.gameType === "weakLink" ? styles.game__card2: '';
    

    return (
        <>
            <div className={clsx(styles.game__card, backgroundClass)}>
                <p className={styles.game__name}>{props.gameName}</p>
                <p className={styles.game__descr}>{props.gameDescr}</p>
                <Image src={props.image} alt="gameImage" className={styles.bg__svg} />
                <div className={styles['game-hover__div']}>
                    <div className={styles['top-icons']} onClick={handleClickLobby}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="84" viewBox="0 0 70 84" fill="none">
                            <path d="M5.00839 0.482117C3.99034 -0.136898 2.72162 -0.162477 1.67799 0.420726C0.639476 1.00393 0 2.10383 0 3.29582V80.3094C0 81.5014 0.644594 82.6013 1.68311 83.1845C2.18446 83.4659 2.74208 83.604 3.29459 83.604C3.88802 83.604 4.48657 83.4454 5.00839 83.1231L68.1223 44.6163C69.1045 44.0178 69.7031 42.9537 69.7031 41.8026C69.7031 40.6515 69.1045 39.5875 68.1223 38.9889L5.00839 0.482117ZM6.58918 74.4415V9.16878L60.0802 41.8026L6.58918 74.4415Z" fill="#DBEDF3"/>
                            </svg>
                            <span className={styles['hover__span']}>начать</span>
                    </div>
                    <div className={styles['bottom-icons']}>
                        <svg className={styles['bottom-icon']} xmlns="http://www.w3.org/2000/svg" width="56" height="70" viewBox="0 0 56 70" fill="none">
                        <path d="M19.56 53.0333H42.072C44.077 53.0333 46 52.2368 47.4177 50.8191C48.8355 49.4013 49.632 47.4784 49.632 45.4733V28.5613C49.632 28.0415 49.4255 27.543 49.0579 27.1754C48.6904 26.8078 48.1918 26.6013 47.672 26.6013C47.1522 26.6013 46.6536 26.8078 46.2861 27.1754C45.9185 27.543 45.712 28.0415 45.712 28.5613V45.4733C45.712 46.4387 45.3285 47.3646 44.6459 48.0472C43.9632 48.7298 43.0374 49.1133 42.072 49.1133H19.56C18.5946 49.1133 17.6688 48.7298 16.9861 48.0472C16.3035 47.3646 15.92 46.4387 15.92 45.4733V17.9213C15.92 16.9559 16.3035 16.0301 16.9861 15.3475C17.6688 14.6648 18.5946 14.2813 19.56 14.2813H33.112C33.6318 14.2813 34.1304 14.0748 34.4979 13.7073C34.8655 13.3397 35.072 12.8412 35.072 12.3213C35.072 11.8015 34.8655 11.303 34.4979 10.9354C34.1304 10.5678 33.6318 10.3613 33.112 10.3613H19.56C17.555 10.3613 15.632 11.1578 14.2143 12.5756C12.7965 13.9934 12 15.9163 12 17.9213V45.4733C12 47.4784 12.7965 49.4013 14.2143 50.8191C15.632 52.2368 17.555 53.0333 19.56 53.0333Z" fill="#DBEDF3"/>
                        <path d="M51.48 9.63334C50.4212 8.58688 48.9926 8 47.504 8C46.0153 8 44.5867 8.58688 43.528 9.63334L27.848 25.3133C27.6469 25.5201 27.4939 25.7687 27.4 26.0413L24.656 33.9933C24.5588 34.2868 24.5324 34.5992 24.579 34.9048C24.6256 35.2104 24.7439 35.5007 24.9241 35.7519C25.1043 36.0031 25.3414 36.2081 25.6159 36.3502C25.8905 36.4922 26.1948 36.5673 26.504 36.5693L27.12 36.4573L35.016 33.7693C35.2886 33.6754 35.5372 33.5224 35.744 33.3213L51.424 17.6413C51.9542 17.1197 52.3764 16.4985 52.6663 15.8134C52.9562 15.1283 53.108 14.3928 53.1132 13.649C53.1184 12.9051 52.9769 12.1675 52.6966 11.4785C52.4163 10.7894 52.0029 10.1624 51.48 9.63334ZM48.68 14.8413L33.336 30.1853L29.64 31.4733L30.928 27.7773L46.272 12.4333C46.5954 12.1219 47.027 11.948 47.476 11.948C47.925 11.948 48.3565 12.1219 48.68 12.4333C48.9914 12.7568 49.1653 13.1883 49.1653 13.6373C49.1653 14.0863 48.9914 14.5179 48.68 14.8413Z" fill="#DBEDF3"/>
                        </svg>
                        <svg className={styles['bottom-icon']} xmlns="http://www.w3.org/2000/svg" width="69" height="86" viewBox="0 0 69 86" fill="none">
                        <path d="M33.9285 8.52522C25.7019 8.52522 18.1786 12.3828 13.3833 18.7126V15.4518C13.3833 14.2796 12.4242 13.3205 11.252 13.3205C10.0799 13.3205 9.12079 14.2796 9.12079 15.4518V25.2129C9.12079 26.3851 10.0799 27.3442 11.252 27.3442H21.0984C22.2706 27.3442 23.2297 26.3851 23.2297 25.2129C23.2297 24.0407 22.2706 23.0817 21.0984 23.0817H15.5572C19.4147 16.7518 26.32 12.7877 33.9285 12.7877C45.7783 12.7877 55.4115 22.357 55.4115 34.1002C55.4115 45.8434 45.7783 55.4127 33.9285 55.4127C23.4215 55.4127 14.5129 47.9747 12.7439 37.702C12.5521 36.5512 11.4652 35.7626 10.293 35.9544C9.1421 36.1462 8.35354 37.2545 8.54536 38.4053C10.6553 50.724 21.3329 59.6539 33.9285 59.6539C48.1227 59.6539 59.674 48.1878 59.674 34.0789C59.674 19.97 48.1227 8.50391 33.9285 8.50391V8.52522Z" fill="#DBEDF3"/>
                        <path d="M34.099 21.7168C32.9268 21.7168 31.9678 22.6759 31.9678 23.848V34.0994C31.9678 34.9092 32.4153 35.6339 33.14 35.9962L42.688 40.8767C43.0077 41.0259 43.3273 41.1112 43.647 41.1112C44.4143 41.1112 45.1602 40.6849 45.5438 39.939C46.0767 38.8947 45.6717 37.6159 44.6061 37.0831L36.209 32.7993V23.848C36.209 22.6759 35.2499 21.7168 34.0777 21.7168H34.099Z" fill="#DBEDF3"/>
                        </svg>
                        <svg className={styles['bottom-icon']} onClick={handleClickDelete} xmlns="http://www.w3.org/2000/svg" width="47" height="58" viewBox="0 0 47 58" fill="none">
                        <g clip-path="url(#clip0_373_11400)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.26998 0.776161L23.1031 19.6092L42.1303 0.776161C44.266 -1.5537 47.7608 1.94109 45.4309 4.27096L26.5978 23.104L45.4309 42.1313C47.7608 44.267 44.266 47.7618 42.1303 45.4319L23.1031 26.5988L4.26998 45.4319C1.94012 47.7618 -1.55468 44.267 0.775184 42.1313L19.6083 23.104L0.775184 4.27096C-1.55468 1.94109 1.94012 -1.5537 4.26998 0.776161Z" fill="#DBEDF3"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_373_11400">
                            <rect width="46.209" height="57.7612" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}