/**
 * Demo translations for the Blend localization work.
 *
 * Blend itself ships English defaults and a typed key catalog only — it ships
 * no translated locale files. These dictionaries live in the demo app because
 * that is exactly where a consumer's translations would live.
 *
 * They cover only the keys of the component families that have been migrated
 * so far: Upload, UploadV2, DateRangePicker, SingleDatePicker and TimePicker.
 * Anything not listed here falls back to Blend's English default, which is the
 * three-tier resolver working as intended — a partial dictionary is a
 * supported state, not a broken one.
 */

import { BLEND_MESSAGES } from '../../../../packages/blend/lib/i18n/catalog'
import type { BlendMessageOverrides } from '../../../../packages/blend/lib/i18n/catalog'
import type { BlendTranslate } from '../../../../packages/blend/lib/i18n/types'
import { createTranslator } from '../../../../packages/blend/lib/i18n/createTranslator'

/**
 * Not a real BCP 47 tag — a sentinel for the pseudo-locale option. The
 * provider still receives a real locale so `Intl` has data to format dates and
 * numbers with.
 */
export const PSEUDO_LOCALE = 'pseudo'

export type DemoLocale = 'en-US' | 'fr-FR' | 'ja-JP' | 'de-DE' | 'ar-EG'

export type DemoLocaleOption = {
    value: DemoLocale | typeof PSEUDO_LOCALE
    label: string
    /** Why this option is worth looking at. */
    note: string
}

export const DEMO_LOCALES: DemoLocaleOption[] = [
    {
        value: 'en-US',
        label: 'English (US)',
        note: "Blend's built-in defaults — no dictionary involved",
    },
    {
        value: 'fr-FR',
        label: 'Français',
        note: 'Full dictionary, plus day-first dates and comma decimals',
    },
    {
        value: 'ja-JP',
        label: '日本語',
        note: 'Full dictionary; CJK widths and a single plural category',
    },
    {
        value: 'de-DE',
        label: 'Deutsch',
        note: 'Partial dictionary — untranslated keys fall back to English',
    },
    {
        value: 'ar-EG',
        label: 'العربية',
        note: 'No dictionary; dates, digits and weekday order still localize',
    },
    {
        value: PSEUDO_LOCALE,
        label: 'Pseudo-locale',
        note: 'Brackets every resolved string — plain English means unmigrated',
    },
]

