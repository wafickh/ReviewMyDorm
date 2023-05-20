import React, { useContext, useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "@material-ui/core";


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else if (searchWord.length > 1) {
      const y = newFilter.length;
      const x = { "title": ".." };
      if (y > 0) {
        x.Name = `${y} Results shown`
      }
      else {
        x.Name = `${y} Results shown`
      }

      const finalfilter = [...newFilter, x]

      setFilteredData(finalfilter);
    } else {
      setFilteredData([]);
    }
  };



  return (
    <div className="bg container mt-6 nav-div">
      <div className="HeaderText">
      </div>
      <div>
        <div className="row d-flex justify-content-center align-items-center searchbar" style={{ marginLeft: 0, marginRight: 1, marginBottom: 0 }}>
          <div className="Head">
            <center>
              <h1>Finding a dorm just got easier</h1></center>
          </div>
          <div className="col-md-6 navb " >
            <div className="form">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input shadow-none rounded-0 padman"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
              />

            </div>
          </div>


        </div>
      </div>

      {filteredData.length != 0 && (
        <div className="row d-flex justify-content-center align-items-center" style={{ marginLeft: 0, marginRight: 1, marginBottom: 15 }}>
          <div className="col-md-6">
            <div className="dataResult ">
              {filteredData.map((value, key) => {
                let Name = value.Name
                let nso = Name.replaceAll(' ', '_')
                return (
                  <a href={`/dorms/${nso}`}  className="dataItem" key={value._id} target="_self" >
                    <Link to={`/dorms/${value.Name}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      <p>{value.Name} <span className="place">   {value.City}</span> </p>
                    </Link>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
