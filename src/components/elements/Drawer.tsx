import React from "react";
import { Button, Drawer, Space } from "antd";

interface Props {
  children: React.ReactNode;
  showDrawer: boolean;
  onClose: VoidFunction;
}
const closeIcon = () => {
  return <div>close</div>;
};
const DrawerComponent = (props: Props) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="bottom"
        closable={true}
        onClose={props.onClose}
        open={props.showDrawer}
        height="90%"
        key="bottom"
      >
        {props.children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
