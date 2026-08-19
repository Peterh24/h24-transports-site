/**
 * Conditions générales de vente — texte rédigé par le conseil de H24 Transports,
 * fourni par Peter le 2026-08-19.
 *
 * ⚠️ DOCUMENT CONTRACTUEL. Le texte ci-dessous est reproduit fidèlement. Les
 * seules modifications apportées sont factuelles, jamais rédactionnelles :
 *   - capital social porté de 10 000 € à 50 000 € (montant périmé dans la
 *     version d'origine) ;
 *   - trois marqueurs « Insérer … » restés vides comblés avec les
 *     coordonnées réelles et l'hébergeur (identiques aux mentions légales) ;
 *   - numérotation corrigée : la version d'origine comportait deux « 1.1 »
 *     consécutifs (Directeur de la publication, puis Hébergeur).
 *
 * L'article 1 n'est PAS dans ce fichier : il est généré depuis le bloc `LEGAL`
 * de `src/data/site.ts`, pour qu'il soit impossible que les CGV et les
 * mentions légales divergent sur un identifiant ou un montant.
 *
 * Toute évolution du fond doit venir du conseil, pas d'ici.
 */

export type CgvBlock =
  | { type: "p"; text: string }
  | { type: "sub"; num: string; title: string }
  | { type: "ul"; items: string[] }
  | { type: "dl"; items: { term: string; def: string }[] };

export type CgvArticle = {
  num: string;
  title: string;
  blocks: CgvBlock[];
};

export const CGV_UPDATED = "2026-08-19";

