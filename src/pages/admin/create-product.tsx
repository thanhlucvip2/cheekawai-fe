import ImageAssets from "@Component/elements/ImageAssets";
import Auth from "@Component/Layout/Auth";
import Layout from "@Component/Layout/Layout";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "antd";
import AppInput from "@Component/elements/Input";
import { ImportedProductTypeModel } from "@Models/imported-product/create-importer-product.model";
import { openNotification } from "@Utils/notification";
import { apiImportedProductAxios } from "@Axios/imported-product/api-imported-product";
import SelectComponent from "@Component/elements/Select";
import { adddate, convertDateTimeToDateString, odddate } from "@Utils/date";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
type Props = {};

export default function CreateProduct({}: Props) {
  const [state, dispatch] = useContext(GlobalStateContext);

  const [note, setNote] = useState("");
  const [productType, setProductType] = useState("");
  const [option, setOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  useEffect(() => {
    (async () => {
      try {
        const convertDate = convertDateTimeToDateString(
          odddate(new Date(), 100)
        );
        const convertToDate = convertDateTimeToDateString(
          adddate(new Date(), 1)
        );

        const response = await apiImportedProductAxios.getAllPortedProduct({
          fromDate: convertDate,
          toDate: convertToDate,
          pageIndex: 0,
          pageSize: 10,
        });
        const data = response.data;

        const newOption = data.data.items.map((item) => {
          return { value: item.productType, label: item.productType };
        });
        setOption(newOption);
        handleLoading(false);
      } catch (error) {
        handleLoading(false);
      }
    })();
  }, []);
  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };
  const router = useRouter();
  const onFinish = (data: ImportedProductTypeModel) => {
    if (!note) {
      openNotification("error", "Thất bại", "Vui lòng note");
      return;
    }
    if (!productType) {
      openNotification("error", "Thất bại", "Vui lòng điền loại sản phẩm");
      return;
    }
    console.log(data);
    handleLoading(true);
    createImporterProduct({ ...data, note, productType });
  };
  const createImporterProduct = async (data: ImportedProductTypeModel) => {
    try {
      const response = await apiImportedProductAxios.createPortedProduct(data);
      openNotification("success", "Thành công", response.message);
      router.push({
        pathname: Routes.listProduct,
      });
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      handleLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Auth isAuth={true}>
      <Layout isLoading={true}>
        <div className="container">
          <section className="pt-100 login-register">
            <div className="container">
              <div className="row login-register-cover">
                <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                  <div className="text-center">
                    <h2 className="mt-10 mb-5 text-brand-1">
                      Chúc Cẩm Tiên một ngày làm việc thật hiệu quả!
                    </h2>
                  </div>

                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="login-register text-start mt-20"
                    action="#"
                  >
                    <AppInput
                      label="Tên sản phẩm"
                      required={true}
                      requiredMessage="Vui lòng điền tên sản phẩm!"
                      placeholder="Tên sản phẩm"
                      name="productName"
                    />
                    <AppInput
                      type="file"
                      label="Tên sản phẩm"
                      required={true}
                      requiredMessage="Vui lòng điền tên sản phẩm!"
                      placeholder="Tên sản phẩm"
                      name="file"
                    />

                    <SelectComponent
                      onList={(data: any) => setProductType(`${data}`)}
                      options={option}
                      label="Loại sản phẩm"
                      required={true}
                      placeholder="Loại sản phẩm"
                    />
                    <div style={{ height: "20px" }}></div>

                    <div>
                      <label className="form-label" htmlFor="input-1">
                        Ghi chú <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        id="w3review"
                        name="w3review"
                        placeholder="Ghi chú"
                        onChange={(event) => {
                          setNote(event.target.value);
                        }}
                      ></textarea>
                    </div>
                    <Form.Item>
                      <button
                        className="btn btn-brand-1 hover-up w-100"
                        type="submit"
                        name="login"
                      >
                        Tạo sản phẩm
                      </button>
                    </Form.Item>
                  </Form>
                </div>
                <div className="img-1 d-none d-lg-block">
                  <ImageAssets
                    className="shape-1"
                    src="assets/imgs/page/login-register/img-1.svg"
                    alt="JobBox"
                  />
                </div>
                <div className="img-2">
                  <ImageAssets
                    src="assets/imgs/page/login-register/img-2.svg"
                    alt="JobBox"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </Auth>
  );
}
