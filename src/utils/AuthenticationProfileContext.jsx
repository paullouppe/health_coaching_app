import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext({
  mail: '',
  setMail: () => {}
});

export const useProfile = () => useContext(ProfileContext);

export function AuthenticationProfileContext({ children }) {
  const [mail, setMail] = useState('');

  return (
    <ProfileContext.Provider value={{ mail, setMail }}>
      {children}
    </ProfileContext.Provider>
  );
}
