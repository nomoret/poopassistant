import React from "react";
import styles from "./styles.module.scss";

const Analytics = props => {
  console.log("UserList no stateless");
  console.log(props);
  return (
    <div className={styles.container}>
      <h1>Analytics</h1>
      <FilterBar />
      <ScoreCardSection />
      <ChartSection />
      <TrandControl />
    </div>
  );
};

const FilterBar = () => {
  return (
    <div>
      <h2>FilterBar</h2>
    </div>
  );
};

const ScoreCardSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <ScoreCard title="Total conversations" score="0" />
      <ScoreCard title="Avg. msg. per conversation" score="0" />
      <ScoreCard title="Max. conversations" score="0" />
      <ScoreCard title="Weak understanding" score="0" />
    </div>
  );
};

const ScoreCard = ({ title, score }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        {score}
      </div>
    </div>
  );
};

const ChartSection = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <TotalConversation />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <AvgMsgPerConversation />
        <TotalMessages />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <ActiveUser />
        <AvgConversationsPerUser />
      </div>
    </div>
  );
};
const TotalConversation = () => {
  return <div style={{ height: "100px" }}>TotalConversation Line Chart</div>;
};

const AvgMsgPerConversation = () => {
  return <div>AvgMsgPerConversation Line Chart</div>;
};

const TotalMessages = () => {
  return <div>TotalMessages Line Chart</div>;
};

const ActiveUser = () => {
  return <div>ActiveUser Line Chart</div>;
};

const AvgConversationsPerUser = () => {
  return <div>AvgConversationsPerUser Line Chart</div>;
};

const TrandControl = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <Trands
        title="Top intents"
        content="No intent trend data for selected filters."
      />
      <Trands
        title="Top entities"
        content="No entity trend data for selected filters."
      />
    </div>
  );
};

const Trands = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
    </div>
  );
};

export default Analytics;
