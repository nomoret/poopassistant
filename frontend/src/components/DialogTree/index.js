import React, { Component } from "react";
import SortableTree from "react-sortable-tree";

class DialogTree extends Component {
  state = {
    treeData: [
      {
        title: "환영 인사"
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
      <div style={{ marginLeft: 200, height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

export default DialogTree;
