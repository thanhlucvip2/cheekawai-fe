import React, { useEffect, useState } from "react";
import Layout from "@Component/Layout/Layout";
import ImageAssets from "@Component/elements/ImageAssets";
import Auth from "@Component/Layout/Auth";
import { Form } from "antd";
import AppInput from "@Component/elements/Input";
import { useRouter } from "next/router";
import { apiUserAxios } from "@Axios/user/api-user";
import { openNotification } from "@Utils/notification";
import { Routes } from "@Routes/routes";

const ResetPassword = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername((router.query.username as string) || "");
  }, [router]);

  const onFinish = () => {
    setisLoading(true);
    onResetPassword();
  };
  const onResetPassword = async () => {
    try {
      const response = await apiUserAxios.resetPassword(username);
      const data = response.data;

      openNotification(
        "success",
        "Thành công",
        "Vui lòng kiểm tra mật khẩu trong email!"
      );
      router.push({
        pathname: Routes.login,
        query: {
          username,
        },
      });
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setisLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Auth>
      <Layout isLoading={isLoading}>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <p className="font-sm text-brand-2">Welcome back! </p>
                  <h2 className="mt-10 mb-5 text-brand-1">
                    Khôi phục mật khẩu
                  </h2>
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="login-register text-start mt-20"
                  action="#"
                >
                  <AppInput
                    label="username"
                    required={true}
                    requiredMessage="Vui lòng điền Username!"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Gửi
                    </button>
                  </Form.Item>
                </Form>
              </div>
              <div className="img-1 d-none d-lg-block">
                <ImageAssets
                  className="shape-1"
                  src="assets/imgs/page/login-register/img-4.svg"
                  alt="JobBox"
                />
              </div>
              <div className="img-2">
                <ImageAssets
                  src="assets/imgs/page/login-register/img-3.svg"
                  alt="JobBox"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Auth>
  );
};

export default ResetPassword;
