import { createContext, useContext, useState, ReactNode } from "react";

interface CoolingSystemContextType {
  manualOverride: boolean;
  setManualOverride: (value: boolean) => void;
}

const CoolingSystemContext = createContext<CoolingSystemContextType | undefined>(undefined);

export function CoolingSystemProvider({ children }: { children: ReactNode }) {
  const [manualOverride, setManualOverride] = useState(true);

  return (
    <CoolingSystemContext.Provider value={{ manualOverride, setManualOverride }}>
      {children}
    </CoolingSystemContext.Provider>
  );
}

export function useCoolingSystem() {
  const context = useContext(CoolingSystemContext);
  if (context === undefined) {
    throw new Error("useCoolingSystem must be used within a CoolingSystemProvider");
  }
  return context;
}
