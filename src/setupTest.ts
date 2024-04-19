import '@testing-library/jest-dom';

vi.mock("devextreme/core/utils/window", async () => {
    const actualModule = (await vi.importActual("devextreme/esm/core/utils/window")) 
    return {
        __esModule: true,
        ...actualModule,
        hasWindow: () => false,
        getWindow: () => {
            return {
                length: 0,
                nodeType: 1,
                window: {},
                getComputedStyle: vi.fn(() => ({
                    fontFamily: "dx.generic.light",
                })),
            }
        },
    }
})
vi.mock('devextreme/core/utils/position', async () => {
    const actualModule = (await vi.importActual('devextreme/esm/core/utils/position'));
    return {
        __esModule: true,
        ...actualModule,
        getBoundingRect: () => ({
            return: {
                width: 100,
                height: 100
            }
        })
    };
});
vi.mock('devextreme/core/utils/size', async () => {
    const actualModule = (await vi.importActual('devextreme/esm/core/utils/size'));
    return {
        __esModule: true,
        ...actualModule,
        getOffset: () => ({
            return: {
                top: 0,
                left: 0
            }
        })
    };
});