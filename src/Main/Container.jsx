import styles from "./container.module.css";
import { useEffect, useState } from "react";
const Container = () => {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("0");
  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    const plannerData = localStorage.getItem("plannerData")
    if(plannerData){
      setPlanner(JSON.parse(plannerData));
    }
  },[])

  const addonfunction = (e) => {
    e.preventDefault();
    const obj = {
      subject: subject,
      hours: hours,
    };

    const plannerArray = [...planner,obj];
    setPlanner(plannerArray);
    localStorage.setItem("plannerData", JSON.stringify(plannerArray));
    setHours("")
    setSubject("")

  };

  const handlePlusbtn = (index) => {
    const plannerCopy = [...planner];
    plannerCopy.splice(index, 1, {
      ...planner[index],
      hours: parseInt(planner[index].hours) + 1,
    });
    setPlanner(plannerCopy);
  };

  const handleMinusbtn = (index) => {
    const plannerCopy = [...planner];
    plannerCopy.splice(index, 1, {
      ...planner[index],
      hours: parseInt(planner[index].hours) - 1,
    });
    setPlanner(plannerCopy);
  };


  return (
    <div className={styles.main_container}>
      <div>
        <h1 className={styles.heading}>Geekster Education Planner</h1>
        <hr />
      </div>

      <form className={styles.input}>
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          value={subject}
        />
        <input
          onChange={(e) => setHours(parseInt(e.target.value))}
          type="number"
          placeholder="Hours"
          value={hours}
        />

        <button onClick={addonfunction}>Add</button>
      </form>

      {planner.map((data,index) => {
        return (
          <div className={styles.div} key={`card_${index}`}>
            {data.subject} - {data.hours} hours
            <button
              onClick={() => {
                handlePlusbtn(index);
              }}
            >
              +
            </button>
            <button  onClick={() => {
                handleMinusbtn(index);
              }} >-</button>
          </div>
        );
      })}
    </div>
  );
};

export default Container;
