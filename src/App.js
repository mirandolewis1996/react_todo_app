import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/Header";
import Content from "./component/Content";
import Footer from "./component/Footer";
import Additem from "./component/Additem";
import Search from "./component/Search";
import apiRequest from "./component/apiRequest";

function App() {
  // main logic
  const API_URL = "https://6a10a97bd2a9857070370650.mockapi.io/todos/v1/items/todos";
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [eror, setEror] = useState("");
  const [aditm, setAditm] = useState("");
  const [search, setSearch] = useState("");
  const searchdata = items.filter((item) =>
    item.item.toLowerCase().includes(search.toLowerCase()),
  );
  // change
  const handlechg = async (id) => {
    const itemchg = items.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item,
    );
    setItems(itemchg);

    const itmfind = itemchg.find((item) => item.id == id);

    const itmobj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: itmfind.checked }),
    };

    const URL_ID = `${API_URL}/${id}`;
    const result = await apiRequest(URL_ID, itmobj);
    if (result) setEror(result);
  };
  // delete
  const handldel = async (id) => {
    const itemdel = items.filter((item) => item.id != id);
    setItems(itemdel);

    const itmdel = {
      method: "DELETE",
    };

    const URL_ID = `${API_URL}/${id}`;
    const result = await apiRequest(URL_ID, itmdel);
    if (result) setEror(result);
  };
  // add item
  const storedata = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addobj = { id, checked: false, item: item };
    const arrchg = [...items, addobj];
    setItems(arrchg);

    const itmadd = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addobj),
    };

    const result = await apiRequest(API_URL, itmadd);
    if (result) setEror(result);
  };
  //submit
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!aditm) return;
    storedata(aditm);
    setAditm("");
  };
  // fetch data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Server Timeout");
        const maindata = await response.json();
        setItems(maindata);
      } catch (err) {
        setEror(err.message);
      } finally {
        setLoad(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchdata())();
    }, 3000);
  }, []);
  // end
  return (
    <div className="App">
      <Header title="ToDo" />
      <Additem aditm={aditm} setAditm={setAditm} handlesubmit={handlesubmit} />
      <Search search={search} setSearch={setSearch} />
      {load ? (
        <div className="danger_alert">
          <h4 style={{ color: "blue" }}>Loading...</h4>
        </div>
      ) : (
        <>
          {searchdata.length == 0 || eror ? (
            <div className="danger_alert">
              <h4 style={{ color: "tomato" }}>
                {eror ? `${eror}` : "No Item Found"}
              </h4>
            </div>
          ) : (
            <Content
              items={searchdata ? searchdata : items}
              handldel={handldel}
              handlechg={handlechg}
            />
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