const FRENCH: BlendMessageOverrides = {
    'common.action.cancel': 'Annuler',
    'common.action.apply': 'Appliquer',
    'common.action.clear': 'Effacer',
    'common.empty.no-results': 'Aucun résultat',
    'common.empty.no-items': 'Aucun élément disponible',

    'upload.action.browse-files': 'Parcourir les fichiers',
    'upload.action.replace-file': 'Remplacer le fichier',
    'upload.label.drop-hint': 'Choisissez un fichier ou déposez-le ici',
    'upload.label.drop-here': 'Déposez les fichiers ici',
    'upload.label.invalid-type': 'Type de fichier non valide',
    'upload.status.uploading-named': "Téléversement de '{name}'...",
    'upload.status.uploading': 'Téléversement des fichiers...',
    'upload.status.uploading-description':
        'Veuillez patienter pendant le téléversement',
    'upload.status.added.one': 'Fichier ajouté',
    'upload.status.added.other': 'Fichiers ajoutés',
    'upload.status.uploaded-single': 'Fichier téléversé avec succès',
    'upload.status.uploaded-multiple':
        'Nous avons téléversé les fichiers suivants',
    'upload.error.failed.one': 'Échec du téléversement du fichier',
    'upload.error.failed.other': 'Échec du téléversement de plusieurs fichiers',
    'upload.error.retry': 'Échec du téléversement. Veuillez réessayer.',
    'upload.error.failed-short': 'Échec du téléversement',
    'upload.error.files-failed': '{count} fichiers en échec',
    'upload.error.failed-to-upload.one': '{count} fichier non téléversé',
    'upload.error.failed-to-upload.other': '{count} fichiers non téléversés',
    'upload.error.rejected': 'Fichier refusé',

    'upload-v2.action.browse-files': 'Parcourir les fichiers',
    'upload-v2.action.replace-file': 'Remplacer le fichier',
    'upload-v2.label.drop-hint': 'Choisissez un fichier ou déposez-le ici',
    'upload-v2.label.files-added': 'Fichiers ajoutés',
    'upload-v2.label.files-uploaded': 'Fichiers téléversés',
    'upload-v2.label.selected-file': 'Fichier sélectionné : {name}',
    'upload-v2.label.upload-succeeded':
        'Nous avons téléversé les fichiers suivants',
    'upload-v2.label.partial-result': '{succeeded} réussis, {failed} échoués',
    'upload-v2.status.uploading': 'Veuillez patienter pendant le téléversement',
    'upload-v2.status.failed': 'Échec',
    'upload-v2.a11y.file-input': 'Téléversement de fichier',
    'upload.label.files-uploaded': 'Fichiers téléversés',
    'upload.label.partial-result': '{succeeded} réussis, {failed} échoués',
    'upload.status.failed': 'Échec',
    'upload.a11y.file-input': 'Téléversement de fichier',
    'upload.a11y.upload-area': 'Zone de dépôt de fichiers',
    'upload.a11y.remove-file': 'Supprimer {name}',
    'upload.a11y.uploading-progress':
        'Téléversement de {name}, {progress}% terminé',
    'upload-v2.error.oversized': 'Fichier trop volumineux',
    'upload-v2.error.oversized-max':
        'Fichier trop volumineux. Taille maximale : {maxSize}',
    'upload-v2.error.max-files': 'Limite de fichiers dépassée',
    'upload-v2.error.max-files-limit':
        'Limite dépassée. {maxFiles} fichiers maximum',
    'upload-v2.error.invalid-type': 'Type de fichier non valide',
    'upload-v2.error.invalid-file': 'Fichier non valide',
    'upload-v2.a11y.remove-file': 'Supprimer {name}',
    'upload-v2.a11y.show-more-files.one': 'Afficher {count} fichier de plus',
    'upload-v2.a11y.show-more-files.other': 'Afficher {count} fichiers de plus',

    'date-range-picker.preset.today': "Aujourd'hui",
    'date-range-picker.preset.yesterday': 'Hier',
    'date-range-picker.preset.tomorrow': 'Demain',
    'date-range-picker.preset.last-30-minutes': 'Dernières 30 minutes',
    'date-range-picker.preset.last-1-hour': 'Dernière heure',
    'date-range-picker.preset.last-6-hours': 'Dernières 6 heures',
    'date-range-picker.preset.last-24-hours': 'Dernières 24 heures',
    'date-range-picker.preset.last-7-days': '7 derniers jours',
    'date-range-picker.preset.last-30-days': '30 derniers jours',
    'date-range-picker.preset.this-month': 'Ce mois-ci',
    'date-range-picker.preset.last-month': 'Le mois dernier',
    'date-range-picker.preset.last-3-months': '3 derniers mois',
    'date-range-picker.preset.last-12-months': '12 derniers mois',
    'date-range-picker.preset.next-7-days': '7 prochains jours',
    'date-range-picker.preset.next-30-days': '30 prochains jours',
    'date-range-picker.preset.next-3-months': '3 prochains mois',
    'date-range-picker.preset.next-12-months': '12 prochains mois',
    'date-range-picker.preset.custom': 'Personnalisé',
    'date-range-picker.placeholder.select-range': 'Sélectionner une période',
    'date-range-picker.action.apply-date': 'Appliquer la date',
    'date-range-picker.placeholder.select-date': 'Sélectionner une date',
    'date-range-picker.placeholder.select-dates': 'Sélectionner des dates',
    'date-range-picker.placeholder.select-date-range':
        'Sélectionner une période',
    'date-range-picker.placeholder.select-month-range':
        'Sélectionner une période mensuelle',
    'date-range-picker.placeholder.select-month': 'Sélectionner un mois',
    'date-range-picker.placeholder.select-year': 'Sélectionner une année',
    'date-range-picker.label.date': 'Date',
    'date-range-picker.label.month': 'Mois',
    'date-range-picker.label.year': 'Année',
    'date-range-picker.label.time': 'Heure',
    'date-range-picker.label.start': 'Début',
    'date-range-picker.label.end': 'Fin',
    'date-range-picker.label.start-date': 'Date de début',
    'date-range-picker.label.end-date': 'Date de fin',
    'date-range-picker.a11y.state-selected': 'sélectionné',
    'date-range-picker.a11y.state-not-selected': 'non sélectionné',
    'date-range-picker.a11y.state-today': "aujourd'hui",
    'date-range-picker.a11y.state-disabled': 'désactivé',
    'date-range-picker.a11y.start-time': 'Heure de début',
    'date-range-picker.a11y.end-time': 'Heure de fin',
    'date-range-picker.a11y.previous-year': 'Année précédente',
    'date-range-picker.a11y.next-year': 'Année suivante',
    'date-range-picker.a11y.select-month': 'Sélectionner un mois',
    'date-range-picker.a11y.select-year': 'Sélectionner une année',
    'date-range-picker.a11y.choose-date': 'Choisir une date',
    'date-range-picker.a11y.choose-month': 'Choisir un mois',
    'date-range-picker.a11y.choose-year': 'Choisir une année',
    'date-range-picker.a11y.clear-selection': 'Effacer la sélection',
    'date-range-picker.a11y.trigger': 'Sélecteur de date, {value}',

    'time-picker.label.hours': 'Heures',
    'time-picker.label.minutes': 'Minutes',
    'time-picker.label.seconds': 'Secondes',
    'time-picker.label.period': 'AM/PM',
    'time-picker.label.am': 'AM',
    'time-picker.label.pm': 'PM',
    'time-picker.label.time-with-period': '{time} {period}',
    'time-picker.a11y.choose-time': "Choisir l'heure",
    'time-picker.a11y.trigger': "Sélecteur d'heure, {value}",
    'select.action.select-all': 'Tout sélectionner',
    'select.action.clear-all': 'Tout effacer',
    'select.label.custom-value': 'Préciser',
    'select.label.custom-value-option': '{label} : « {value} »',
    'select.label.select-options': 'Sélectionner des options',
    'select.label.select-options-v1': 'Sélectionner des options',
    'select.placeholder.search': 'Rechercher des options...',
    'select.placeholder.search-short': 'Rechercher',
    'select.status.searching': 'Recherche…',
    'select.a11y.search': 'Rechercher des options',
    'select.a11y.searching': 'Recherche en cours',
    'select.a11y.results-updated': 'Résultats de recherche mis à jour',
    'select.a11y.clear-selection': 'Effacer la sélection',
    'select.a11y.clear-selection-for': 'Effacer la sélection pour {label}',
    'data-table.action.retry': 'Réessayer',
    'data-table.action.export': 'Exporter',
    'data-table.action.export-csv': 'Exporter en CSV',
    'data-table.action.download': 'Télécharger',
    'data-table.action.settings': 'Paramètres',
    'data-table.action.clear-all': 'Tout effacer',
    'data-table.action.deselect-all': 'Tout désélectionner',
    'data-table.action.see-actions': 'Voir les actions',
    'data-table.action.save': 'Enregistrer',
    'data-table.action.edit': 'Modifier',
    'data-table.action.default': 'Action',
    'data-table.action.sort-ascending': 'Tri croissant',
    'data-table.action.sort-descending': 'Tri décroissant',
    'data-table.action.filter': 'Filtrer',
    'data-table.action.clear-filter': 'Effacer le filtre',
    'data-table.action.operations': 'Opérations',
    'data-table.action.rename': 'Renommer',
    'data-table.action.insert-left': 'Insérer à gauche',
    'data-table.action.insert-right': 'Insérer à droite',
    'data-table.action.delete': 'Supprimer',
    'data-table.action.format': 'Format',
    'data-table.action.add-columns': 'Ajouter des colonnes',
    'data-table.label.actions': 'Actions',
    'data-table.label.advanced-filters': 'Filtres avancés',
    'data-table.label.advanced-filters-count': 'Filtres avancés ({count})',
    'data-table.label.rows': 'Lignes',
    'data-table.label.rows-per-page': 'Lignes par page',
    'data-table.label.range': '{start}–{end} sur {total}',
    'data-table.label.range-empty': '0 sur {total}',
    'data-table.label.selected-count': '{count} sélectionné(s)',
    'data-table.label.go-to-page': 'Aller à la page',
    'data-table.label.page': 'Page {page}',
    'data-table.label.jump-to-page': 'Aller à la page',
    'data-table.label.insights': 'Détails',
    'data-table.label.select-column-value': 'Sélectionner : {column}',
    'data-table.label.available-columns': 'Colonnes disponibles',
    'data-table.label.select-columns': 'Sélectionner des colonnes',
    'data-table.label.delta': 'Écart',
    'data-table.label.filter-by-range': 'Filtrer par plage',
    'data-table.label.show-total': 'Afficher le total',
    'data-table.label.pivot-title': 'Créer un tableau croisé',
    'data-table.label.pivot-rows': 'Lignes',
    'data-table.label.pivot-columns': 'Colonnes',
    'data-table.label.pivot-values': 'Valeurs',
    'data-table.label.am': 'AM',
    'data-table.label.pm': 'PM',
    'data-table.placeholder.search': 'Rechercher',
    'data-table.placeholder.search-table': 'Rechercher...',
    'data-table.placeholder.search-pages': 'Rechercher des pages...',
    'data-table.placeholder.search-options': 'Rechercher des options...',
    'data-table.placeholder.search-columns': 'Rechercher des colonnes...',
    'data-table.action.select-all-columns': 'Sélectionner toutes les colonnes',
    'data-table.placeholder.select': 'Sélectionner...',
    'data-table.placeholder.select-columns':
        'Sélectionner les colonnes à afficher',
    'data-table.placeholder.manage-columns': 'Gérer les colonnes',
    'data-table.placeholder.choose-columns': 'Choisir les colonnes à afficher',
    'data-table.placeholder.column-name': 'Nom de colonne',
    'data-table.placeholder.operation': 'opération',
    'data-table.placeholder.add': 'Ajouter',
    'data-table.status.loading': 'Chargement des données...',
    'data-table.empty.no-data': 'Aucune donnée',
    'data-table.empty.no-data-available': 'Aucune donnée disponible',
    'data-table.empty.no-filter-component':
        'Aucun filtre configuré pour ce type de colonne',
    'data-table.error.load-failed': 'Impossible de charger les données',
    'data-table.error.export-failed': "Échec de l'export",
    'data-table.error.export-no-data': 'Aucune donnée à exporter',
    'data-table.error.export-no-selection':
        'Sélectionnez au moins une ligne à exporter',
    'data-table.error.slider-config-missing':
        'Configuration du curseur manquante',
    'data-table.a11y.table': 'Tableau de données',
    'data-table.a11y.loading': 'Chargement du tableau',
    'data-table.a11y.load-failed': 'Échec du chargement du tableau',
    'data-table.a11y.showing-rows': '{visible} lignes affichées sur {total}',
    'data-table.a11y.pagination': 'Pagination',
    'data-table.a11y.rows-per-page': 'Choisir le nombre de lignes par page',
    'data-table.a11y.previous-page': 'Page précédente',
    'data-table.a11y.previous-page-current':
        'Page précédente (page actuelle : {page})',
    'data-table.a11y.next-page': 'Page suivante',
    'data-table.a11y.next-page-current':
        'Page suivante (page actuelle : {page} sur {total})',
    'data-table.a11y.go-to-page': 'Aller à la page {page}',
    'data-table.a11y.go-to-page-current':
        'Aller à la page {page} (page actuelle)',
    'data-table.a11y.jump-to-page-current':
        'Aller à la page (page {page} sur {total} affichée)',
    'data-table.a11y.export-format': 'Exporter en {format}',
    'data-table.a11y.export-table': 'Exporter le tableau',
    'data-table.a11y.table-settings': 'Paramètres du tableau',
    'data-table.a11y.close-search': 'Fermer la recherche',
    'data-table.a11y.open-search': 'Ouvrir la recherche',
    'data-table.a11y.advanced-filters': 'Filtres avancés',
    'data-table.a11y.advanced-filters-active':
        'Filtres avancés ({count} actifs)',
    'data-table.a11y.clear-all-filters': 'Effacer tous les filtres',
    'data-table.a11y.manage-columns': 'Gérer les colonnes',
    'data-table.a11y.rows-selected.one': '{count} ligne sélectionnée',
    'data-table.a11y.rows-selected.other': '{count} lignes sélectionnées',
    'data-table.a11y.see-actions.one':
        'Voir les actions pour {count} ligne sélectionnée',
    'data-table.a11y.see-actions.other':
        'Voir les actions pour {count} lignes sélectionnées',
    'data-table.a11y.export-selected.one':
        'Exporter {count} ligne sélectionnée',
    'data-table.a11y.export-selected.other':
        'Exporter {count} lignes sélectionnées',
    'data-table.a11y.deselect-all': 'Désélectionner toutes les lignes',
    'data-table.a11y.save-row': 'Enregistrer la ligne',
    'data-table.a11y.cancel-edit': 'Annuler la modification de la ligne',
    'data-table.a11y.edit-row': 'Modifier la ligne',
    'data-table.a11y.more-actions': "Plus d'actions",
    'data-table.a11y.row': 'Ligne {index}',
    'data-table.a11y.row-selected': 'Ligne {index}, sélectionnée',
    'data-table.a11y.row-expanded': 'Ligne {index}, développée',
    'data-table.a11y.row-selected-expanded':
        'Ligne {index}, sélectionnée, développée',
    'data-table.a11y.expand-row': 'Développer la ligne',
    'data-table.a11y.collapse-row': 'Réduire la ligne',
    'data-table.a11y.select-row': 'Sélectionner la ligne {index}',
    'data-table.a11y.select-row-in-table':
        'Sélectionner la ligne {index} dans {table}',
    'data-table.a11y.select-all-rows': 'Sélectionner toutes les lignes',
    'data-table.a11y.view-details': 'Voir plus de détails',
    'data-table.a11y.filter-column': 'Filtrer {column}',
    'data-table.a11y.more-columns': 'Voir plus de colonnes',
    'data-table.a11y.column-manager': 'Gestion des colonnes',
    'data-table.a11y.remove-field': 'Retirer {field}',
    'data-table.a11y.pivot-add-rows': 'Ajouter un champ de ligne',
    'data-table.a11y.pivot-add-columns': 'Ajouter un champ de colonne',
    'data-table.a11y.pivot-add-values': 'Ajouter un champ de valeur',
    'data-table.a11y.pivot-illustration': 'Illustration de tableau croisé',
    'navigation.placeholder.select-merchant': 'Sélectionner un marchand',
    'navigation.a11y.select-merchant': 'Sélectionner un marchand : {name}',
    'navigation.a11y.select-tenant': 'Sélectionner un locataire : {name}',
    'navigation.a11y.select-tenant-unnamed': 'Sélectionner un locataire',
    'navigation.a11y.main-content': 'Contenu principal',
    'navigation.a11y.navigation-menu': 'Menu de navigation',
    'sidebar.action.collapse': 'Réduire la barre latérale',
    'sidebar.action.expand': 'Développer la barre latérale',
    'sidebar.label.collapse-shortcut': 'Réduire la barre latérale ({shortcut})',
    'sidebar.label.expand-shortcut':
        'Développer la barre latérale ({shortcut})',
    'sidebar.a11y.collapse-toggle':
        'Réduire la barre latérale. Appuyez sur {shortcut} pour basculer.',
    'sidebar.a11y.expand-toggle':
        'Développer la barre latérale. Appuyez sur {shortcut} pour basculer.',
    'sidebar.status.expanded': 'Barre latérale développée',
    'sidebar.status.collapsed': 'Barre latérale réduite',
    'sidebar.label.more': 'Plus',
    'sidebar.a11y.more-options': "Plus d'options",
    'sidebar.a11y.primary-action': 'Action principale',
    'sidebar.a11y.app-navigation': "Navigation de l'application",
    'sidebar.a11y.more-navigation-options': 'Plus d’options de navigation',
    'sidebar.a11y.more-tenants': 'Plus de locataires',
    'sidebar.placeholder.search-tenants': 'Rechercher des locataires...',
    'topbar.a11y.go-back': 'Retour',
    'menu.placeholder.search': 'Rechercher',
    'menu.placeholder.submenu-search': 'Rechercher...',
    'menu.a11y.search': 'Rechercher dans le menu',
    'menu.a11y.search-with-placeholder':
        'Rechercher dans le menu : {placeholder}',
    'menu.a11y.search-submenu': 'Rechercher dans le sous-menu',
    'directory.a11y.navigation': 'Navigation du répertoire',
    'directory.a11y.submenu': 'Sous-menu {label}',
    'directory.a11y.section': 'Navigation {label}',
    'breadcrumb.a11y.navigation': "Fil d'Ariane",
    'breadcrumb.a11y.current-page': 'Page actuelle : {label}',
    'breadcrumb.a11y.navigate-to': 'Aller à {label}',
    'breadcrumb.a11y.current-page-unnamed':
        "Page actuelle : élément du fil d'Ariane",
    'breadcrumb.a11y.navigate-to-unnamed': "Aller à l'élément du fil d'Ariane",
    'breadcrumb.label.item-fallback': "Fil d'Ariane",
    'breadcrumb.a11y.show-more.one':
        "Afficher {count} élément supplémentaire du fil d'Ariane",
    'breadcrumb.a11y.show-more.other':
        "Afficher {count} éléments supplémentaires du fil d'Ariane",
    'tabs.a11y.close': 'Fermer {label}',
    'tabs.a11y.close-tab': "Fermer l'onglet",
    'tabs.a11y.navigate-to-tab': 'Aller à un onglet',
    'tabs.label.add-new-tab': 'Ajouter un onglet',
    'tabs.placeholder.navigate': 'Naviguer',
    'tabs.placeholder.search-tabs': 'Rechercher et aller à un onglet',
    'input.placeholder.enter': 'Saisir',
    'input.a11y.show-password': 'Afficher le mot de passe',
    'input.a11y.hide-password': 'Masquer le mot de passe',
    'input.a11y.show-password-verbose':
        'Afficher le mot de passe. Le mot de passe est actuellement masqué.',
    'input.a11y.hide-password-verbose':
        'Masquer le mot de passe. Le mot de passe est actuellement affiché en clair.',
    'input.a11y.password-group': 'Champ {label} avec bouton de visibilité',
    'input.a11y.password-group-unnamed':
        'Champ de mot de passe avec bouton de visibilité',
    'input.a11y.remove-value': 'Supprimer {value}',
    'input.a11y.clear-search': 'Effacer la recherche',
    'input.a11y.increase': 'Augmenter {label}',
    'input.a11y.increase-value': 'Augmenter la valeur',
    'input.a11y.decrease': 'Diminuer {label}',
    'input.a11y.decrease-value': 'Diminuer la valeur',
    'input.error.range-between':
        'La valeur doit être comprise entre {min} et {max}',
    'input.error.range-min': 'La valeur doit être au moins {min}',
    'input.error.range-max': 'La valeur doit être au plus {max}',
    'input.error.invalid-value': 'Valeur non valide',
    'input.error.unit-too-long':
        "L'unité doit comporter {max} caractères au maximum.",
    'input.a11y.select-option': 'Sélectionner une option',
    'input.label.number-input': 'Champ numérique',
    'input.a11y.text-input-group': 'Groupe de champs de texte',
}

