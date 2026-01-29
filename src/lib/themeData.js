import { themes } from '@/data/themes'

export async function getThemes() {
    // In the future this can fetch from an actual API/DB
    return themes
}
