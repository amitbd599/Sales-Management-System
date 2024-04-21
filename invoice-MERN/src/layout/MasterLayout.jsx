import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaEnvelopeOpenText, FaXmark } from "react-icons/fa6";
import { BiMenuAltRight } from "react-icons/bi";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
const MasterLayout = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarControl = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <section className="bg-gray-100 w-full min-h-screen">
        <section className="bg-[#141C27] w-full h-[100px] flex items-center">
          <div className="container mx-auto">
            {/* Header sectoion */}
            <header className="lg:flex justify-between hidden ">
              <Link to="https://www.invoice-mern.themesoft69.com">
                <div className="logo w-[200px]">
                  <img src="image/logo-dark.png" alt="" />
                </div>
              </Link>

              <nav className="flex items-center">
                <ul className="flex gap-10">
                  <li>
                    <NavLink
                      to="https://www.invoice-mern.themesoft69.com"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/all-invoice"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      All Invoice
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/setting"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      Setting
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </header>

            <div className="block lg:hidden">
              <div className="flex justify-between items-center">
                <Link to="https://www.invoice-mern.themesoft69.com">
                  <div className="logo w-[200px]">
                    <img
                      src="/image/logo-dark.png"
                      alt=""
                      className="w-[200px]"
                    />
                  </div>
                </Link>
                <div className="flex items-center justify-end gap-4	 px-[10px]">
                  <span
                    onClick={sidebarControl}
                    className="rounded-full border border-white p-[10px] text-[25px] "
                  >
                    <BiMenuAltRight className="text-white" />
                  </span>
                </div>
              </div>
            </div>

            {/* sidebar intro */}
            <div
              className={`sidebar fixed ${
                sidebar ? "left-0" : "left-[100%]"
              } bg-[#333333ab]  top-0 z-[999]  h-full w-full bg-btn/60 transition-all duration-500`}
            >
              <div className="ml-auto h-full min-h-[750px] w-[300px] bg-card  px-[30px] pt-[60px] md:min-h-[700px] bg-[#141C27]">
                <div className="relative flex justify-center">
                  <span
                    onClick={sidebarControl}
                    className="group absolute left-[-69px] top-[-50px] rounded-lg bg-card   px-[15px] py-[10px] text-[26px]"
                  >
                    <FaXmark className="text-white border-2 border-white  rounded-full p-[10px] text-[50px] transition-all duration-500  group-hover:rotate-90 group-hover:text-theme" />
                  </span>
                  <div>
                    <img src="/image/logo-dark.png" alt="" />
                  </div>
                </div>
                <div className="my-[30px] border-t border-[#ddd] "></div>
                <nav className="mt-[30px]">
                  <ul className="grid gap-[16px]">
                    <li className="text-[18px] font-semibold">
                      <NavLink
                        to="https://www.invoice-mern.themesoft69.com"
                        className={(navData) =>
                          navData.isActive ? "navActive" : "navNotActive"
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="text-[18px] font-semibold">
                      <NavLink
                        to="/all-invoice"
                        className={(navData) =>
                          navData.isActive ? "navActive" : "navNotActive"
                        }
                      >
                        All Invoice
                      </NavLink>
                    </li>
                    <li className=" text-[18px] font-semibold">
                      <NavLink
                        to="/setting"
                        className={(navData) =>
                          navData.isActive ? "navActive" : "navNotActive"
                        }
                      >
                        Setting
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <div className="my-[30px] border-t border-[#ddd] "></div>
              </div>
            </div>
          </div>
        </section>

        {/* main body */}
        <main className="min-h-[calc(100vh-300px)]">{props.children}</main>

        {/* Footer */}
        <footer className="bg-[#141C27] pt-[80px] pb-[20px] text-gray-100">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-6 grid-cols-1 lg:grid-cols-12 gap-[40px] border-b border-gray-800 pb-[40px]">
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="border-[#55E6A5] border-2 w-[60px] h-[60px] flex justify-center items-center rounded-full">
                      <span>
                        <FaMapMarkerAlt className="text-[20px]" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px] text-white">
                        Address
                      </h3>
                      <p className="mt-2">
                        2118 Thornridge Cir. Syracuse, Connecticut 35624
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="border-[#55E6A5] border-2 w-[60px] h-[60px] flex justify-center items-center rounded-full">
                      <span>
                        <FaPhoneAlt className="text-[20px]" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px] text-white">
                        Lets talk us
                      </h3>
                      <p className="mt-2">99-(963)-85-525</p>
                      <p className="mt-1">99-(639)-85-885</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="border-[#55E6A5] border-2 w-[60px] h-[60px] flex justify-center items-center rounded-full">
                      <span>
                        <FaEnvelopeOpenText className="text-[20px]" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px] text-white">
                        Send us email
                      </h3>
                      <p className="mt-2">admin@invoiceboot.com</p>
                      <p className="mt-1">support@invoiceboot.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-[20px]">
              <p className="text-sm">
                © React invoice-generator 2024 ||{" "}
                <span className="text-[#55E6A5]">Invoice Boot</span> || All
                Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default MasterLayout;
