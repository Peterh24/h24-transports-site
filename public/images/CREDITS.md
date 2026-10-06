# Crédits & licences des visuels

**Les visuels en service sont des prises de vue H24**, à cinq exceptions près,
toutes documentées plus bas : `campagnes/fashion-week-podium.webp` et les
quatre visuels de `partenaires/` (Pexels).

| Page | Fichier |
|---|---|
| `/a-propos` | `apropos/truck-night.webp` |
| `/evenementiel` | `evenementiel/event-tailgate.webp` |
| `/express` | `express/van-motion.webp` |
| `/colis` | `colis/truck-boxes.webp` |
| `/contact` | `contact/dispatch-desk.webp` |
| `/transport-materiel-audiovisuel-paris` | `audiovisuel/camera-cinema.webp` + `audiovisuel/camera-cinema-mobile.webp` |
| `/` (bloc « temps fort ») | `campagnes/fashion-week-podium.webp` |
| `/devenir-partenaire` | `partenaires/paris-nuit.webp` + `partenaires/paris-nuit-mobile.webp` (en-tête), `partenaires/voie-rapide-nuit.webp`, `partenaires/cartons-utilitaire.webp` |

## `audiovisuel/` — deux cadrages pour un seul en-tête

C'est le **seul en-tête du site à deux visuels**, et le seul rendu en
`<picture>` plutôt qu'en `next/image` (cf. le commentaire dans
`PageHeader.tsx`). Ce n'est pas du choix de résolution mais de la
**direction artistique** : deux compositions différentes.

| Fichier | Dimensions | Poids | Servi |
|---|---|---|---|
| `camera-cinema.webp` | 1672 × 941 (16:9) | 77 ko | au-dessus de 900 px |
| `camera-cinema-mobile.webp` | 941 × 1672 (9:16) | 114 ko | jusqu'à 900 px |

Le palier de 900 px n'est pas arbitraire : c'est celui où
`.page-header.has-photo` change déjà de comportement dans `globals.css`
(`min-height` au-delà de 901 px). Un seul palier, au même endroit.

Le cadrage paysage place le rig **à droite**, ce qui laisse le studio sombre
sous le titre — c'est ce qui rend le H1 lisible sans surcharger le voile.
Ne pas recadrer au centre.

Fournies par Peter le 2026-09-16, en versions retravaillées de sa prise de
vue `H24_TRANSPORTS_-16.webp` du même jour. Converties en WebP qualité 82,
**sans recadrage ni redimensionnement de ma part** : les deux fichiers
arrivaient déjà aux bons formats.

Le rig porte les marquages **Vantage** et **Next Shot**, deux noms présents
dans `src/data/clients.ts` et affichés sur l'accueil. C'est donc du matériel
de clients réels, et non une marque tierce comme l'écran de régie retiré du
visuel Fashion Week ci-dessous — les remplacer par des images de banque
ferait perdre cette authenticité.

