import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Item from "./Components/Item";

function App() {
  const [data, setData] = useState<object[] | null>(null);
  const [size, setSize] = useState<number>(20);
  const [pages, setPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sizes: number[] = [20, 30, 60];

  useEffect(() => {
    axios
      .get(`http://localhost:4444/pages?size=${size}`)
      .then((data) => setPages(parseInt(data.data)));
  }, [size]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4444/?page=${currentPage}&size=${size}`)
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      });
  }, [currentPage, size]);

  const createPagination = () => {
    const arr: number[] = [];

    if (pages)
      for (let i = 1; i <= pages; i++) {
        arr.push(i);
      }

    return arr;
  };

  return (
    <div className="App">
      <h1>BYTY NA PRODEJ</h1>
      <div className="sizes">
        {sizes.map((sizeItem) => {
          return (
            <p
              style={size === sizeItem ? { textDecoration: "underline" } : {}}
              onClick={() => {
                setSize(sizeItem);
              }}
            >
              {sizeItem}
            </p>
          );
        })}
      </div>
      <div className="content-box">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div className="items">
            {data?.map((flat: any) => {
              return (
                <Item
                  key={flat.id}
                  img={flat.img}
                  title={flat.title}
                  locality={flat.locality}
                  url={flat.url}
                />
              );
            })}
          </div>
        )}
        <div className="pagination">
          {createPagination()?.map((item) => {
            return (
              <p
                key={item}
                style={
                  currentPage === item
                    ? { color: "white", background: "red" }
                    : {}
                }
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
