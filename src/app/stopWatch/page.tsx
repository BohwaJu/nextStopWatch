"use client";
import styles from "./stopWatch.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
dayjs.locale("ko");

export default function StopWatch() {
  const [realTime, setRealTime] = useState<any>(null);
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [flag, setFlag] = useState<"ready" | "started" | "ended">("ready");
  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(dayjs());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const renderButton = () => {
    if (flag === "ready") {
      return (
        <button
          className={styles.startStopButton}
          onClick={() => {
            setStartTime(realTime);
            setFlag("started");
          }}
        >
          START
        </button>
      );
    } else if (flag === "started") {
      return (
        <button
          className={styles.startStopButton}
          onClick={() => {
            setEndTime(realTime);
            setFlag("ended");
          }}
        >
          STOP
        </button>
      );
    } else if (flag === "ended") {
      return (
        <button
          className={styles.startStopButton}
          onClick={() => {
            setFlag("started");
            setStartTime(realTime);
            setEndTime(null);
          }}
        >
          RE START
        </button>
      );
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
        const duration = endTime.diff(startTime);
        const formattedDuration = dayjs().startOf('day').add(duration).format("HH:mm:ss");

      const durationMinutes = endTime.diff(startTime, "minute");
      return { formattedDuration, durationMinutes };
    }
    return {};
  };

  if (!realTime) return null;

  return (
    <div className={styles.stopWatch}>
      <div className={styles.timeContainer}>
        <h1 className={styles.date}>
          {realTime?.format("YYYY-MM-DD").toString()}
        </h1>
        <h1 className={styles.time}>
          {realTime?.format("A hh:mm:ss").toString()}
        </h1>
        {renderButton()}
        {startTime && (
          <p className={styles.info}>
            시작시간 : {startTime.format("A hh:mm:ss")}
          </p>
        )}
        {endTime && (
          <p className={styles.info}>
            종료시간 : {endTime.format("A hh:mm:ss")}
          </p>
        )}
        {endTime && (
          <p className={styles.info}>
            작업시간 : {calculateDuration().formattedDuration || 0}
          </p>
        )}
        {endTime && (
          <p className={styles.acc}>
            EXP:
            {calculateDuration().durationMinutes || 0}
          </p>
        )}
      </div>
    </div>
  );
}