const JAPANESE: BlendMessageOverrides = {
    'common.action.cancel': 'キャンセル',
    'common.action.apply': '適用',
    'common.action.clear': 'クリア',
    'common.empty.no-results': '結果がありません',
    'common.empty.no-items': '項目がありません',

    'upload.action.browse-files': 'ファイルを選択',
    'upload.action.replace-file': 'ファイルを置き換える',
    'upload.label.drop-hint':
        'ファイルを選択するか、ここにドラッグ＆ドロップしてください',
    'upload.label.drop-here': 'ここにドロップ',
    'upload.label.invalid-type': '無効なファイル形式',
    'upload.status.uploading-named': "'{name}' をアップロード中...",
    'upload.status.uploading': 'ファイルをアップロード中...',
    'upload.status.uploading-description':
        'アップロードが完了するまでお待ちください',
    // Japanese has a single plural category, so both variants are identical —
    // which is the point of category-suffixed keys rather than an English
    // `n !== 1` ternary.
    'upload.status.added.one': 'ファイルを追加しました',
    'upload.status.added.other': 'ファイルを追加しました',
    'upload.status.uploaded-single': 'ファイルをアップロードしました',
    'upload.status.uploaded-multiple': '次のファイルをアップロードしました',
    'upload.error.failed.one': 'ファイルのアップロードに失敗しました',
    'upload.error.failed.other': '複数のファイルのアップロードに失敗しました',
    'upload.error.retry':
        'アップロードに失敗しました。もう一度お試しください。',
    'upload.error.failed-short': 'アップロード失敗',
    'upload.error.files-failed': '{count} 件のファイルが失敗しました',
    'upload.error.failed-to-upload.one':
        '{count} 件のファイルをアップロードできませんでした',
    'upload.error.failed-to-upload.other':
        '{count} 件のファイルをアップロードできませんでした',
    'upload.error.rejected': 'ファイルが拒否されました',

    'upload-v2.action.browse-files': 'ファイルを選択',
    'upload-v2.action.replace-file': 'ファイルを置き換える',
    'upload-v2.label.drop-hint':
        'ファイルを選択するか、ここにドラッグ＆ドロップしてください',
    'upload-v2.label.files-added': 'ファイルを追加しました',
    'upload-v2.label.files-uploaded': 'ファイルをアップロードしました',
    'upload-v2.label.selected-file': '選択したファイル：{name}',
    'upload-v2.label.upload-succeeded': '次のファイルをアップロードしました',
    'upload-v2.label.partial-result': '成功 {succeeded} 件、失敗 {failed} 件',
    'upload-v2.status.uploading': 'アップロードが完了するまでお待ちください',
    'upload-v2.status.failed': '失敗',
    'upload-v2.a11y.file-input': 'ファイルのアップロード',
    'upload.label.files-uploaded': 'ファイルをアップロードしました',
    'upload.label.partial-result': '成功 {succeeded} 件、失敗 {failed} 件',
    'upload.status.failed': '失敗',
    'upload.a11y.file-input': 'ファイルのアップロード',
    'upload.a11y.upload-area': 'ファイルアップロード領域',
    'upload.a11y.remove-file': '{name} を削除',
    'upload.a11y.uploading-progress':
        '{name} をアップロード中、{progress}% 完了',
    'upload-v2.error.oversized': 'ファイルサイズが大きすぎます',
    'upload-v2.error.oversized-max':
        'ファイルサイズが大きすぎます。最大 {maxSize} です',
    'upload-v2.error.max-files': 'ファイル数の上限を超えました',
    'upload-v2.error.max-files-limit':
        'ファイル数の上限を超えました。最大 {maxFiles} 件です',
    'upload-v2.error.invalid-type': '無効なファイル形式',
    'upload-v2.error.invalid-file': '無効なファイル',
    'upload-v2.a11y.remove-file': '{name} を削除',
    'upload-v2.a11y.show-more-files.one': '他 {count} 件を表示',
    'upload-v2.a11y.show-more-files.other': '他 {count} 件を表示',

    'date-range-picker.preset.today': '今日',
    'date-range-picker.preset.yesterday': '昨日',
    'date-range-picker.preset.tomorrow': '明日',
    'date-range-picker.preset.last-30-minutes': '過去 30 分',
    'date-range-picker.preset.last-1-hour': '過去 1 時間',
    'date-range-picker.preset.last-6-hours': '過去 6 時間',
    'date-range-picker.preset.last-24-hours': '過去 24 時間',
    'date-range-picker.preset.last-7-days': '過去 7 日間',
    'date-range-picker.preset.last-30-days': '過去 30 日間',
    'date-range-picker.preset.this-month': '今月',
    'date-range-picker.preset.last-month': '先月',
    'date-range-picker.preset.last-3-months': '過去 3 か月',
    'date-range-picker.preset.last-12-months': '過去 12 か月',
    'date-range-picker.preset.next-7-days': '今後 7 日間',
    'date-range-picker.preset.next-30-days': '今後 30 日間',
    'date-range-picker.preset.next-3-months': '今後 3 か月',
    'date-range-picker.preset.next-12-months': '今後 12 か月',
    'date-range-picker.preset.custom': 'カスタム',
    'date-range-picker.placeholder.select-range': '期間を選択',
    'date-range-picker.action.apply-date': '日付を適用',
    'date-range-picker.placeholder.select-date': '日付を選択',
    'date-range-picker.placeholder.select-dates': '日付を選択',
    'date-range-picker.placeholder.select-date-range': '期間を選択',
    'date-range-picker.a11y.state-selected': '選択中',
    'date-range-picker.a11y.state-not-selected': '未選択',
    'date-range-picker.a11y.state-today': '今日',
    'date-range-picker.a11y.state-disabled': '無効',
    'date-range-picker.placeholder.select-month-range': '期間（月）を選択',
    'date-range-picker.placeholder.select-month': '月を選択',
    'date-range-picker.placeholder.select-year': '年を選択',
    'date-range-picker.label.date': '日付',
    'date-range-picker.label.month': '月',
    'date-range-picker.label.year': '年',
    'date-range-picker.label.time': '時刻',
    'date-range-picker.label.start': '開始',
    'date-range-picker.label.end': '終了',
    'date-range-picker.label.start-date': '開始日',
    'date-range-picker.label.end-date': '終了日',
    'date-range-picker.a11y.start-time': '開始時刻',
    'date-range-picker.a11y.end-time': '終了時刻',
    'date-range-picker.a11y.previous-year': '前年',
    'date-range-picker.a11y.next-year': '翌年',
    'date-range-picker.a11y.select-month': '月を選択',
    'date-range-picker.a11y.select-year': '年を選択',
    'date-range-picker.a11y.choose-date': '日付を選択',
    'date-range-picker.a11y.choose-month': '月を選択',
    'date-range-picker.a11y.choose-year': '年を選択',
    'date-range-picker.a11y.clear-selection': '選択をクリア',
    'date-range-picker.a11y.trigger': '日付ピッカー、{value}',

    'time-picker.label.hours': '時',
    'time-picker.label.minutes': '分',
    'time-picker.label.seconds': '秒',
    'time-picker.label.period': '午前/午後',
    'time-picker.label.am': '午前',
    'time-picker.label.pm': '午後',
    'time-picker.label.time-with-period': '{period}{time}',
    'time-picker.a11y.choose-time': '時刻を選択',
    'time-picker.a11y.trigger': '時刻選択、{value}',
    'select.action.select-all': 'すべて選択',
    'select.action.clear-all': 'すべてクリア',
    'select.label.custom-value': '指定',
    'select.label.custom-value-option': '{label}：「{value}」',
    'select.label.select-options': 'オプションを選択',
    'select.label.select-options-v1': 'オプションを選択',
    'select.placeholder.search': 'オプションを検索...',
    'select.placeholder.search-short': '検索',
    'select.status.searching': '検索中…',
    'select.a11y.search': 'オプションを検索',
    'select.a11y.searching': '検索中',
    'select.a11y.results-updated': '検索結果を更新しました',
    'select.a11y.clear-selection': '選択をクリア',
    'select.a11y.clear-selection-for': '{label}の選択をクリア',
    'data-table.action.retry': '再試行',
    'data-table.action.export': 'エクスポート',
    'data-table.action.export-csv': 'CSVでエクスポート',
    'data-table.action.download': 'ダウンロード',
    'data-table.action.settings': '設定',
    'data-table.action.clear-all': 'すべてクリア',
    'data-table.action.deselect-all': 'すべて選択解除',
    'data-table.action.see-actions': 'アクションを表示',
    'data-table.action.save': '保存',
    'data-table.action.edit': '編集',
    'data-table.action.default': 'アクション',
    'data-table.action.sort-ascending': '昇順で並べ替え',
    'data-table.action.sort-descending': '降順で並べ替え',
    'data-table.action.filter': 'フィルター',
    'data-table.action.clear-filter': 'フィルターをクリア',
    'data-table.action.operations': '操作',
    'data-table.action.rename': '名前を変更',
    'data-table.action.insert-left': '左に挿入',
    'data-table.action.insert-right': '右に挿入',
    'data-table.action.delete': '削除',
    'data-table.action.format': '書式',
    'data-table.action.add-columns': '列を追加',
    'data-table.label.actions': 'アクション',
    'data-table.label.advanced-filters': '詳細フィルター',
    'data-table.label.advanced-filters-count': '詳細フィルター（{count}）',
    'data-table.label.rows': '行',
    'data-table.label.rows-per-page': '1ページの行数',
    'data-table.label.range': '{total}件中 {start}～{end}件',
    'data-table.label.range-empty': '{total}件中 0件',
    'data-table.label.selected-count': '{count}件選択中',
    'data-table.label.go-to-page': 'ページへ移動',
    'data-table.label.page': '{page}ページ',
    'data-table.label.jump-to-page': 'ページへ移動',
    'data-table.label.insights': '詳細',
    'data-table.label.select-column-value': '{column}を選択',
    'data-table.label.available-columns': '利用可能な列',
    'data-table.label.select-columns': '列を選択',
    'data-table.label.delta': '差分',
    'data-table.label.filter-by-range': '範囲で絞り込み',
    'data-table.label.show-total': '合計を表示',
    'data-table.label.pivot-title': 'ピボットテーブルを作成',
    'data-table.label.pivot-rows': '行',
    'data-table.label.pivot-columns': '列',
    'data-table.label.pivot-values': '値',
    'data-table.label.am': '午前',
    'data-table.label.pm': '午後',
    'data-table.placeholder.search': '検索',
    'data-table.placeholder.search-table': '検索...',
    'data-table.placeholder.search-pages': 'ページを検索...',
    'data-table.placeholder.search-options': 'オプションを検索...',
    'data-table.placeholder.search-columns': '列を検索...',
    'data-table.action.select-all-columns': 'すべての列を選択',
    'data-table.placeholder.select': '選択...',
    'data-table.placeholder.select-columns': '表示する列を選択',
    'data-table.placeholder.manage-columns': '列を管理',
    'data-table.placeholder.choose-columns': '表示する列を選択',
    'data-table.placeholder.column-name': '列名',
    'data-table.placeholder.operation': '集計方法',
    'data-table.placeholder.add': '追加',
    'data-table.status.loading': 'データを読み込み中...',
    'data-table.empty.no-data': 'データなし',
    'data-table.empty.no-data-available': 'データがありません',
    'data-table.empty.no-filter-component':
        'この列タイプにはフィルターが設定されていません',
    'data-table.error.load-failed': 'データを読み込めませんでした',
    'data-table.error.export-failed': 'エクスポートに失敗しました',
    'data-table.error.export-no-data': 'エクスポートするデータがありません',
    'data-table.error.export-no-selection':
        'エクスポートする行を1行以上選択してください',
    'data-table.error.slider-config-missing': 'スライダーの設定がありません',
    'data-table.a11y.table': 'データテーブル',
    'data-table.a11y.loading': 'テーブルを読み込み中',
    'data-table.a11y.load-failed': 'テーブルの読み込みに失敗しました',
    'data-table.a11y.showing-rows': '{total}行中 {visible}行を表示',
    'data-table.a11y.pagination': 'ページ送り',
    'data-table.a11y.rows-per-page': '1ページの行数を選択',
    'data-table.a11y.previous-page': '前のページ',
    'data-table.a11y.previous-page-current': '前のページ（現在 {page}ページ）',
    'data-table.a11y.next-page': '次のページ',
    'data-table.a11y.next-page-current':
        '次のページ（現在 {total}ページ中 {page}ページ）',
    'data-table.a11y.go-to-page': '{page}ページへ移動',
    'data-table.a11y.go-to-page-current': '{page}ページへ移動（現在のページ）',
    'data-table.a11y.jump-to-page-current':
        'ページへ移動（現在 {total}ページ中 {page}ページを表示）',
    'data-table.a11y.export-format': '{format}でエクスポート',
    'data-table.a11y.export-table': 'テーブルをエクスポート',
    'data-table.a11y.table-settings': 'テーブル設定',
    'data-table.a11y.close-search': '検索を閉じる',
    'data-table.a11y.open-search': '検索を開く',
    'data-table.a11y.advanced-filters': '詳細フィルター',
    'data-table.a11y.advanced-filters-active':
        '詳細フィルター（{count}件適用中）',
    'data-table.a11y.clear-all-filters': 'すべてのフィルターをクリア',
    'data-table.a11y.manage-columns': '列を管理',
    'data-table.a11y.rows-selected.other': '{count}行を選択中',
    'data-table.a11y.see-actions.other': '選択中の{count}行のアクションを表示',
    'data-table.a11y.export-selected.other': '選択中の{count}行をエクスポート',
    'data-table.a11y.deselect-all': 'すべての行の選択を解除',
    'data-table.a11y.save-row': '行を保存',
    'data-table.a11y.cancel-edit': '行の編集をキャンセル',
    'data-table.a11y.edit-row': '行を編集',
    'data-table.a11y.more-actions': 'その他のアクション',
    'data-table.a11y.row': '{index}行目',
    'data-table.a11y.row-selected': '{index}行目、選択中',
    'data-table.a11y.row-expanded': '{index}行目、展開',
    'data-table.a11y.row-selected-expanded': '{index}行目、選択中、展開',
    'data-table.a11y.expand-row': '行を展開',
    'data-table.a11y.collapse-row': '行を折りたたむ',
    'data-table.a11y.select-row': '{index}行目を選択',
    'data-table.a11y.select-row-in-table': '{table}の{index}行目を選択',
    'data-table.a11y.select-all-rows': 'すべての行を選択',
    'data-table.a11y.view-details': '詳細を表示',
    'data-table.a11y.filter-column': '{column}で絞り込み',
    'data-table.a11y.more-columns': 'その他の列を表示',
    'data-table.a11y.column-manager': '列の管理',
    'data-table.a11y.remove-field': '{field}を削除',
    'data-table.a11y.pivot-add-rows': '行フィールドを追加',
    'data-table.a11y.pivot-add-columns': '列フィールドを追加',
    'data-table.a11y.pivot-add-values': '値フィールドを追加',
    'data-table.a11y.pivot-illustration': 'ピボットテーブルのイラスト',
    'navigation.placeholder.select-merchant': '加盟店を選択',
    'navigation.a11y.select-merchant': '加盟店を選択：{name}',
    'navigation.a11y.select-tenant': 'テナントを選択：{name}',
    'navigation.a11y.select-tenant-unnamed': 'テナントを選択',
    'navigation.a11y.main-content': 'メインコンテンツ',
    'navigation.a11y.navigation-menu': 'ナビゲーションメニュー',
    'sidebar.action.collapse': 'サイドバーを折りたたむ',
    'sidebar.action.expand': 'サイドバーを展開',
    'sidebar.label.collapse-shortcut': 'サイドバーを折りたたむ（{shortcut}）',
    'sidebar.label.expand-shortcut': 'サイドバーを展開（{shortcut}）',
    'sidebar.a11y.collapse-toggle':
        'サイドバーを折りたたむ。{shortcut} で切り替えます。',
    'sidebar.a11y.expand-toggle':
        'サイドバーを展開。{shortcut} で切り替えます。',
    'sidebar.status.expanded': 'サイドバーを展開しました',
    'sidebar.status.collapsed': 'サイドバーを折りたたみました',
    'sidebar.label.more': 'その他',
    'sidebar.a11y.more-options': 'その他のオプション',
    'sidebar.a11y.primary-action': 'メインアクション',
    'sidebar.a11y.app-navigation': 'アプリのナビゲーション',
    'sidebar.a11y.more-navigation-options': 'その他のナビゲーション',
    'sidebar.a11y.more-tenants': 'その他のテナント',
    'sidebar.placeholder.search-tenants': 'テナントを検索...',
    'topbar.a11y.go-back': '戻る',
    'menu.placeholder.search': '検索',
    'menu.placeholder.submenu-search': '検索...',
    'menu.a11y.search': 'メニュー項目を検索',
    'menu.a11y.search-with-placeholder': 'メニュー項目を検索：{placeholder}',
    'menu.a11y.search-submenu': 'サブメニューを検索',
    'directory.a11y.navigation': 'ディレクトリナビゲーション',
    'directory.a11y.submenu': '{label}のサブメニュー',
    'directory.a11y.section': '{label}のナビゲーション',
    'breadcrumb.a11y.navigation': 'パンくずリスト',
    'breadcrumb.a11y.current-page': '現在のページ：{label}',
    'breadcrumb.a11y.navigate-to': '{label}へ移動',
    'breadcrumb.a11y.current-page-unnamed': '現在のページ：パンくず項目',
    'breadcrumb.a11y.navigate-to-unnamed': 'パンくず項目へ移動',
    'breadcrumb.label.item-fallback': 'パンくず',
    'breadcrumb.a11y.show-more.other': 'パンくず項目をさらに{count}件表示',
    'tabs.a11y.close': '{label}を閉じる',
    'tabs.a11y.close-tab': 'タブを閉じる',
    'tabs.a11y.navigate-to-tab': 'タブへ移動',
    'tabs.label.add-new-tab': '新しいタブを追加',
    'tabs.placeholder.navigate': '移動',
    'tabs.placeholder.search-tabs': 'タブを検索して移動',
    'input.placeholder.enter': '入力',
    'input.a11y.show-password': 'パスワードを表示',
    'input.a11y.hide-password': 'パスワードを隠す',
    'input.a11y.show-password-verbose':
        'パスワードを表示。現在パスワードは非表示です。',
    'input.a11y.hide-password-verbose':
        'パスワードを隠す。現在パスワードは平文で表示されています。',
    'input.a11y.password-group': '表示切り替え付きの{label}入力欄',
    'input.a11y.password-group-unnamed': '表示切り替え付きのパスワード入力欄',
    'input.a11y.remove-value': '{value}を削除',
    'input.a11y.clear-search': '検索をクリア',
    'input.a11y.increase': '{label}を増やす',
    'input.a11y.increase-value': '値を増やす',
    'input.a11y.decrease': '{label}を減らす',
    'input.a11y.decrease-value': '値を減らす',
    'input.error.range-between': '値は{min}から{max}の間で入力してください',
    'input.error.range-min': '値は{min}以上で入力してください',
    'input.error.range-max': '値は{max}以下で入力してください',
    'input.error.invalid-value': '無効な値です',
    'input.error.unit-too-long': '単位は{max}文字以内にしてください。',
    'input.a11y.select-option': 'オプションを選択',
    'input.label.number-input': '数値入力',
    'input.a11y.text-input-group': 'テキスト入力グループ',
}

