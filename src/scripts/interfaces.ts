export default interface Character {
    readonly id: number;
    readonly name: string;
    readonly title: string;
    readonly lifeForce: number;
    readonly experience: number;
    readonly vitality: number;
}

export default interface Ranking { 
    readonly id: number;
    readonly name: string;
    readonly score: number;
}

export default interface Title {
    readonly id: number;
    readonly name: string;
}  