import { Space } from "./Space";
import { World } from "./World";

export abstract class Chapter {
    abstract init(): void
    abstract space: Space
    static change(chapter: Chapter) {
        World.currentChapter = chapter
        chapter.init()
        World.currentSpace = chapter.space
    }
}