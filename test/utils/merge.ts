import * as assert from "power-assert";

import { merge } from "../../src/utils/merge";


interface State {
    state1?: string;
    state2?: string;

    subState?: {
        subState1?: string;
        subState2?: string;

        subSubState?: {
            subSubState1?: string;
            subSubState2?: string;
        },
    };
}

function createState(): State {
    return {
        state1: "state1",
        state2: "state2",
    };
}

function createSubState(): State {
    return {
        state1: "state1",
        state2: "state2",
        subState: {
            subState1: "subState1",
            subState2: "subState2",
        },
    };
}

function createSubSubState(): State {
    return {
        state1: "state1",
        state2: "state2",
        subState: {
            subState1: "subState1",
            subState2: "subState2",
            subSubState: {
                subSubState1: "subSubState1",
                subSubState2: "subSubState2",
            },
        },
    };
}


describe("utils/merge", () => {
    it("primitives", () => {
        assert.ok(null === merge(null, null));
        assert.ok(null === merge(undefined, null));
        assert.ok(null === merge(null, undefined));

        assert.ok(0 === merge<number>(null, 0));
        assert.ok(0 === merge<number>(undefined, 0));
        assert.ok(0 === merge<number>(1, 0));
        assert.ok(0 === merge<number>(0, 0));
        assert.ok(0 === merge<number>(0, undefined));
        assert.ok(null === merge<number>(0, null));

        assert.ok("a" === merge<string>(null, "a"));
        assert.ok("a" === merge<string>(undefined, "a"));
        assert.ok("" === merge<string>("", ""));
        assert.ok("a" === merge<string>("", "a"));
        assert.ok("a" === merge<string>("b", "a"));
        assert.ok("" === merge<string>("b", ""));
    });


    it("state", () => {
        const state = createState();

        const result = merge<State>(state, {
            state1: "change",
            subState: {
                subState1: "subState1",
            },
        });

        assert.ok("change" === result.state1);
        assert.ok("state2" === result.state2);
        assert.ok("subState1" === result.subState.subState1);
        assert.ok(undefined === result.subState.subState2);
    });


    it("sub-state", () => {
        const state = createSubState();

        const result = merge<State>(state, {
            subState: {
                subState1: "change",
            },
        });

        assert.ok("state1" === result.state1);
        assert.ok("state2" === result.state2);
        assert.ok("change" === result.subState.subState1);
        assert.ok("subState2" === result.subState.subState2);
    });


    it("sub-sub-state", () => {
        const state = createSubSubState();

        const result = merge<State>(state, {
            subState: {
                subSubState: {
                    subSubState1: "change",
                },
            },
        });

        assert.ok("state1" === result.state1);
        assert.ok("state2" === result.state2);
        assert.ok("subState1" === result.subState.subState1);
        assert.ok("subState2" === result.subState.subState2);
        assert.ok("change" === result.subState.subSubState.subSubState1);
        assert.ok("subSubState2" === result.subState.subSubState.subSubState2);
    });
});
