import { apiImportedProductAxios } from "@Axios/imported-product/api-imported-product";
import BoxConfirm from "@Component/elements/BoxConfirm";
import Auth from "@Component/Layout/Auth";
import Layout from "@Component/Layout/Layout";
import { ImportedProductTypeResponseModel } from "@Models/index";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import { adddate, convertDateTimeToDateString, odddate } from "@Utils/date";
import { Button, Image } from "antd";
 import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function ListProduct({}: Props) {
  const [state, dispatch] = useContext(GlobalStateContext);
  const [listProduct, setListProduct] = useState<
    ImportedProductTypeResponseModel[]
  >([]);
  useEffect(() => {
    const convertDate = convertDateTimeToDateString(odddate(new Date(), 2));
    const convertToDate = convertDateTimeToDateString(adddate(new Date(), 2));

    (async () => {
      try {
        const response = await apiImportedProductAxios.getAllPortedProduct({
          fromDate: convertDate,
          toDate: convertToDate,
          pageIndex: 0,
          pageSize: 10,
        });
        const data = response.data;
        setListProduct(data.data.items);
        handleLoading(false);
      } catch (error) {
        handleLoading(false);
      }
    })();
  }, []);

  const onDeleteData = (id: string) => {
    console.log(id);
  };

  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };
  return (
    <Auth isAuth={true}>
      <Layout isLoading={true}>
        <div className="container">
          <div className="row">
            {listProduct.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                >
                  <div className="card-grid-2 hover-up">
                    {/* <img src={item.imageUrl} alt="jobBox" /> */}
                    <Image src={item.imageUrl} />
                    <div className="card-block-info">
                      <h6>
                        <a>{item.productName}</a>
                      </h6>
                      <div className="mt-5">
                        <span className="card-briefcase">
                          {item.productType}
                        </span>
                        <span className="card-time">
                          <span>
                            {convertDateTimeToDateString(item.createAt)}
                          </span>
                        </span>
                      </div>
                      <p className="font-sm color-text-paragraph mt-15">
                        {item.note}
                      </p>
                      {/* <div className="mt-30">
                        <a className="btn btn-grey-small mr-5">Adobe XD</a>
                        <a className="btn btn-grey-small mr-5">Figma</a>
                        <a className="btn btn-grey-small mr-5">Photoshop</a>
                      </div> */}
                      <div className="card-2-bottom mt-30">
                        <div className="row">
                          <div className="col-lg-7 col-7">
                            <Button type="primary" block>
                              Edit
                            </Button>
                          </div>
                          <div className="col-lg-5 col-5 text-end">
                            {/* <Button
                              danger
                              onClick={() => onDeleteData(item.id)}
                            >
                              Delete
                            </Button> */}
                            <BoxConfirm
                              onClick={() => onDeleteData(item.id)}
                              dangerButton={true}
                              textButton="Delete"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </Auth>
  );
}
