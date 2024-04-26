import { type PopUpText } from "./interfaces";

//TEXTS
export const HOME_MAIN_TEXT = "Necro Gate";
export const SCOREBOARD_MAIN_TEXT = "Tableau des scores";
export const CHARACTER_CREATION_MAIN_TEXT = "Qui étiez-vous?";

//POPUPS
export const POP_UP_FLEE: PopUpText = {
    title: "Vous fuyez le combat",
    description: "Une retraite stratégique est de mise, mais vous savez que vous ne faite que retarder l'inévitable. Une nouvelle battaille se pointe à l'horizon. Voulez-vous vous soigner avant de continuer?",
    buttonFalseText: "Continuer",
    buttonTrueText: "Se soigner"
};

export const POP_UP_LOSS: PopUpText = {
    title: "Vous avez perdu",
    description: "Vous avez été vaincu par les forces du mal. Voulez-vous recommencer?",
    buttonFalseText: "Retour à l'accueil",
    buttonTrueText: "Recommencer"
};

export const POP_UP_FIGHT_OVER: PopUpText = {
    title: "La bataille est terminée",
    description: "La bataille est terminée. Voulez-vous continuer?",
    buttonFalseText: "Retour à l'accueil",
    buttonTrueText: "Continuer"
};

//COLORS
export const PLAYER_COLOR = "#3dc414";
export const ENEMY_COLOR = "#cf0000";
export const UNDEAD_COLOR = "#fff761";
export const GAME_COLOR = "#ffffff";

//PLAYER
export const PLAYER_NAME_MAX_LENGTH = 19;

export const DEFAULT_PLAYER_HEALTH = 500;
export const DEFAULT_PLAYER_STRENGTH = 100;
export const DEFAULT_PLAYER_EXPERIENCE = 4;
export const DEFAULT_PLAYER_LIFE_FORCE = 200;

export const PLAYER_SUMMON_COST = 30;

export const PLAYER_HEAL_COST_PER_AMOUNT = 1;
export const PLAYER_HEAL_AMOUNT = 5;

export const PLAYER_BLOCK_DAMAGE_DIVIDER = 2;

//ENEMY
export const ENEMY_MINION_KILL_CHANCE = 0.2;

//GAME GENERAL
export const GAME_DELAY = 1000;
export const GAME_FIGHT_AMOUNT = 5;

export const ATTACK_DAMAGE_RANGE = 50;
export const DEATH_TRESHOLD = 0;
export const HIT_CHANCE_PERCENTAGE = 20;
export const GAME_EXPERIENCE_TEXT = [
    "Apprenti",
    "Disciple",
    "Expert",
    "Maître",
    "Légende"
];

