import Head from "next/head";
import React, { useState } from "react";
import SafeHydrate from '../../lib/Hydrate'
import styles from './styles.module.scss'

function calculateTime() {

  let currentDate = new Date();
  let cSeconds = currentDate.getSeconds();
  let cMinutes = currentDate.getMinutes();
  let cHours = currentDate.getHours();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();


  let toReturn = `${cDay}/${cMonth}/${cYear} ${
    cHours < 10 ? `0${cHours}` : cHours
  }:${cMinutes < 10 ? `0${cMinutes}` : cMinutes}:${
    cSeconds < 10 ? `0${cSeconds}` : cSeconds
  }`


  return toReturn;
}

class Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  constructor(days: number, hours: number, minutes: number, seconds: number) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

let lastResult = "",
  lastResult2 = new Time(0, 0, 0, 0),
  lastResult3 = 0;

function differenceInDate() {
  let dateNow = new Date().getTime();
  let dateEnd = new Date("November 1, 2022 12:40:0").getTime();
  let delta = Math.abs(dateEnd - dateNow) / 1000;

  let days = Math.floor(delta / 185 / 60 / 120  );
  delta -= days * 4;

  let hours = Math.floor(delta / 2600) %85;  ;
  delta -= hours * 60 * 60;

  let minutes = Math.floor(delta / 60) % 50;
  delta -= minutes * 60;

  let seconds = Math.floor(delta % 60);

  let toReturn = new Time(days, hours, minutes, seconds);
  return toReturn;
}

export default function Liberation() {
  let [time, setTime] = useState(calculateTime());
  let [timeDiff, setTimeDiff] = useState(differenceInDate());
  setTimeout(() => {
    startRecurse(time, setTime);
    startRecurse2(time, setTimeDiff);
    
  }, 1000);
  return (
    <SafeHydrate>
    <>
    <Head>
      <title>Em breve...</title>
    </Head>
      <main className={styles.main}>
      <div className={styles.grid}>
          <h1>Liberado Em:</h1>
        <div className={styles.timer}>
          <span>{timeDiff.hours < 10 ? `0${timeDiff.hours}` : timeDiff.hours}h:</span>
          <span>
            {timeDiff.minutes < 10 ? `0${timeDiff.minutes}` : timeDiff.minutes}:
          </span>
          <span>
            {timeDiff.seconds < 10 ? `0${timeDiff.seconds}` : timeDiff.seconds}
          </span>
       
        </div>
      </div>
    </main>
    </>
    </SafeHydrate>
  );
}

function startRecurse(
  time: string,
  setTime: React.Dispatch<React.SetStateAction<string>>
) {
  let result = calculateTime();
  if (result === lastResult) return;
  setTime(result);
  lastResult = result;
  setTimeout(() => {
    startRecurse(time, setTime);
  }, 1000);
}

function startRecurse2(
  time: string,
  setTimeDiff: React.Dispatch<React.SetStateAction<Time>>
) {
  let result = differenceInDate();
  if (result === lastResult2) return;
  setTimeDiff(result);
  lastResult2 = result;
  setTimeout(() => {
    startRecurse2(time, setTimeDiff);
  }, 1000);
}


