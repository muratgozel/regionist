import * as path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { timezones } from 'locale-util'

const timezoneCountryMapping = timezones
    .reduce<Record<string, string[]>>((memo, obj) => Object.assign({}, memo, {
        [obj.name]: timezones.filter((_obj) => _obj.name === obj.name).map((_obj) => _obj.country)
    }), {})
const fp = path.resolve(import.meta.dirname, '..', 'src', 'timezoneCountryMapping.json')
await writeFile(fp, JSON.stringify(timezoneCountryMapping))
