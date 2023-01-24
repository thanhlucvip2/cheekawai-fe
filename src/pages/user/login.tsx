import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@Component/Layout/Layout";
import ImageAssets from "@Component/elements/ImageAssets";
import { Form } from "antd";
import { LoginModel } from "@Models/login.model";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import { useAuth } from "@Hooks/use-auth";
import Auth from "@Component/Layout/Auth";
import AppInput from "@Component/elements/Input";

const Singin = () => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const [isLoading, seIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername((router.query.username as string) || "");
  }, [router]);

  const onFinish = (dataLogin: LoginModel) => {
    seIsLoading(true);
    handleLogin({ ...dataLogin, username });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function handleLogin({ username, password }: LoginModel) {
    login({ username, password }, (response: any) => {
      seIsLoading(true);
      if (response.data.success) {
        router.push({
          pathname: Routes.home,
        });
      } else {
        setLoginError(true);
        seIsLoading(false);
      }
    });
  }
  const onForgotPassword = () => {
    seIsLoading(true);
    router.push({
      pathname: Routes.resetPassword,
      query: username
        ? {
            username,
          }
        : {},
    });
  };
  return (
    <Auth isAuth={false}>
      <Layout isLoading={isLoading}>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <p className="font-sm text-brand-2">Welcome back! </p>
                  <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
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
                    requiredMessage="Vui lòng điền username!"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <AppInput
                    type="password"
                    label="Password"
                    required={true}
                    requiredMessage="Vui lòng điền Password!"
                    placeholder="Password"
                    name="password"
                  />

                  {loginError ? (
                    <div className="error-login">
                      Tên đăng nhập/email hoặc mật khẩu không chính xác.
                    </div>
                  ) : null}
                  <div className="login_footer form-group d-flex justify-content-between">
                    <label className="cb-container">
                      <input type="checkbox" />
                      <span className="text-small">Remenber me</span>
                      <span className="checkmark" />
                    </label>

                    <a className="text-muted" onClick={onForgotPassword}>
                      Quên mật khẩu
                    </a>
                  </div>
                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Đăng nhập
                    </button>
                  </Form.Item>
                  <div className="text-muted text-center">
                    {"Bạn chưa có tài khoản?"}
                    <Link legacyBehavior href={Routes.registor}>
                      <a>Đăng ký</a>
                    </Link>
                  </div>
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

export default Singin;
