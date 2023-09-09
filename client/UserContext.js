import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const ContextAPI = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
export default ContextAPI;

export const useGlobalContext = () => useContext(UserContext);
