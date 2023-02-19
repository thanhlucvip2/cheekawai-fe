import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { ENPOINT } from "@Axios/endpoint";
import { apiUploadAxios } from "@Axios/upload/api-upload";
import { openNotification } from "@Utils/notification";

interface Props {
  onListfile: Function;
  maxImage: number;
  multiple: boolean;
}
const UploadFileComp = (props: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    props.onListfile(fileList);
  }, [fileList]);

  const onChangeFile = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList.map((item) => item.response));
  };
  const onRemove = async (info: UploadFile<any>) => {
    const idFile = info.response.id;
    try {
      const response = await apiUploadAxios.deleteFile(idFile);
      if (response.data) {
        openNotification("success", "Thành công", response.data);
      }
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };

  return (
    <>
      <Upload
        multiple={props.multiple}
        action={ENPOINT.upload_file}
        listType="picture"
        defaultFileList={[...fileList]}
        onChange={onChangeFile}
        onRemove={onRemove}
        maxCount={props.maxImage}
      >
        {fileList.length === props.maxImage ? null : (
          <Button icon={<UploadOutlined />}>Upload</Button>
        )}
      </Upload>
    </>
  );
};

export default UploadFileComp;
