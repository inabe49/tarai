import * as ReactDOM from "react-dom";
import * as React from "react";

import { } from "./action";
import { Dispatcher } from "./dispatcher";
import { Store } from "./store";


export function bind<S, P>(element: HTMLElement, store: Store<S, P>, createElement: (props: P) => React.ReactElement<P>) {
    store.onUpdate((next: P) => {
        ReactDOM.render(
            createElement(next),
            element
        );
    });

    store.init();
}
