import React, { useState } from "react";

import { Bar } from "react-chartjs-2";
import { format } from "date-fns";

import "./App.css";

function App() {
  const [initial, setInitial] = useState("00:00");
  const [finish, setFinish] = useState("00:00");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [dtState, setDtState] = useState([]);
  const dt = [];
  const [greenColor] = useState("#0a0");
  const [grayColor] = useState("#ccc");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: dtState,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Atividades registradas",
      },
    },
  };

  function intervalScheduling() {
    const listOrdered = [];
    const list = [];
    const grayList = [];
    const tempList = [...backgroundColor];
    let index;

    dtState.forEach((item) => {
      grayList.push(grayColor);
    });
    // console.log(grayList);
    setBackgroundColor(grayList);

    listOrdered.push(...dtState);

    listOrdered.sort((next, item) => {
      if (next[1] < item[1]) {
        return -1;
      }
      if (next[1] > item[1]) {
        return 1;
      }
      return 0;
    });

    listOrdered.forEach((item) => {
      if (list.length === 0) {
        list.push(item);
        index = dtState.indexOf(item);
        console.log(index);
        tempList[index] = greenColor;
      } else {
        if (list[list.length - 1][1] <= item[0]) {
          list.push(item);
          index = dtState.indexOf(item);
          console.log(index);
          tempList[index] = greenColor;
        }
      }
    });
    setBackgroundColor([...tempList]);
    // console.log(list);
  }

  function createActivity(e) {
    e.preventDefault();
    if (finish > initial) {
      dt.push([
        Number(
          Number(
            Number(format(new Date(`1995-12-17T${initial}:00`), "H")) +
              Number(format(new Date(`1995-12-17T${initial}:00`), "m")) / 60
          ).toFixed(2)
        ),
        Number(
          Number(
            Number(format(new Date(`1995-12-17T${finish}:00`), "H")) +
              Number(format(new Date(`1995-12-17T${finish}:00`), "m")) / 60
          ).toFixed(2)
        ),
      ]);
      setDtState([...dtState, ...dt]);
      setLabels([...labels, name]);
      if (dtState.length === 0) {
        setBackgroundColor([grayColor]);
      } else {
        setBackgroundColor([...backgroundColor, grayColor]);
      }

      setInitial("00:00");
      setFinish("00:00");
      setName("");
    } else {
      setInitial("00:00");
      setFinish("00:00");
      setName("");
      alert("O horário de inicio deve ser menor que o de final da atividade");
    }
  }

  return (
    <div className="container">
      <div className="div-lateral">
        <span className="titulo">Activity Optmizer 2.0</span>
        <form className="formActivity" onSubmit={createActivity}>
          <div>
            <label for="initial">Horário de Início</label>
            <input
              name="initial"
              type="time"
              required
              onChange={(e) => setInitial(e.target.value)}
              value={initial}
            ></input>
          </div>
          <div>
            <label for="finish">Horário Final</label>
            <input
              name="finish"
              type="time"
              required
              onChange={(e) => setFinish(e.target.value)}
              value={finish}
            ></input>
          </div>
          <div>
            <label for="name">Nome da atividade</label>
            <input
              name="name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <button type="submit">Criar</button>
        </form>
      </div>
      <div className="content">
        <Bar data={data} options={options} />
        <button onClick={intervalScheduling}>Otimizar</button>
      </div>
    </div>
  );
}

export default App;
