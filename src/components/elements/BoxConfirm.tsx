import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import { ButtonType } from "antd/es/button";
interface Props {
  textButton: string;
  dangerButton: boolean;
  type?: ButtonType;
  onClick: Function;
}
const BoxConfirm = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Title"
      description="Open Popconfirm with async logic"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button
        danger={props.dangerButton}
        type={props.type}
        onClick={showPopconfirm}
      >
        {props.textButton}
      </Button>
    </Popconfirm>
  );
};

export default BoxConfirm;