export const CGV_ARTICLES: CgvArticle[] = [
  {
    num: "2",
    title: "Objet",
    blocks: [
      {
        type: "p",
        text: "Les présentes conditions générales de vente ont pour objet de régir les relations contractuelles entre le Donneur d'ordre et H24 TRANSPORTS et de définir les modalités d'exécution des prestations.",
      },
      {
        type: "p",
        text: "Le Donneur d'ordre et H24 TRANSPORTS conviennent que leurs relations seront régies exclusivement par les présentes conditions générales de vente qui prévalent sur tout autre document tel que toutes conditions d'achat sauf accord écrit préalable de H24 TRANSPORTS.",
      },
    ],
  },
  {
    num: "3",
    title: "Définitions",
    blocks: [
      {
        type: "dl",
        items: [
          {
            term: "Colis ou Unité de chargement",
            def: "un objet ou un ensemble matériel composé de plusieurs objets, quels qu'en soient le poids, les dimensions et le volume, constituant une charge unitaire lors de la remise à H24 TRANSPORTS (bac, cage, caisse, cantine, carton, conteneur autre que UTI, enveloppe, fardeau, fût, paquet, palette cerclée ou filmée par le Donneur d'ordre, rolls, sac, valise, etc.), même si le contenu en est détaillé dans le document de remise.",
          },
          {
            term: "Destinataire",
            def: "la partie, désignée par le Donneur d'ordre ou par son représentant, à laquelle la livraison est faite.",
          },
          {
            term: "Donneur d'ordre",
            def: "la partie qui conclut le contrat de transport avec H24 TRANSPORTS.",
          },
          {
            term: "Envoi",
            def: "la quantité de marchandises, emballage et support de charge compris, mise effectivement, au même moment, à la disposition de H24 TRANSPORTS et dont H24 TRANSPORTS est demandé par un même Donneur d'ordre pour un même Destinataire d'un lieu de chargement unique à un lieu de déchargement unique et faisant l'objet d'un même contrat de transport.",
          },
          {
            term: "Livraison",
            def: "la remise physique de la marchandise au Destinataire ou à son représentant dûment désigné, qui l'accepte juridiquement.",
          },
        ],
      },
    ],
  },
  {
    num: "4",
    title: "Obligations du Donneur d'ordre",
    blocks: [
      { type: "sub", num: "4.1", title: "Informations à fournir à H24 TRANSPORTS" },
      {
        type: "p",
        text: "Le Donneur d'ordre fournit à H24 TRANSPORTS par tout moyen les indications suivantes :",
      },
      {
        type: "ul",
        items: [
          "les noms et les adresses complètes, ainsi que les numéros de téléphone, l'adresse électronique de l'expéditeur et du Destinataire ;",
          "les noms et les adresses complètes, ainsi que les numéros de téléphone, de télécopie, l'adresse électronique des lieux de chargement et de déchargement, lorsque ces derniers diffèrent de ceux indiqués ci-dessus ;",
          "le nom et l'adresse du Donneur d'ordre ;",
          "les dates et les heures de chargement et de déchargement ;",
          "la nature très exacte de la marchandise (le poids brut de l'envoi, les marques, le nombre de Colis), les précautions à prendre, les spécificités si la marchandise en requiert ;",
          "la valeur de la marchandise ;",
          "les dimensions des colis, le métrage linéaire de plancher ou le volume nécessaire ;",
          "le numéro de la commande et les références de l'envoi ;",
          "le cas échéant, les prestations annexes convenues et leurs modalités d'exécution ;",
          "les instructions spécifiques en cas d'empêchement à la livraison (nouvelle présentation, livraison à domicile, mise en entrepôt, retour, vente ou destruction de la marchandise, etc.).",
        ],
      },
      {
        type: "p",
        text: "Le Donneur d'ordre fournit à H24 TRANSPORTS, en même temps que la marchandise, les renseignements et les documents d'accompagnement nécessaires à la bonne exécution d'une opération de transport soumise à une réglementation particulière, telle que régie, douane, police, marchandises dangereuses, etc.",
      },
      {
        type: "p",
        text: "Le Donneur d'ordre supporte vis-à-vis de H24 TRANSPORTS les conséquences d'une déclaration fausse ou incomplète sur les caractéristiques de l'envoi ainsi que d'une absence ou d'une insuffisance de déclaration ayant eu pour effet, entre autres, de dissimuler le caractère dangereux ou frauduleux des marchandises transportées. Il répond également de tout manquement à son obligation d'information mentionnée ci-dessus.",
      },
      { type: "sub", num: "4.2", title: "Emballage" },
      {
        type: "p",
        text: "La marchandise doit être conditionnée, emballée, marquée ou contremarquée, de façon à supporter une opération de transport et/ou de stockage exécutés dans les conditions normales, ainsi que les manutentions successives intervenant lors de ces opérations. Elle ne doit pas constituer une cause de danger pour les personnels de conduite ou de manutention, les lieux de stockage, les autres marchandises transportées ou stockées, les véhicules ou tiers.",
      },
      {
        type: "p",
        text: "Dans l'hypothèse où le Donneur d'ordre confierait à H24 TRANSPORTS des marchandises contrevenant aux dispositions précitées, celles-ci seraient transportées ou stockées aux risques et périls du Donneur d'ordre et sous décharge de la responsabilité de H24 TRANSPORTS.",
      },
      {
        type: "p",
        text: "Le fait que H24 TRANSPORTS n'ait pas formulé de réserves à leur sujet lors de la prise en charge de la marchandise ne lui interdit pas d'invoquer ultérieurement l'absence, l'insuffisance ou la défectuosité du conditionnement, de l'emballage, du marquage, de l'étiquetage, ainsi qu'un manquement à l'obligation d'information incombant au Donneur d'ordre.",
      },
      { type: "sub", num: "4.3", title: "Étiquetage" },
      {
        type: "p",
        text: "Sur chaque colis, objet ou support de charge, un étiquetage clair doit être effectué pour permettre une identification immédiate et sans équivoque de l'expéditeur, du Destinataire, du lieu de livraison, ainsi que de la nature de la marchandise. Les mentions des étiquettes doivent correspondre à celles qui figurent sur le document de transport.",
      },
    ],
  },
  {
    num: "5",
    title: "Modification du contrat",
    blocks: [
      { type: "sub", num: "5.1", title: "Modification par le Donneur d'ordre" },
      {
        type: "p",
        text: "Le Donneur d'ordre dispose de la marchandise jusqu'au moment où le Destinataire fait valoir ses droits. Toute modification au contrat par le Donneur d'ordre entraîne un réajustement du prix initial.",
      },
      { type: "sub", num: "5.2", title: "Modification des CGV" },
      {
        type: "p",
        text: "H24 TRANSPORTS se réserve le droit de modifier à tout moment les présentes CGV.",
      },
      {
        type: "p",
        text: "Dans une telle hypothèse, le Donneur d'ordre prendra connaissance de la nouvelle version des CGV lors de l'émission d'un nouveau devis pour une nouvelle prestation et/ou la conclusion d'un nouveau contrat et pourra les consulter à tout moment depuis le site H24 TRANSPORTS. Le Donneur d'ordre est informé que toute signature de devis postérieurement à l'entrée en vigueur de la nouvelle version des CGV, emportera l'acceptation pleine et entière de celles-ci.",
      },
    ],
  },
  {
    num: "6",
    title: "Livraison",
    blocks: [
      {
        type: "p",
        text: "La livraison est effectuée entre les mains du Destinataire ou son représentant désigné par le Donneur d'ordre et figurant sur le document de transport.",
      },
      { type: "sub", num: "6.1", title: "Réserves du Destinataire" },
      {
        type: "p",
        text: "Le Destinataire peut formuler des réserves précises et motivées sur l'état de la marchandise et la quantité remise.",
      },
      {
        type: "p",
        text: "Dès que le Destinataire a pris possession de l'envoi, avec ou sans réserve, il en donne décharge au transporteur en datant et signant le document de transport par tout moyen.",
      },
      {
        type: "p",
        text: "En cas de perte, d'avarie ou de tout dommage subi par la marchandise, ou en cas de retard, il appartient au Destinataire de procéder aux constatations régulières et suffisantes, de prendre des réserves motivées et en général d'effectuer tous les actes utiles à la conservation des recours et à confirmer lesdites réserves dans les formes et les délais légaux, faute de quoi aucune action ne pourra être exercée contre notre société.",
      },
      {
        type: "sub",
        num: "6.2",
        title: "Livraison en absence du Donneur d'ordre, du Destinataire ou de son représentant",
      },
      {
        type: "p",
        text: "Toute livraison effectuée en l'absence du Donneur d'ordre, du Destinataire ou de son représentant et à sa demande, s'effectue sous son entière responsabilité, et est présumée conforme.",
      },
      { type: "sub", num: "6.3", title: "Retard de livraison" },
      {
        type: "p",
        text: "Il y a retard à la livraison lorsque l'envoi n'a pas été livré dans le délai convenu ou, s'il n'a pas été convenu de délai, lorsque la durée effective du transport dépasse le délai d'acheminement.",
      },
      {
        type: "p",
        text: "En cas de préjudice prouvé résultant d'un retard à la livraison du fait du transporteur, celui-ci est tenu de verser une indemnité qui ne peut excéder le prix du transport (droits, taxes et frais divers exclus).",
      },
    ],
  },
  {
    num: "7",
    title: "Matériels de transport et de manutention",
    blocks: [
      {
        type: "p",
        text: "Le transporteur effectue le transport à l'aide d'un matériel adapté aux marchandises à transporter ainsi qu'aux accès et installations de chargement et de déchargement préalablement définis par le Donneur d'ordre.",
      },
      {
        type: "p",
        text: "Le Donneur d'ordre est responsable des dommages causés au véhicule du transporteur par la marchandise, son emballage, son chargement. Il en est de même pour le Destinataire en ce qui concerne les opérations de déchargement. La preuve de la faute incombe au transporteur.",
      },
      {
        type: "p",
        text: "Les lieux désignés par le Donneur d'ordre doivent être accessibles sans contrainte ni risque particulier pour des véhicules de caractéristiques usuelles pour le transport considéré.",
      },
    ],
  },
  {
    num: "8",
    title: "Défaillance totale ou partielle du Donneur d'ordre dans la remise de l'envoi",
    blocks: [
      {
        type: "p",
        text: "Le Donneur d'ordre est responsable de la non remise de l'envoi lors de la mise à disposition du véhicule, dans ce cas une rémunération égale au quart du prix du transport sera due à H24 TRANSPORTS.",
      },
    ],
  },
  {
    num: "9",
    title: "Délai d'acheminement",
    blocks: [
      {
        type: "p",
        text: "Le délai d'acheminement comprend le délai de transport et le délai de livraison, sauf convention contraire expressément établie entre H24 TRANSPORTS et le Donneur d'ordre.",
      },
    ],
  },
  {
    num: "10",
    title: "Empêchement au transport",
    blocks: [
      {
        type: "p",
        text: "Si le transport est empêché ou interrompu ou si, pour un motif quelconque, l'exécution du transport est ou devient impossible dans les conditions initialement prévues, H24 TRANSPORTS demande des instructions au Donneur d'ordre.",
      },
      {
        type: "p",
        text: "Si le transporteur n'a pu obtenir en temps utile les instructions du Donneur d'ordre, il prend les mesures qui lui paraissent les meilleures dans l'intérêt de ce dernier pour la conservation de la marchandise ou son acheminement par d'autres voies ou d'autres moyens.",
      },
      {
        type: "p",
        text: "Sauf si l'empêchement, l'interruption ou l'impossibilité est imputable à H24 TRANSPORTS, le Donneur d'ordre rembourse à H24 TRANSPORTS les dépenses justifiées consécutives aux instructions données ou aux mesures prises en application des alinéas précédents. Ces dépenses, ainsi que les frais d'immobilisation du véhicule et/ou de l'équipage, sont facturées séparément, en sus du prix du transport convenu.",
      },
      {
        type: "p",
        text: "En cas d'empêchement définitif dû à la force majeure, H24 TRANSPORTS a droit à la partie du prix du transport correspondant au trajet effectué jusqu'à l'arrêt du transport.",
      },
    ],
  },
  {
    num: "11",
    title: "Prix des prestations et modalités de paiement",
    blocks: [
      {
        type: "p",
        text: "Le prix du transport est établi en fonction du type de véhicule utilisé, de ses équipements, de la nature de la marchandise, de son poids, de son volume, du nombre de colis, de la distance du transport, des délais d'acheminement, de la relation assurée, des caractéristiques du trafic, des sujétions particulières de circulation, de la durée de mise à disposition du véhicule et de l'équipage, plus généralement des coûts engendrés par la prestation demandée.",
      },
      {
        type: "p",
        text: "Le prix du transport initialement convenu est révisé mensuellement pour tenir compte de la variation des prix du carburant et en cas de variations significatives des charges de H24 TRANSPORTS qui tiennent à des conditions extérieures à cette dernière.",
      },
      { type: "p", text: "Tous les prix sont calculés hors taxes." },
      {
        type: "p",
        text: "Les factures sont payables à la date d'échéance indiquée sur celles-ci et au plus tard à 30 jours à compter de la date d'émission de la facture. La compensation unilatérale du montant des dommages allégués sur le prix des prestations dues est strictement interdite sauf accord exprès de H24 TRANSPORTS.",
      },
      {
        type: "p",
        text: "Tout retard dans le paiement entraîne de plein droit, le jour suivant la date de règlement figurant sur la facture, l'exigibilité d'intérêts de retard d'un montant équivalent à cinq fois le taux d'intérêt légal, ainsi que d'une indemnité forfaitaire pour frais de recouvrement d'un montant minimum de 40 euros suivant l'article D. 441-5 du code de commerce, et ce, sans préjudice de la réparation éventuelle, dans les conditions du droit commun, de tout autre dommage résultant directement de ce retard.",
      },
      {
        type: "p",
        text: "En outre, H24 TRANSPORTS aura la possibilité de suspendre immédiatement toute prestation jusqu'à complet règlement de sa créance notifiée par tout moyen écrit ou par tout moyen électronique de transmission et de conservation de données.",
      },
    ],
  },
  {
    num: "12",
    title: "Responsabilité",
    blocks: [
      {
        type: "p",
        text: "La responsabilité de H24 TRANSPORTS est strictement limitée aux dommages matériels, directs et justifiés. La notion de préjudice matériel et direct exclut l'indemnisation des pertes de chances, pertes d'exploitation, de production, de profits, de revenus, les gains manqués et plus généralement les pertes ou dommages immatériels et/ou indirects.",
      },
      {
        type: "p",
        text: "En cas de perte ou d'avarie, la responsabilité de H24 TRANSPORTS est limitée comme suit :",
      },
      {
        type: "ul",
        items: [
          "pour les envois inférieurs à trois tonnes, cette indemnité ne peut excéder 33 € par kilogramme de poids brut de marchandises manquantes ou avariées pour chacun des objets compris dans l'envoi, sans pouvoir dépasser 1 000 € par Colis perdu, incomplet ou avarié, quels qu'en soient le poids, le volume, les dimensions, la nature ou la valeur ;",
          "pour les envois égaux ou supérieurs à trois tonnes, elle ne peut excéder 20 € par kilogramme de poids brut de marchandises manquantes ou avariées pour chacun des objets compris dans l'envoi, sans pouvoir dépasser, par envoi perdu, incomplet ou avarié quels qu'en soient le poids, le volume les dimensions, la nature ou la valeur, une somme supérieure au produit du poids brut de l'envoi exprimé en tonnes multiplié par 3 200 €.",
        ],
      },
    ],
  },
  {
    num: "13",
    title: "Assurances",
    blocks: [
      {
        type: "p",
        text: "H24 TRANSPORTS a souscrit à une assurance sur le transport couvrant tout risque et en tout lieu. Une attestation pourra être communiquée au Donneur d'ordre sur demande.",
      },
    ],
  },
  {
    num: "14",
    title: "Annulation",
    blocks: [
      {
        type: "p",
        text: "En cas d'annulation communiqué par tout moyen de la prestation, le paiement du prix sera du selon les modalités suivantes :",
      },
      {
        type: "ul",
        items: [
          "Annulation 3h avant la réalisation de la prestation, 70 % du prix HT sera facturé ;",
          "Annulation 8h avant la réalisation de la prestation, 50 % du prix HT sera facturé ;",
          "Annulation 12h avant la réalisation de la prestation, 30 % du prix HT sera facturé ;",
          "Annulation 24h avant la réalisation de la prestation, 20 % du prix HT sera facturé.",
        ],
      },
    ],
  },
  {
    num: "15",
    title: "Généralité",
    blocks: [
      {
        type: "p",
        text: "Au cas où l'une quelconque des dispositions des présentes conditions générales de vente serait déclarée nulle ou réputée non écrite, toutes les autres dispositions resteraient applicables.",
      },
      {
        type: "p",
        text: "En cas de litige, d'appel en garantie ou de contestation, seul le Tribunal de Commerce de Paris est compétent. La loi applicable est le Droit Français.",
      },
    ],
  },
];
