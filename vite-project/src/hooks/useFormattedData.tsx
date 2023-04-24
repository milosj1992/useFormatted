interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: any;
  [key: string]: any;
}

interface FormattedData {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: any;
}

interface API {
  search: (searchTerm: string) => API;
  filter: (key: keyof Person, value: number) => API;
  sortBy: (sortType: keyof Person) => API;
  getFormattedData: () => FormattedData[];
}

export const useFormattedData = (data: Person[]): API => {
  let formattedData: Person[] = data;

  const search = (searchTerm: string): API => {
    formattedData = formattedData.filter((item) => {
      for (let key in item) {
        if (item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
    });
    return api;
  };

  const filter = (key: keyof Person, value: number): API => {
    formattedData = formattedData.filter((item) => item[key] > value);
    return api;
  };

  const sortBy = (sortType: keyof Person): API => {
    formattedData = formattedData.sort((a, b) => {
      if (a[sortType] < b[sortType]) {
        return -1;
      }
      if (a[sortType] > b[sortType]) {
        return 1;
      }
      return 0;
    });
    return api;
  };

  const getFormattedData = (): FormattedData[] => formattedData.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    birthdate: item.birthdate,
  }));

  const api: API = {
    search,
    filter,
    sortBy,
    getFormattedData,
  };

  return api;
};
