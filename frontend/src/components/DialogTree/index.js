import React, { Component } from "react";
import styles from "./styles.module.scss";
import SortableTree from "react-sortable-tree";

class DialogTree extends Component {
  state = {
    treeData: [
      {
        title: "환영 인사",
        data: {
          intentId: 2,
          outputId: 4
        }
      },
      {
        title: "피자 주문",
        subtitle: ({ node }) => `expanded: ${node.expanded ? "true" : "false"}`,
        children: [
          {
            title: "메뉴 고르기",
            subtitle: ({ node }) => {
              console.log(node);
              return `expanded: ${node.expanded ? "true" : "false"}`;
            },
            children: [{ title: "주문완료." }]
          },
          { title: "배달 픽업" }
        ]
      },
      {
        title: "기타",
        expanded: true
      }
    ]
  };

  render() {
    return (
      <div className={styles.dialog}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={({ node, parentNode, treeIndex }) => {
            console.log(node);
            return {
              title: (
                <CustomNode
                  node={node}
                  parentNode={parentNode}
                  treeIndex={treeIndex}
                  openEdit={this.props.openEdit}
                />
              )
            };
          }}
        />
      </div>
    );
  }
}

const CustomNode = props => {
  const { node, parentNode, treeIndex } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{node.title}</span>
      <button
        onClick={e => {
          e.preventDefault();
          console.log(parentNode, treeIndex);
          const { openEdit } = props;
          openEdit();
        }}
      >
        info
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          console.log(parentNode, treeIndex);
        }}
      >
        add
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          console.log(parentNode, treeIndex);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default DialogTree;
