import React, { Component } from "react";
import styles from "./styles.module.scss";
import SortableTree from "react-sortable-tree";

class DialogTree extends Component {
  state = {
    isSet: false,
    treeData: []
  };

  componentDidMount() {
    console.log("viewing cdm", this.state, this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tree && !this.state.isSet) {
      this.setState({
        treeData: this.props.tree,
        isSet: true
      });
    }
  }

  render() {
    console.log("treedata", this.state.treeData);
    console.log("tree", this.props.tree);

    if (this.state.isSet) {
      return (
        <div className={styles.dialog}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            isVirtualized={true}
            generateNodeProps={({ ...thisArg }) => {
              console.log(thisArg);
              const { node, parentNode, treeIndex } = thisArg;
              return {
                title: (
                  <CustomNode
                    node={node}
                    parentNode={parentNode}
                    treeIndex={treeIndex}
                    openEdit={this.props.openEdit}
                  />
                ),
                subtitle: node.data.desc,
                children: node.children
              };
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

const CustomNode = props => {
  const { node, parentNode, treeIndex } = props;
  const { title } = node.data;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{title}</span>
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
