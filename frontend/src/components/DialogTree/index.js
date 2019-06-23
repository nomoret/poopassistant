import React, { Component } from "react";
import styles from "./styles.module.scss";
import SortableTree from "react-sortable-tree";
import { throws } from "assert";

class DialogTree extends Component {
  state = {
    isSet: false,
    treeData: []
  };

  componentWillReceiveProps = nextProps => {
    console.log("cdm", this.state.isSet);
    if (nextProps.tree && !this.state.isSet) {
      this.setState({
        treeData: nextProps.tree,
        isSet: true
      });
    }
  };

  render() {
    console.log("treedata", this.state.treeData);
    console.log("tree", this.props);
    console.log("tree", this.props.tree);

    if (this.state.isSet) {
      return (
        <div className={styles.dialog}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            isVirtualized={true}
            canDrag={false}
            canDrop={() => false}
            generateNodeProps={({ node, parentNode, treeIndex }) => {
              return {
                title: (
                  <CustomNode
                    node={node}
                    parentNode={parentNode}
                    treeIndex={treeIndex}
                    openEdit={this.props.openEdit}
                    addChildNode={this.props.addChildNode}
                    removeNode={this.props.removeNode}
                    toggleSet={this._toggleSet}
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

  _toggleSet = () => {
    this.setState(prevState => {
      return {
        isSet: !prevState.isSet
      };
    });
  };
}

const CustomNode = props => {
  const { node, parentNode, treeIndex, removeNode } = props;
  const { title } = node.data;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{title}</span>
      <button
        onClick={e => {
          e.stopPropagation();
          console.log(node, treeIndex);
          const { openEdit } = props;
          openEdit(node, treeIndex);
        }}
      >
        info
      </button>
      <button
        onClick={e => {
          const { addChildNode, toggleSet } = props;
          toggleSet();
          addChildNode(e, node.id);
        }}
      >
        add
      </button>
      <button
        onClick={e => {
          console.log(props);
          const { removeNode, toggleSet } = props;
          toggleSet();
          removeNode(e, node.id);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default DialogTree;