/**
 * Deliberately partial, to show the fallback tier at work: only the two
 * reported strings and the Cancel/Apply pair are translated, so everything
 * else in the same component renders Blend's English default alongside them.
 */
const GERMAN_PARTIAL: BlendMessageOverrides = {
    'upload.action.browse-files': 'Dateien durchsuchen',
    'upload-v2.action.browse-files': 'Dateien durchsuchen',
    'common.action.cancel': 'Abbrechen',
    'date-range-picker.action.apply-date': 'Datum übernehmen',
    // 'September' is the long month name that most easily wraps a calendar
    // header, which is why de-DE is worth checking visually.
    'date-range-picker.preset.this-month': 'Diesen Monat',
}

const ACCENTS: Record<string, string> = {
    a: 'á',
    e: 'é',
    i: 'í',
    o: 'ó',
    u: 'ú',
    A: 'Á',
    E: 'É',
    I: 'Í',
    O: 'Ó',
    U: 'Ú',
}

/**
 * Brackets and accents every string Blend resolves through the catalog.
 *
 * This is the fastest way to find copy that has NOT been migrated: anything
 * still rendering plain, unbracketed English is a hardcoded literal. The
 * accents also widen the text, which surfaces layout that only fits English.
 *
 * `{placeholder}` spans are left intact so Blend's own interpolation pass can
 * still fill them.
 */
