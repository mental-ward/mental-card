export function Wait(sec: number) {
    return new Promise((res) => {
        setTimeout(() => {
            res("")
        }, sec * 1000)
    })
}