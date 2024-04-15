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

