import Auth from "@Component/Layout/Auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageAssets from "@Component/elements/ImageAssets";
import Layout from "@Component/Layout/Layout";
import { Routes } from "@Routes/index";
import { Form } from "antd";
import AppInput from "@Component/elements/Input";
import { useRouter } from "next/router";
import { VerifyUserModel } from "@Models/index";
import { apiUserAxios } from "@Axios/user/api-user";
import { openNotification } from "@Utils/notification";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isResendCode, setIsResendCode] = useState(true);
  const [second, setSecond] = useState(120);

  useEffect(() => {
    setUsername((router.query.username as string) || "");
  }, [router]);

  useEffect(() => {
    const secondCount = setInterval(() => {
      setSecond((count) => {
        if (count === 0) {
          clearInterval(secondCount);
          setIsResendCode(true);
          return 0;
        }
        return (count -= 1);
      });
    }, 1000);
    return () => {
      clearInterval(secondCount);
    };
  }, []);

  const onFinish = (data: VerifyUserModel) => {
    setIsLoading(true);
    onVeryEmail({ ...data, username });
  };

  const onVeryEmail = async (dataVeryUesr: VerifyUserModel) => {
    console.log(dataVeryUesr);
    try {
      const response = await apiUserAxios.veryUser(dataVeryUesr);
      const data = await response.data;
      openNotification(
        "success",
        "Thành công",
        "Xác nhận tài khoản thành công!"
      );
      setIsLoading(false);
      router.push({
        pathname: Routes.login,
        query: {
          username,
        },
      });
    } catch (error: any) {
      openNotification(
        "error",
        "Thất bại",
        "Thất bại, vui lòng kiểm tra lại username!"
      );
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onResendVeryCode = async () => {
    setIsLoading(true);
    if (isResendCode) {
      try {
        const response = await apiUserAxios.resendVerifyCode(username);
        const data = await response.data;
        setIsLoading(false);
        openNotification(
          "success",
          "Thành công",
          "Vui lòng kiểm tra lại email!"
        );
      } catch (error: any) {
        const message = error.response.data.message;
        setIsResendCode(false);
        openNotification("error", "Thất bại", message);
      }
    }
  };

  return (
    <Auth>
      <Layout isLoading={isLoading}>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <h2 className="mt-10 mb-5 text-brand-1">
                    Xác nhận username đăng ký
                  </h2>
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="login-register text-start mt-20"
                  action="#"
                >
                  <AppInput
                    label="Username"
                    required={true}
                    requiredMessage="Vui lòng điền Username!"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <AppInput
                    label="Mã xác nhận"
                    required={true}
                    requiredMessage="Vui lòng điền Mã xác nhận!"
                    placeholder="Mã xác nhận"
                    name="code"
                  />
                  <Form.Item>
                    <div className="box-resendCode">
                      <a
                        className="resendCode"
                        style={{ cursor: !isResendCode ? "not-allowed" : "" }}
                        onClick={onResendVeryCode}
                      >
                        Gửi lại mã xác nhận
                      </a>
                      {!isResendCode ? (
                        <span>Vui lòng chờ : {second} giây</span>
                      ) : null}
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Xác nhận
                    </button>
                  </Form.Item>

                  <div className="text-muted text-center">
                    Bạn đã có tài khoản?
                    <Link legacyBehavior href={Routes.login}>
                      <a>Đăng nhập</a>
                    </Link>
                  </div>
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
      </Layout>
    </Auth>
  );
};

export default Register;