const pseudoTranslate: BlendTranslate = (key) => {
    const source = BLEND_MESSAGES[key as keyof typeof BLEND_MESSAGES]
    if (source === undefined) return undefined

    const accented = source.replace(/[^{}]+|\{[A-Za-z0-9_]+\}/g, (segment) =>
        segment.startsWith('{')
            ? segment
            : segment.replace(/[aeiouAEIOU]/g, (c) => ACCENTS[c] ?? c)
    )

    return `⟦${accented}⟧`
}

const DICTIONARIES: Partial<Record<string, BlendMessageOverrides>> = {
    'fr-FR': FRENCH,
    'ja-JP': JAPANESE,
    'de-DE': GERMAN_PARTIAL,
}

/**
 * The `t` to hand `ThemeProvider` for a given demo locale.
 *
 * `undefined` for `en-US` and `ar-EG`: with no `t` at all, every component
 * renders its built-in English default while dates, numbers and weekday order
 * still follow `locale`. That split is worth seeing directly — it is what
 * "translation-agnostic, but locale-aware formatting" means in practice.
 */
export const getTranslatorForLocale = (
    locale: DemoLocale | typeof PSEUDO_LOCALE
): BlendTranslate | undefined => {
    if (locale === PSEUDO_LOCALE) return pseudoTranslate

    const dictionary = DICTIONARIES[locale]
    return dictionary ? createTranslator(dictionary) : undefined
}

