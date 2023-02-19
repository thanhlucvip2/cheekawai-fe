export interface ImportedProductTypeModel {
  productName: string;
  productType: string;
  file: File;
  note: string;
}
export interface ImportedProductTypeResponseModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  file: string;
  productName: string;
  productType: string;
  note: string;
}
