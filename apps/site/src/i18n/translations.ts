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
    'date-range-picker.a11y.state-selected': 'sélectionné',
    'date-range-picker.a11y.state-not-selected': 'non sélectionné',
    'date-range-picker.a11y.state-today': "aujourd'hui",
    'date-range-picker.a11y.state-disabled': 'désactivé',

    'time-picker.label.hours': 'Heures',
    'time-picker.label.minutes': 'Minutes',
    'time-picker.label.seconds': 'Secondes',
    'time-picker.label.period': 'AM/PM',
    'time-picker.label.am': 'AM',
    'time-picker.label.pm': 'PM',
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

    'time-picker.label.hours': '時',
    'time-picker.label.minutes': '分',
    'time-picker.label.seconds': '秒',
    'time-picker.label.period': '午前/午後',
    'time-picker.label.am': '午前',
    'time-picker.label.pm': '午後',
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

/** The real BCP 47 tag to pass to `Intl`, resolving the pseudo sentinel. */
export const resolveIntlLocale = (
    locale: DemoLocale | typeof PSEUDO_LOCALE
): string => (locale === PSEUDO_LOCALE ? 'en-US' : locale)
