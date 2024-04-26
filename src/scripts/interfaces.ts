export interface Character {
    readonly id: number;
    readonly name: string;
    readonly title: string;
    lifeForce: number;
    readonly strength: number;
    readonly experience: number;
    readonly vitality: number;
}

export interface Undead {
    readonly id: number;
    readonly type: string;
    readonly strength: number;
    readonly experience: number;
}

export interface Ranking { 
    readonly id: number;
    readonly name: string;
    readonly score: number;
}

export interface Title {
    readonly id: number;
    readonly name: string;
}

export interface PopUpText {
    title: string;
    description: string;
    buttonFalseText: string;
    buttonTrueText: string;
}