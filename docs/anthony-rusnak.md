# Doc du TP02 du code de Anthony Rusnak

Par Jimmy O.

## Routes

Les routes sont très bien nommées. Leurs noms indiquent clairement à quel endroit elles mènent. De même, les chemins sont très clairs. Voici quelques exemples :


|        Nom        |   Chemin   |       Composant       |
| :-----------------: | :----------: | :---------------------: |
|       Home       |     /     |       HomeView       |
|      Scores      |  /scores  |    ScoreBoardView    |
| CharacterCreation | /character | CharacterCreationView |

Les routes fonctionnent toutes très bien et sont bien utilisées avec les `router-link`. Lorsqu'un chemin d'entrée est invalide, cela mène bien à `NotFoundView.vue`. Bravo!

## Utilisation des composants

Un composant `NavigationBar.vue` a été créé pour la barre de navigation, ce qui montre une bonne utilisation des composants. Très belle barre de navigation en plus ! Un autre composant pourrait être créé pour ajouter un footer, puisqu'il n'y en a pas encore sur le site.

## Scripts

Les scripts de types suivants sont une très bonne idée :

* `character.ts`
* `ranking.ts`
* `title.ts`

Cependant, je crois qu'il serait plus pertinent d'avoir un seul script de types et on importe seulement les interfaces dont on a besoin. Par exemple, si on veut importer les types `Character` et `Ranking` et que le script s'appelle `types.ts`, il suffirait simplement d'écrire `import type { Character, Ranking } from '../scripts/types.ts'` au lieu de faire deux *imports* séparés.

## Tableau de scores

Le tableau de scores est bien trié et il est très facile à implémenté dans le HTML. Cependant, un commentaire pour préciser ce que la ligne de code suivante fait pourrait être pertinent : `rankings.value = rankings.value.sort((a, b) => b.score - a.score)`.

## La logique de jeu

Les différentes actions que le joueur peut faire sont identifiées dans une énumération `ActionType` avec des noms très simples et clairs :

* `ATTACK` pour attaquer l'ennemi
* `DEFEND` pour se défendre
* `HEAL` pour se soigner
* `SUMMON` pour invoquer un mort-vivant
* `FLEE` pour fuir un combat

J'aime beaucoup comment la fonction `playerAct()` gère les actions du joueur. L'énumération est utilisée pour identifier l'action que le joueur a sélectionnée, ce qui fait en sorte qu'on se retrouve assez bien dans le code.

La présence d'un `gameLog` est non seulement un élément fort pratique pour que le joueur arrive mieux à suivre le déroulement du jeu, elle aide aussi à déboguer plus facilement plutôt que de faire des `console.log()`.

La logique pour calculer les dégâts du joueur, des morts-vivants et des ennemis est la même partout, donc la présence de la fonction `handleAttack()` fait beaucoup de sens. Cependant, je pense que le nom de la fonction `handleAttack()` pourrait être un peu plus précis. Par exemple, elle pourrait s'appeler `handleDamage()` à la place, puisqu'elle ne fait que calculer les dégâts.


