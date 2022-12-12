import axios from "axios";

export interface User {
  foreName: string;
  surname: string;
  password: string;
  mobileNum: string;
  mobileOperater: string;
  email: string;
  country: string;
}
export type UserLogin = {
  email: string;
  password: string;
};

export type UserVerify = {
  email: string;
  code: string;
};
const URL = "/api/";

const config = {
  header: {
    "Content-Type": "application/json",
  },
};
export const getUserFromDB = async (userId: string) => {
  try {
    const response = await axios.get(`${URL}/getprofile/${userId}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.log(err.response?.data);
      const msg = err.response.statusText;
      const msgStatus = err.response.status;
      return { msg, msgStatus };
    }
  }
};
//register
export const register = async (userData: User) => {
  try {
    const response = await axios.post(URL + "register", userData, {
      headers: config.header,
    });

    if (response.data) {
      localStorage.setItem("token", JSON.stringify(response.data));
      return response.data;
    }
    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.log(err.response?.data);
      const msg = err.response.statusText;
      const msgStatus = err.response.status;
      return { msg, msgStatus };
    }
  }
};

// login
export const login = async (userData: UserLogin) => {
  const response = await axios.post(URL + "auth", userData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};
export const verify = async (userData: UserVerify) => {
  try {
    const response = await axios.post(URL + "verify", userData);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.log(err.response?.data);
      const msg = err.response.statusText;
      const msgStatus = err.response.status;
      return { msg, msgStatus };
    }
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

export default function authHeader() {
  const token = localStorage.getItem("token")!;
  const userToken = JSON.parse(token);
  //
  if (userToken) {
    return { "x-auth-token": userToken.token };
  } else {
    return {};
  }
}
// export const createProfile = async (userData: User) => {
//   try {
//     const res = await axios.post<User>(URL, userData, {});
//     return res.data;
//   } catch (err) {
//     if (axios.isAxiosError(err) && err.response) {
//       console.log(err.response?.data);
//       const msg = err.response.statusText;
//       const msgStatus = err.response.status;
//       return { msg, msgStatus };
//     }
//   }
// };
// utility function to simulate slowness in an API call
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
