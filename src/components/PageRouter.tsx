import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { pages, pageNames, type PageProps } from "../pages";

type RouterProps = Omit<PageProps, "changePage" | "goBack">;

function PageRouter(props: RouterProps) {
  const [currentPage, setCurrentPage] = useState(pageNames[0]);
  const history = useRef<string[]>([]);

  const changePage = useCallback((name: string) => {
    if (!pages[name]) {
      console.warn(`[PageRouter] unknown page: "${name}"`);
      return;
    }
    history.current.push(currentPage);
    setCurrentPage(name);
  }, [currentPage]);

  const goBack = useCallback(() => {
    if (history.current.length === 0) return;
    const prev = history.current.pop()!;
    setCurrentPage(prev);
  }, []);

  useEffect(() => {
    (window as any).changePage = changePage;
    (window as any).goBackAPage = goBack;
    (window as any).currentPage = () => currentPage;
  }, [changePage, goBack, currentPage]);

  const PageComponent = pages[currentPage];

  return (
    <Suspense>
      <PageComponent
        {...props}
        changePage={changePage}
        goBack={goBack}
      />
    </Suspense>
  );
}

export default PageRouter;
