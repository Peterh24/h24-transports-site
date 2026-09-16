# Crédits & licences des visuels

**Les visuels en service sont des prises de vue H24**, à une exception près
documentée plus bas (`campagnes/fashion-week-podium.webp`, Pexels).

| Page | Fichier |
|---|---|
| `/a-propos` | `apropos/truck-night.webp` |
| `/evenementiel` | `evenementiel/event-tailgate.webp` |
| `/express` | `express/van-motion.webp` |
| `/colis` | `colis/truck-boxes.webp` |
| `/contact` | `contact/dispatch-desk.webp` |
| `/transport-materiel-audiovisuel-paris` | `audiovisuel/camera-cinema.webp` |
| `/` (bloc « temps fort ») | `campagnes/fashion-week-podium.webp` |

## `audiovisuel/camera-cinema.webp` — ce qu'elle montre

Fournie par Peter le 2026-09-16 (`H24_TRANSPORTS_-16.webp`) pour l'en-tête de
`/transport-materiel-audiovisuel-paris`, restée sans visuel jusque-là.
Recadrée en bande 3:2 (1667×1111 depuis y=500 sur un original 1667×2500,
portrait), WebP qualité 82 — **sans agrandissement**, comme
`express/van-motion.webp` et `colis/truck-boxes.webp`.

Le rig porte les marquages **Vantage** et **Next Shot**, deux noms présents
dans `src/data/clients.ts` et affichés sur l'accueil. C'est donc du matériel
de clients réels, et non une marque tierce comme l'écran de régie retiré du
visuel Fashion Week ci-dessous — la remplacer par une image de banque ferait
perdre cette authenticité.

Historique : une photo Pexels (2873486, caméra Canon) a occupé cet en-tête
quelques heures le même jour, avant d'être remplacée par celle-ci. Les deux
écueils rencontrés pendant cette recherche méritent d'être retenus pour la
prochaine fois :

- **la licence Pexels ne couvre pas les autorisations de personnes.** Un
  visage reconnaissable sur une page qui promeut un service commercial est
  un risque réel, pas une question de goût ;
- **les descriptions de Pexels ne sont pas fiables.** La fiche de la photo
  32232618 annonçait « no recognizable faces, readable brand logos, or
  license plates » ; l'image montrait un logo « HALO HUB » deux fois, une
  URL, un QR code et une plaque lisible. Toujours ouvrir l'image.

## Exception : `campagnes/fashion-week-podium.webp`

**Seul visuel du site qui ne soit pas une prise de vue H24.** Ajouté le
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
sauf `express/van-motion.webp` (1536×1024), `colis/truck-boxes.webp`
(1448×965) et `audiovisuel/camera-cinema.webp` (1667×1111), livrées à la
résolution de leur source — pas d'agrandissement.
