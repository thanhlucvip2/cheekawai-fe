﻿import Link from "next/link";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { menuRoutes, Routes } from "@Routes/index";
import { useAuth } from "@Hooks/use-auth";
import { RoutesConst } from "@Constants/routes-const";
import GlobalStateContext from "@Store/Context";
import { SET_LOADING } from "@Store/constants";

interface Props {
  openClass: string;
  isAuth: boolean;
  handleOpen: Function;
  handleRemove: Function;
  roleAdmin: boolean;
}
const Header = ({
  handleOpen,
  handleRemove,
  openClass,
  isAuth,
  roleAdmin,
}: Props) => {
  const router = useRouter();
  const [state, dispatch] = useContext(GlobalStateContext);
  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };

  const { pathname } = router;
  const [scroll, setScroll] = useState(0);
  const { logout } = useAuth();
  const scrollEvent = () => {
    const scrollCheck = window.scrollY;
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck);
    }
  };
  async function onLogOut() {
    logout(() => {
      router.push(Routes.login);
    });
  }
  useEffect(() => {
    document.addEventListener("scroll", scrollEvent);
  });

  return (
    <>
      {/* <PageHead /> */}
      <header
        className={scroll ? "header sticky-bar stick" : "header sticky-bar"}
      >
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Logo />
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  {menuRoutes.map((item, index) => {
                    if (item.routesType === RoutesConst.user && !isAuth) {
                      return;
                    }

                    if (item.routesType === RoutesConst.admin && !roleAdmin) {
                      return;
                    }
                    return (
                      <li
                        key={index}
                        className={
                          item.children && item.children.length > 0
                            ? "has-children"
                            : ""
                        }
                      >
                        <Link legacyBehavior href={item.path}>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (pathname !== item.path) {
                                handleLoading(true);
                              }
                            }}
                          >
                            <a
                              className={pathname === item.path ? "active" : ""}
                            >
                              {item.label}
                            </a>
                          </span>
                        </Link>
                        {item.children && item.children.length > 0 ? (
                          <ul className="sub-menu">
                            {item.children.map(
                              (itemChildren, indexChildren) => {
                                if (
                                  itemChildren.routesType ===
                                    RoutesConst.user &&
                                  !isAuth
                                ) {
                                  return;
                                }
                                if (
                                  itemChildren.routesType ===
                                    RoutesConst.admin &&
                                  !roleAdmin
                                ) {
                                  return;
                                }
                                return (
                                  <li key={indexChildren}>
                                    <Link
                                      legacyBehavior
                                      href={itemChildren.path}
                                    >
                                      <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          if (pathname !== itemChildren.path) {
                                            handleLoading(true);
                                          }
                                        }}
                                      >
                                        <a
                                          className={
                                            pathname === itemChildren.path
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          {itemChildren.label}
                                        </a>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div
                className={`burger-icon burger-icon-white ${
                  openClass && "burger-close"
                }`}
                onClick={() => {
                  handleOpen();
                  handleRemove();
                }}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
            <div className="header-right">
              <div className="block-signin">
                {!isAuth ? (
                  <>
                    <Link legacyBehavior href={Routes.registor}>
                      <span
                        onClick={() => handleLoading(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <a className="text-link-bd-btom hover-up">Đăng ký</a>
                      </span>
                    </Link>

                    <Link legacyBehavior href={Routes.login}>
                      <span onClick={() => handleLoading(true)}>
                        <a className="btn btn-default btn-shadow ml-40 hover-up">
                          Đăng nhập
                        </a>
                      </span>
                    </Link>
                  </>
                ) : (
                  <span>
                    <a
                      className="btn btn-default btn-shadow ml-40 hover-up"
                      onClick={() => {
                        handleLoading(true);
                        onLogOut();
                      }}
                    >
                      Logout
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
