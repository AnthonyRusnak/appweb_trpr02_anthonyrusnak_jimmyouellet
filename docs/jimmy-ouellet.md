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
