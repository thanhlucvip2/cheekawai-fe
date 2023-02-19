import { ResponseDataByPagination } from "./../../models/pagination.model";
import {
  ImportedProductTypeModel,
  ImportedProductTypeResponseModel,
  PaginationModel,
} from "@Models/index";
import { HttpResponseModel } from "./../http-response.model";

import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiImportedProductAxios = {
  createPortedProduct(
    data: ImportedProductTypeModel
  ): Promise<HttpResponseModel<ImportedProductTypeModel>> {
    return axiosClient.post(ENPOINT.create_imported_product, data);
  },
  getAllPortedProduct(
    pagination: PaginationModel
  ): Promise<{
    data: HttpResponseModel<
      ResponseDataByPagination<ImportedProductTypeResponseModel>
    >;
  }> {
    return axiosClient.get(
      `${ENPOINT.get_all_imported_product}?pageSize=${pagination.pageSize}&pageIndex=${pagination.pageIndex}&fromDate=${pagination.fromDate}&toDate=${pagination.toDate}`
    );
  },
};