/**
 * Sample copy the demo pages supply themselves, as a consuming app would.
 *
 * These are deliberately NOT Blend message keys. UploadV2 has no built-in
 * header for its uploading and success states, so a real consumer passes
 * `uploadHeaderText` -- which is tier 1 and therefore beats the provider's
 * `t`. That is the designed behaviour, but it means a demo that hardcodes an
 * English `uploadHeaderText` on every card renders English under every locale
 * and looks unmigrated. Resolving the demo's own copy through its own locale
 * map keeps the page honest about which tier owns each string.
 *
 * Only the cards that genuinely need app-supplied copy use this. Cards whose
 * text merely restated Blend's default now pass no prop at all, so the
 * catalog default shows through and follows the locale.
 */
const DEMO_SAMPLE_COPY = {
    'uploading-named': {
        'en-US': 'Uploading sample_file.csv...',
        'fr-FR': 'Téléversement de sample_file.csv...',
        'ja-JP': 'sample_file.csv をアップロード中...',
        'de-DE': 'sample_file.csv wird hochgeladen...',
        'ar-EG': 'جارٍ رفع sample_file.csv...',
    },
    'field-label': {
        'en-US': 'Upload Files',
        'fr-FR': 'Téléverser des fichiers',
        'ja-JP': 'ファイルをアップロード',
        'de-DE': 'Dateien hochladen',
        'ar-EG': 'رفع الملفات',
    },
    'field-sublabel': {
        'en-US': 'Max 8MB',
        'fr-FR': '8 Mo max',
        'ja-JP': '最大 8MB',
        'de-DE': 'Max. 8 MB',
        'ar-EG': '8 ميغابايت كحد أقصى',
    },
    'field-description': {
        'en-US': '.csv only | Max size 8 MB',
        'fr-FR': '.csv uniquement | Taille max 8 Mo',
        'ja-JP': '.csv のみ | 最大 8MB',
        'de-DE': 'nur .csv | Max. 8 MB',
        'ar-EG': '.csv فقط | الحجم الأقصى 8 ميغابايت',
    },
    'field-description-success': {
        'en-US': 'Test files uploaded successfully',
        'fr-FR': 'Fichiers de test téléversés avec succès',
        'ja-JP': 'テストファイルのアップロードが完了しました',
        'de-DE': 'Testdateien erfolgreich hochgeladen',
        'ar-EG': 'تم رفع ملفات الاختبار بنجاح',
    },
    'upload-succeeded': {
        'en-US': 'File uploaded successfully',
        'fr-FR': 'Fichier téléversé avec succès',
        'ja-JP': 'ファイルのアップロードが完了しました',
        'de-DE': 'Datei erfolgreich hochgeladen',
        'ar-EG': 'تم رفع الملف بنجاح',
    },
} as const satisfies Record<string, Record<DemoLocale, string>>

export type DemoCopyKey = keyof typeof DEMO_SAMPLE_COPY

/**
 * Resolve one piece of the demo's own sample copy for the active locale.
 *
 * The pseudo-locale brackets it the same way `pseudoTranslate` brackets a
 * Blend string, so a reader cannot tell from the page which layer owns which
 * string -- which is the point: both are "translated by the app".
 */
export const getDemoCopy = (
    locale: DemoLocale | typeof PSEUDO_LOCALE,
    key: DemoCopyKey
): string => {
    const entry = DEMO_SAMPLE_COPY[key]
    if (locale === PSEUDO_LOCALE) {
        return `⟦${entry['en-US'].replace(/[aeiouAEIOU]/g, (c) => ACCENTS[c] ?? c)}⟧`
    }
    return entry[locale]
}

/** The real BCP 47 tag to pass to `Intl`, resolving the pseudo sentinel. */
export const resolveIntlLocale = (
    locale: DemoLocale | typeof PSEUDO_LOCALE
): string => (locale === PSEUDO_LOCALE ? 'en-US' : locale)
