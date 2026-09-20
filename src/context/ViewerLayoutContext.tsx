import { createContext, useContext, useState, type ReactNode } from "react";

type ViewerLayoutContextType = {
  isFullBody: boolean;
  setIsFullBody: (val: boolean) => void;
};

const ViewerLayoutContext = createContext<ViewerLayoutContextType>({
  isFullBody: false,
  setIsFullBody: () => {},
});

export function ViewerLayoutProvider({ children }: { children: ReactNode }) {
  const [isFullBody, setIsFullBody] = useState(false);

  return (
    <ViewerLayoutContext.Provider value={{ isFullBody, setIsFullBody }}>
      {children}
    </ViewerLayoutContext.Provider>
  );
}

export function useViewerLayout() {
  return useContext(ViewerLayoutContext);
}
