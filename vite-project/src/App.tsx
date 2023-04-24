import React, { useEffect, useState } from "react";
import users from "./users.json";
import { useFormattedData } from "./hooks/useFormattedData"

interface FormattedData {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: any;
}
const App = (): JSX.Element => {

  const [formattedData, setFormattedData] = useState<FormattedData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [zipInput, setZipInput] = useState<number>(0);
  const [sortByInput, setSortByInput] = useState<string>("");
  
  useEffect(() => {
    setFormattedData(useFormattedData(users)
      .filter("zip",zipInput)
      .search(searchInput)
      .sortBy(sortByInput)
      .getFormattedData()
    );
  }, [searchInput, zipInput, sortByInput]);

  return (
    <div>
      <div>
        <label>Search:</label>
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div>
        <label>Zip:</label>
        <input type="number" onChange={(e) => setZipInput(Number(e.target.value))} />
      </div>
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => setSortByInput(e.target.value)}>
          <option value="">None</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
      </div>
      {formattedData.map(({ id, firstName, lastName, birthdate }) => (
        <div key={id}>
          <div>
            {firstName} {lastName}
          </div>
          <div>{birthdate}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
