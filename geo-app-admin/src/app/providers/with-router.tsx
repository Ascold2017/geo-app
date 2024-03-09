import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { ROOT_PATH } from "../../shared";

export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter basename={ROOT_PATH}>
        <Suspense fallback={<Spinner />}>
            {component()}
        </Suspense>
    </BrowserRouter>
);