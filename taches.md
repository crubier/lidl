

# 6 Juillet

## Redimensionnement automatique de la table

Suivre l'exemple fait sur fixed-data-table/site/examples/TouchExampleWrapper.js

`npm install --save`     pour les modules complementaires si besoin

## Scenario editor

Exemple de comportement souhaité

Code editor :

    {x:Number in, y:Number in, z: Number out}


Scenario editor:

    [
      {x:3,y:2},
      {x:4,y:5},
      {x:4},
      {y:6},
      {},
      {x:4,y:5}
    ]

Tableau :

| main.x | main.y | main.z |
|---|--|--|
|3|2|-|
|4|5|-|
|4|-|-|
|-|6|-|
|-|-|-|
|4|5|-|


### Contrainte

Pour que le scenario soit valide, il FAUT que les clés des objets JS qui le composent soient des `in` dans l'interface `main`

      var listOfAtoms = this.props.listOfAtoms;
      var scenarioValid = _.every(this.props.scenario,function(x){
        // l'etape de scenario x doit etre valide par rapport a listOfAtoms
        // utiliser _.keys(object)   pour avoir la liste des clefs d'un objet
        // utiliser une fonction recursive
        })

Voir les tests, ils doivent passer  `npm test`


## CSS

Modifier le CSS du tableau pour qu'il soit stylé

## Tableau : affichage des types

Remplacer `<Column/>` par `<ColumnGroup><Column></ColumnGroup>`

## Tableau : affichage du scenario

Voir code source de traceViewer


# 17 Juillet

Cas ou on a un scenario qui correspond a une interface atomique

[5,3,2,4,null,3]
