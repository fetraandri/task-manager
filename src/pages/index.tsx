import React, { useEffect, useState, useRef } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorage from "./hooks/useLocalStorage";

const calculateTimeDifference = (server, client) => {
  const timeDifference = Math.abs(client.getTime() - server.getTime());
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

function Home() {
  const router = useRouter();
  const [clientTime, setClientTime] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  const serverTimeRef = useRef(null);
  const clientTimeRef = useRef(null);

  useEffect(() => {
    const getClientTime = () => {
      const newClientTime = new Date();
      setClientTime(newClientTime);
    };

    getClientTime();

    const interval = setInterval(getClientTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const serverDateTime = new Date();
    setServerTime(serverDateTime);
  }, []);

  useEffect(() => {
    if (clientTime && serverTime) {
      const difference = calculateTimeDifference(serverTime, clientTime);
      setTimeDifference(difference);
    }
  }, [clientTime]);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  
  

  

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime" ref={serverTimeRef}>
              {serverTime ? serverTime.toLocaleString() : ""}
            </span>
          </p>
          <p>
            Client time:{" "}
            <span className="clientTime" ref={clientTimeRef}>
              {clientTime ? clientTime.toLocaleString() : ""}
            </span>
          </p>
          <p>
            Time diff:{" "}
            <span className="timeDifference">{timeDifference}</span>
          </p>
        </div>
        <div>
          <button onClick={moveToTaskManager}>Task</button>
        </div>
      </main>
      <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <p>Hello, {name}!</p>
    </div>
    </>
  );
}

export default Home;