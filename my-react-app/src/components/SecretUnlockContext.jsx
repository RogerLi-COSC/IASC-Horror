import { createContext, useContext, useMemo, useState } from "react";

const SecretUnlockContext = createContext(null);

export function SecretUnlockProvider({ children }) {
  // ✅ In-memory only: refresh = resets to false
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);

  const value = useMemo(
    () => ({
      isSecretUnlocked,
      unlockSecret: () => setIsSecretUnlocked(true),
      lockSecret: () => setIsSecretUnlocked(false),
    }),
    [isSecretUnlocked]
  );

  return (
    <SecretUnlockContext.Provider value={value}>
      {children}
    </SecretUnlockContext.Provider>
  );
}

export function useSecretUnlock() {
  const ctx = useContext(SecretUnlockContext);
  if (!ctx) {
    throw new Error("useSecretUnlock must be used inside <SecretUnlockProvider />");
  }
  return ctx;
}