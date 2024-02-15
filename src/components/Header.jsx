/* eslint-disable no-unused-vars */
import test from "../assets/test.svg";
import logo from "../assets/logo.png";
import search from "../assets/icons/search.svg";
import NewFeeder from "./NewFeeder";
import "../styles/output.css";
import { useEffect, useState } from "react";
import { useNewsQuery } from "../hooks/useFetchGet";
import Footer from "./Footer";
import useDebounce from "../hooks/useDebounce";
const Header = () => {
  const debounce = useDebounce();

  const [res, geFetchData, loading] = useNewsQuery({});
  const [rowDto, setRowDto] = useState(res);
  const [isSearchable, setIsSearchable] = useState({
    isSearch: false,
    inputText: "",
  });

  useEffect(() => {
    geFetchData(
      `http://localhost:8000/v2/top-headlines?category=general`,
      (data) => {
        setRowDto(data);
      }
    );
  }, []);

  const links = [
    { label: "General" },
    { label: "Business" },
    { label: "Entertainment" },
    { label: "Health" },
    { label: "Science" },
    { label: "Sports" },
    { label: "Technology" },
  ];

  return (
    <div>
      <nav className="border-b border-black py-6 md:py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img src={test} alt="test" />
            <span>Thursday, February 25, 2021</span>
          </div>
          <a href="/">
            <img
              className="max-w-[100px] md:max-w-[165px]"
              src={logo}
              alt="Lws"
            />
          </a>
          <div className="flex items-center space-x-3 lg:space-x-8">
            {isSearchable?.isSearch ? (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <input
                      style={{
                        background: "whiteSmoke",
                        border: "1px solid black",
                        borderRadius: "5px",
                        marginRight: "3px",
                      }}
                      value={isSearchable?.inputText}
                      onChange={(e) => {
                        const value = e?.target?.value;
                        setIsSearchable({
                          ...isSearchable,
                          inputText: value,
                        });
                        if(value === "" || value?.length === 0){
                          geFetchData(
                            `http://localhost:8000/v2/top-headlines?category=general`,
                            (data) => {
                              setRowDto(data);
                            }
                          );
                        }
                        debounce(() => {
                         if(value?.length > 0){
                          geFetchData(
                            `http://localhost:8000/v2/search?q=${value.toLowerCase()}`,
                            (data) => {
                              setRowDto(data);
                            }
                          );
                         }
                        }, 1000);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setIsSearchable({
                          ...isSearchable,
                          isSearch: false,
                        });
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <img
                src={search}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsSearchable({
                    ...isSearchable,
                    isSearch: true,
                  });
                }}
              />
            )}
          </div>
        </div>
        <div className="container mx-auto mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold lg:text-base">
            {links?.map((item) => (
              <li key={item?.label}>
                <a
                  href="#"
                  onClick={() => {
                    geFetchData(
                      `http://localhost:8000/v2/top-headlines?category=${item?.label?.toLocaleLowerCase()}`,
                      (data) => {
                        setRowDto(data);
                      }
                    );
                  }}
                >
                  {item?.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <NewFeeder rowDto={rowDto} loading={loading} />
      <Footer />
    </div>
  );
};

export default Header;
