/**
 * Espaces insécables de la typographie française.
 *
 * Devant « ? », « ! », « : », « ; » et « » », et derrière « « », le français
 * impose une espace qui ne doit pas être coupée en fin de ligne. Écrite en
 * espace ordinaire dans les données, elle laisse le navigateur rejeter le
 * signe seul au début de la ligne suivante : un « ? » orphelin sous une
 * question de FAQ, ou sous le h1 de /devenir-partenaire (signalé par Peter le
 * 2026-09-22, corrigé à la main dans ce titre).
 *
 * Appliquée au rendu et non aux données : les mêmes textes alimentent le
 * balisage schema.org (`FAQPage`), où un caractère U+00A0 n'apporte rien et
 * complique la comparaison avec ce qu'affiche un moteur.
 *
 * U+00A0 (insécable) plutôt que U+202F (fine insécable) : l'espace fine n'est
 * pas présente dans toutes les polices et tombe alors sur un glyphe de
 * remplacement, alors que l'insécable classique est universelle.
 */
export function insecables(text: string): string {
  return text
    .replace(/ ([?!:;»])/g, " $1")
    .replace(/« /g, "« ");
}
