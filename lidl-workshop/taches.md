

# 06/07/2015

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


# 17/06/2015

Cas ou on a un scenario qui correspond a une interface atomique

[5,3,2,4,null,3]


# 28/08/2015

ajouter msgs d'erreurs (zone de texte)
supprimer l'interface editor
clarifier le passage de proprietes (model , texte)
rendre le tableau plus petit en hauteur pour qu'on puisse voir les boutons (traceviewer)
modifier l'hauteur de la zone de texte dans interaction editor (essayer en css) css zone de texte
rajouter un tab analyse du code qui contient la version compilée non editable
laisser une place pour le graphe


dans la version compiler mettre un peu de stat : combien de variable , combien de previous, de id de fct recusrion  si ça va jusqu'au nmbre 17 c'est qu'il y a 17 #
iii.operator.parse(interaction.operator)==="Previous" par exemple voir operator.pegjs


# 07/09/2015

identifier, composition, function, variable -----------------------------------------------------------
varibale =identifier+previous -------------------------------------------------------------------------

msg d'erreur si le scenario ne correspond pas à la definition    0000000000000000000000

modification de la zore d'erreur (state au lieu de getElement)---------------------------------------------
nommer compiled interaction=> Analyse -------------------------------------------------------------------
rendre les icons plus grandes voir font-awesome dans exemple fa-2x ----------------------------------------

modifier le tableau de sorte qu'on affiche tout à la base  000000000000000000000000000

wimp interface

svg
ajouter 2 onglets coté droite : un pour le tableau et un pour canvas ----------------------------------------
2eme onglet que le canvas

nettoyer le code--------------------------------------------------------------------------------------------
changer le background color du canvas exemple blanc---------------------
React.findDOMNode AU LIEU DE getElementByID
[]
AJOUTER dasn traceViewer
retour vers main  addToScenario()--------------
this.props.addToScenario(this.state.mainInterfaceState)  dans traceViewer
SCENARIO DEVRA CHANGER!!

gulp diploy pour avoir sur internet et puis sur iphone pou sur chrome le telephone à gauche puis device iphone5 pour devicemotion et touch

http://www.softfluent.fr/blog/expertise/2015/04/28/Enregistrer-du-son-via-le-Microphone-en-JavaScript

css backroud image  dans FixedDataTable  enlever le degradé
main.style .public_fixedDataTableRow_main
si ça marche pas recherche google "css !important" rajouter un !important à voir
ctrl+shift+p
vue=>commondePalette



interaction (test):{time:Number in,size:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}},keyboard:{U+0041:Number in,U+0040:Number in,U+0026:Number in,U+00E9:Number in,U+0022:Number in,U+0027:Number in,U+0028:Number in,U+00A7:Number in,U+00E8:Number in,U+0021:Number in,U+00E7:Number in,U+00E0:Number in,U+0029:Number in,U+002D:Number in,U+0009:Number in,U+005A:Number in,U+0045:Number in,U+0052:Number in,U+0054:Number in,U+0059:Number in,U+0055:Number in,U+0049:Number in,U+004F:Number in,U+0050:Number in,Unidentified:Number in,U+0024:Number in,Enter:Number in,Meta:Number in,Control:Number in,Alt:Number in,Shift:Number in,U+0051:Number in,U+0053:Number in,U+0044:Number in,U+0046:Number in,U+0047:Number in,U+0048:Number in,U+004A:Number in,U+004B:Number in,U+004C:Number in,U+004D:Number in,U+00F9:Number in,U+0020:Number in,U+003C:Number in,U+0057:Number in,U+005:Number in,U+0043:Number in,U+0056:Number in,U+0042:Number in,U+004E:Number in,U+002C:Number in,U+003B:Number in,U+003A:Number in,U+003D:Number in,Left:Number in,Down:Number in,Right:Number in,Up:Number in,U+001B:Number in,F1:Number in,F2:Number in,F3:Number in,F4:Number in,F5:Number in,F6:Number in,F7:Number in,F8:Number in,F9:Number in,F10:Number in,F11:Number in,F12:Number in}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})

# 16/09/2015

component didmount pour Interaction
enlever le state scenario-----------------------------------------------
rajouter keyboard dans interaction--------------------------------------
barres de défilement
agrandir la table des variables-----------------------------------------
numbre total d'interaction = la somme des trois derniers dans analyse-----------------------
