import { createContext, useContext, useMemo, useState } from "react";

const SECRET_ONE_KEY = "comatose-secret-1-unlocked";
const SECRET_TWO_KEY = "comatose-secret-2-unlocked";

const SecretUnlockContext = createContext(null);

export function SecretUnlockProvider({ children }) {
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SECRET_ONE_KEY) === "true"
      || localStorage.getItem(SECRET_TWO_KEY) === "true";
  });

  const [isSecretTwoUnlocked, setIsSecretTwoUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SECRET_TWO_KEY) === "true";
  });

  function unlockSecret() {
    setIsSecretUnlocked(true);
    localStorage.setItem(SECRET_ONE_KEY, "true");
  }

  function unlockSecretTwo() {
    setIsSecretUnlocked(true);
    setIsSecretTwoUnlocked(true);
    localStorage.setItem(SECRET_ONE_KEY, "true");
    localStorage.setItem(SECRET_TWO_KEY, "true");
  }

  function resetSecrets() {
    setIsSecretUnlocked(false);
    setIsSecretTwoUnlocked(false);
    localStorage.removeItem(SECRET_ONE_KEY);
    localStorage.removeItem(SECRET_TWO_KEY);
  }

  const value = useMemo(
    () => ({
      isSecretUnlocked,
      isSecretTwoUnlocked,
      unlockSecret,
      unlockSecretTwo,
      resetSecrets,
    }),
    [isSecretUnlocked, isSecretTwoUnlocked]
  );

  return (
    <SecretUnlockContext.Provider value={value}>
      {children}
    </SecretUnlockContext.Provider>
  );
}

export function useSecretUnlock() {
  const context = useContext(SecretUnlockContext);

  if (!context) {
    throw new Error("useSecretUnlock must be used inside SecretUnlockProvider");
  }

  return context;
}