# Doc du TP02 du code de Jimmy Ouellet

Par Anthony R.

## Récit 1

### Bootstrap

Le visuel avec Bootstrap a été très bien fait et nous a donné une base solide pour tout le reste du visuel de notre site.

### Style & CSS

Le titre de la page utilise une modification du h1 qui est réutilisée dans chaque page du site. Il serait intéressant, pour éviter la répétition du code, de mettre la modification du h1 accessible à tous (par exemple dans le style.css).

L'image de fond du site est bien, mais il serait intéressant de l'implémenter d'une façon qui permettrait à chaque page d'avoir sa propre image/couleur de fond pour nous offrir davantage de flexibilité.

## Récit 2

### Bootstrap

La table bootstrap parvient à garder la bonne taille peu importe la taille des éléments à l'intérieur, ce qui est une très bonne chose. Cependant, il va falloir limiter la taille que le nom des joueurs peut avoir puisque s'il est trop long cela peut causer des problèmes tels que dans cet exemple:

![](assets/20240414_160329_image.png)
*Pas si problématique, mais il est préférable d'éviter tout de même.

Il y avait également la `<div class="table-responsive">` inutile laissée derrière qu'il vaut mieux retirer pour faciliter la lecture du code.

## Récit 6

### Composantes

La `PlayerUI` est divisée en plusieurs composantes pour éviter la répétition du code et l'alléger. Il serait par contre préférable de créer un dossier pour les composantes reliées aux statistiques, car cela prend beaucoup de place dans le dossier de composantes et réduit ainsi sa lisibilité.

![](assets/20240420_204407_2024-04-20_20_42_51-jimmy-ouellet.png)

## Récit 7

### Principe du Don't Repeat Yourself

Le code de `EnemyUI` est très similaire au code de `PlayerUI`. Le code est bien optimisé afin d'éviter trop de répétition, mais il y en a quand même beaucoup. Par exemple, la classe de la div container est la même : `class="bg-dark border border-success rounded border-4 characterUI container-fluid"`. Il aurait pu être possible de créer une seule composante `CharacterUI` qui serait réutilisée pour les deux affichages de stats. Cependant, cela aurait été beaucoup de props à passer en paramètre et donc assez complexe à mettre en place.

### Cacher les serviteurs

Dans les stats des ennemis, il ne fallait pas afficher leur nombre de serviteurs puisqu'ils n'en ont aucun. Pour ce faire, la div contenant les serviteurs est cachée, mais conserve sa présence, ce qui conserve un affichage similaire aux stats du joueur. Cela est très bien fait à l'exception que dans le v-bind qui ajoute la classe `hidden`, il vérifie que le minionCount est undefined. Il vaudrait peut-être mieux envoyer une valeur fictive comme (-1) plutôt que de ne pas passer de valeur.

## PopUp

### Modal

Le fait de créer un composant Popup qui est complètement réutilisable est excellent, car cela permet d'avoir qu'un seul composant popup dans la vue du jeu qui reçoit tout ce dont il a besoin. De cette manière, le code est ouvert à l'expansion, car tout événement, quel qu'il soit, peut utiliser le pop-up.

Cependant, il y a un problème. Pour interagir avec le modal, la variable `popUpModal` utilise un `getElementById`, ce qui n'est pas une bonne pratique en Vue. Il vaut mieux connecter directement une référence (ref) à l'élément HTML du modal, puis connecter cette référence à `popUpModal`.

### Interface

Avoir l'interfaces `PopUpText` est une excellent idée puisque cela diminue les valeurs passer dans la composante `PopUp`, d'ailleur, si on regarde l'interface en soit:
```
export interface PopUpText {
    title: string;
    description: string;
    buttonFalseText: string;
    buttonTrueText: string;
}
```
On voit ici facilement ce dont le popup à besoin (soit un titre, une description et deux bouton dont un retourne false et l'autre true).

### EventType

L'enum `EventType` est inutile puisque le popup n'a pas besoin de savoir quel événement a eu lieu, il serait préférable de le retirer.

## Tests

### Générale

Les tests vérifient en général tout ce qui est vraiment nécessaire à tester (rendering, événement, modification) bien que dans les tests du `Popup` il aurait pu être intéressant de vérifier que le popup est caché par défaut. Sinon, les tests sont compacts, simples et efficaces et font ce que l'on attendrait d'eux. Les noms sont significatifs et faciles à comprendre.

### Bonus

Tout ce qui était du bonus (invoquer des sbires, se défendre, etc.) n'a pas été testé par souci de temps. Il vaudrait tout de même mieux essayer de tester au moins minimalement ses ajouts pour s'assurer que tout fonctionne tel que désiré.
