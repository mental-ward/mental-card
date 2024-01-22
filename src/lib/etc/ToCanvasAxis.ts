export function ToCanvasAxis(axis: number) {
    const dpr = window.devicePixelRatio
    return axis * dpr
}