⚠️ Provenance à confirmer par Peter : ces visuels sont traités comme des
prises de vue H24. Si le tirage d'origine est l'œuvre d'un tiers
(photographe d'un client, loueur), le droit d'usage doit être vérifié et
cette section corrigée.

Historique : une photo Pexels (2873486, caméra Canon) a occupé cet en-tête
quelques heures le même jour, avant d'être remplacée par ces deux visuels.
Les deux écueils rencontrés pendant cette recherche méritent d'être retenus
pour la prochaine fois :

- **la licence Pexels ne couvre pas les autorisations de personnes.** Un
  visage reconnaissable sur une page qui promeut un service commercial est
  un risque réel, pas une question de goût ;
- **les descriptions de Pexels ne sont pas fiables.** La fiche de la photo
  32232618 annonçait « no recognizable faces, readable brand logos, or
  license plates » ; l'image montrait un logo « HALO HUB » deux fois, une
  URL, un QR code et une plaque lisible. Toujours ouvrir l'image.

## `partenaires/` : quatre visuels Pexels pour `/devenir-partenaire`

Ajoutés le 2026-09-22 à la demande de Peter, la page n'ayant aucun visuel à
sa création le même jour. Aucune prise de vue H24 ne montrait ni Paris de nuit
en plan large ni l'intérieur d'un utilitaire chargé. Les quatre photos ont été
**ouvertes et vérifiées une à une** avant retenue : aucun visage reconnaissable,
aucune plaque lisible, et les deux marques tierces rencontrées ont été traitées
(voir « Traitement »). Licence Pexels pour les quatre : usage commercial
gratuit, modification autorisée, attribution non obligatoire.

Écartées pendant la recherche, pour mémoire : un camion coréen de nuit (26443249,
logo d'entreprise et plaque lisibles), une rangée d'utilitaires (12700835,
livrée d'une société tierce), un Caddy sur autoroute (29297779, logo et plaque),
un livreur de dos (14925501, carton et gilet marqués), un utilitaire « Global24 »
(21838827), une brasserie parisienne (30297583, enseignes et visage).

### `paris-nuit.webp` et `paris-nuit-mobile.webp` : l'en-tête, en deux cadrages

Même mécanique que `audiovisuel/` : deux compositions d'une même scène (Paris
depuis l'Arc de Triomphe, l'avenue de la Grande-Armée vers La Défense), servies
par le `<picture>` de `PageHeader.tsx` au palier de 900 px.

| | `paris-nuit.webp` | `paris-nuit-mobile.webp` |
|---|---|---|
| Source | [Pexels 30399118](https://www.pexels.com/photo/stunning-nightscape-of-paris-from-above-30399118/) | [Pexels 30399136](https://www.pexels.com/photo/paris-night-scene-with-vibrant-city-lights-30399136/) |
| Auteur | Maximilian Orlowsky | Maximilian Orlowsky |
| Original | 4834 × 2672 | 3124 × 4686 |
| Cadrage | 3:2, fenêtre de 4008 px de large décalée à 55 % vers la droite | 9:16, fenêtre de 2635 px centrée |
| Livré | 1920 × 1280, WebP qualité 82 | 941 × 1672, WebP qualité 82 |

`paris-nuit-og.jpg` (1200 × 630, JPEG qualité 82, 139 ko) est un troisième
cadrage de la même source 30399118, bande centrale prise à 90 px du haut, pour
la carte de partage (`opengraph-image` et `twitter-image` de la page). JPEG et
non WebP parce que Satori, le moteur de `next/og`, ne lit pas le WebP. À ce
format l'enseigne de la tour restait lisible sur un premier essai : le JPEG
est donc produit depuis la source floutée, avec le même masque elliptique.

**Traitement à refaire si la photo est régénérée** : au sommet de la tour en
haut à droite du cadrage paysage, une enseigne d'hôtel est lisible sur
l'original. Elle est **floutée à la source** (flou gaussien de rayon 14 sur la
zone 3492..3679 × 532..636 de l'original) avant recadrage, comme le visage de
`contact/dispatch-desk.webp`. Le portrait ne la montre pas.

### `voie-rapide-nuit.webp` : section « ce que nous apportons »

| | |
|---|---|
| Source | [Pexels 6058278](https://www.pexels.com/photo/cars-driving-on-highway-at-night-6058278/) |
| Auteur | Bastian Riccardi |
| Original | 5184 × 3456 (pose longue de 6 s) |
| Traitement | recadrée sur les 80 % gauches de l'image (2304 × 1920 depuis la copie 2880 × 1920), redimensionnée en 1240 × 1040, WebP qualité 82 |

Le recadrage n'est **pas cosmétique** : la partie droite porte deux panneaux
directionnels lisibles (« Messe/ICM », « Harlaching », la photo est prise à
Munich) et un abribus publicitaire. Sortis du cadre, il reste une voie rapide
urbaine anonyme, ce qui est le sujet voulu. Refaire ce recadrage si la photo
est régénérée depuis la source.

### `cartons-utilitaire.webp` : section « ce que nous attendons »

| | |
|---|---|
| Source | [Pexels 7843987](https://www.pexels.com/photo/brown-cardboard-boxes-inside-a-delivery-van-7843987/) |
| Auteur | Kampus Production |
| Original | 4016 × 6016 |
| Traitement | fenêtre 6:5 prise à 16,5 % du haut de la copie 2400 × 3595, redimensionnée en 1240 × 1040, WebP qualité 82 |

Seules inscriptions visibles : un code-barres et des pictogrammes « fragile »
sur les cartons, sans marque.

## Exception : `campagnes/fashion-week-podium.webp`

**Premier visuel du site à ne pas être une prise de vue H24** (les quatre de
`partenaires/` ont suivi le 2026-09-22). Ajouté le
2026-09-15 pour le bloc « temps fort » de l'accueil, à la demande de Peter, le
site n'ayant aucune photo de défilé.

| | |
|---|---|
| Source | [Pexels — photo 28587831](https://www.pexels.com/photo/vibrant-fashion-show-runway-with-dramatic-lighting-28587831/) |
| Auteur | Thể Phạm ([profil](https://www.pexels.com/@phamthe/)) |
| Licence | Pexels License — usage commercial gratuit, attribution non obligatoire |
| Traitement | recadrée (2400×1000 depuis 2400×1600, à partir de y=600), redimensionnée en 1920×800, WebP qualité 82 |

Le recadrage n'est **pas cosmétique** : l'original montre en haut du cadre un
écran d'régie affichant « AQUAFINA VIETNAM INTERNATIONAL FASHION WEEK ». Une
marque tierce lisible sur l'accueil d'un transporteur n'a rien à y faire. Si
la photo est régénérée depuis la source, refaire ce recadrage.

⚠️ **À compléter** : les six visuels de `mode/` (ajoutés le 2026-09-09) ne
figurent dans aucune ligne de ce tableau, et la phrase d'introduction
ci-dessus n'a pas été revue depuis. Leur provenance n'est donc tracée nulle
part. `mode/rack-tailgate.webp` est désormais servi aussi sur l'accueil : si
ce n'est pas une prise de vue H24, c'est ici qu'il faut le dire.
`mode/defile-backstage.webp` montre par ailleurs des visages reconnaissables
de face — à ne pas réemployer ailleurs sans savoir d'où il vient.

`contact/dispatch-desk.webp` : le visage du collaborateur est **flouté**
(ellipse adoucie appliquée à la source avant conversion). Si la photo doit être
régénérée, refaire le flou — il n'est pas dans le fichier d'origine
(`event.jpg` / `contact.jpg` du poste de travail).

Les photos d'en-tête sont recadrées en 3:2 puis redimensionnées en 1920×1280,
sauf `express/van-motion.webp` (1536×1024) et `colis/truck-boxes.webp`
(1448×965), livrées à la résolution de leur source — pas d'agrandissement.
`audiovisuel/` est le seul en-tête à deux visuels et ne suit pas ce gabarit
(16:9 et 9:16, voir sa section).
