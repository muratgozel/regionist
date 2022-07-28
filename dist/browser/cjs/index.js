'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _classPrivateFieldGet = require('@babel/runtime-corejs3/helpers/classPrivateFieldGet');
var _classPrivateFieldSet = require('@babel/runtime-corejs3/helpers/classPrivateFieldSet');
var _reduceInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/reduce');
var _Object$keys = require('@babel/runtime-corejs3/core-js/object/keys');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/map');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/slice');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/filter');
var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/index-of');
var _WeakMap = require('@babel/runtime-corejs3/core-js/weak-map');
var jstz = require('locale-util/data/jstz/index.js');
var store = require('store/dist/store.modern.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _classPrivateFieldGet__default = /*#__PURE__*/_interopDefaultLegacy(_classPrivateFieldGet);
var _classPrivateFieldSet__default = /*#__PURE__*/_interopDefaultLegacy(_classPrivateFieldSet);
var _reduceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_reduceInstanceProperty);
var _Object$keys__default = /*#__PURE__*/_interopDefaultLegacy(_Object$keys);
var _mapInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_mapInstanceProperty);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _indexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_indexOfInstanceProperty);
var _WeakMap__default = /*#__PURE__*/_interopDefaultLegacy(_WeakMap);
var jstz__default = /*#__PURE__*/_interopDefaultLegacy(jstz);
var store__default = /*#__PURE__*/_interopDefaultLegacy(store);

var ZZ$1 = [
	"Etc/GMT+12",
	"Etc/GMT+11",
	"Etc/GMT+10",
	"Etc/GMT+9",
	"Etc/GMT+8",
	"PST8PDT",
	"Etc/GMT+7",
	"MST7MDT",
	"Etc/GMT+6",
	"CST6CDT",
	"Etc/GMT+5",
	"EST5EDT",
	"Etc/GMT+4",
	"Etc/GMT+3",
	"Etc/GMT+2",
	"Etc/GMT+1",
	"Etc/UTC",
	"Etc/GMT",
	"Etc/GMT-1",
	"Etc/GMT-2",
	"Etc/GMT-3",
	"Etc/GMT-4",
	"Etc/GMT-5",
	"Etc/GMT-6",
	"Etc/GMT-7",
	"Etc/GMT-8",
	"Etc/GMT-9",
	"Etc/GMT-10",
	"Etc/GMT-11",
	"Etc/GMT-12",
	"Etc/GMT-13",
	"Etc/GMT-14"
];
var AS$3 = [
	"Pacific/Pago_Pago"
];
var NU$3 = [
	"Pacific/Niue"
];
var UM$2 = [
	"Pacific/Midway",
	"Pacific/Johnston",
	"Pacific/Wake"
];
var US$3 = [
	"America/Adak",
	"Pacific/Honolulu",
	"America/Anchorage",
	"America/Juneau",
	"America/Metlakatla",
	"America/Nome",
	"America/Sitka",
	"America/Yakutat",
	"America/Los_Angeles",
	"America/Phoenix",
	"America/Denver",
	"America/Boise",
	"America/Chicago",
	"America/Indiana/Knox",
	"America/Indiana/Tell_City",
	"America/Menominee",
	"America/North_Dakota/Beulah",
	"America/North_Dakota/Center",
	"America/North_Dakota/New_Salem",
	"America/New_York",
	"America/Detroit",
	"America/Indiana/Petersburg",
	"America/Indiana/Vincennes",
	"America/Indiana/Winamac",
	"America/Kentucky/Monticello",
	"America/Louisville",
	"America/Indianapolis",
	"America/Indiana/Marengo",
	"America/Indiana/Vevay"
];
var CK$3 = [
	"Pacific/Rarotonga"
];
var PF$3 = [
	"Pacific/Tahiti",
	"Pacific/Marquesas",
	"Pacific/Gambier"
];
var MX$3 = [
	"America/Tijuana",
	"America/Santa_Isabel",
	"America/Hermosillo",
	"America/Chihuahua",
	"America/Mazatlan",
	"America/Ojinaga",
	"America/Matamoros",
	"America/Mexico_City",
	"America/Bahia_Banderas",
	"America/Merida",
	"America/Monterrey",
	"America/Cancun"
];
var PN$2 = [
	"Pacific/Pitcairn"
];
var CA$3 = [
	"America/Vancouver",
	"America/Creston",
	"America/Dawson_Creek",
	"America/Fort_Nelson",
	"America/Edmonton",
	"America/Cambridge_Bay",
	"America/Inuvik",
	"America/Yellowknife",
	"America/Whitehorse",
	"America/Dawson",
	"America/Winnipeg",
	"America/Rainy_River",
	"America/Rankin_Inlet",
	"America/Resolute",
	"America/Regina",
	"America/Swift_Current",
	"America/Coral_Harbour",
	"America/Toronto",
	"America/Iqaluit",
	"America/Montreal",
	"America/Nipigon",
	"America/Pangnirtung",
	"America/Thunder_Bay",
	"America/Halifax",
	"America/Glace_Bay",
	"America/Goose_Bay",
	"America/Moncton",
	"America/Blanc-Sablon",
	"America/St_Johns"
];
var BZ$3 = [
	"America/Belize"
];
var CR$3 = [
	"America/Costa_Rica"
];
var EC$3 = [
	"Pacific/Galapagos",
	"America/Guayaquil"
];
var GT$3 = [
	"America/Guatemala"
];
var HN$3 = [
	"America/Tegucigalpa"
];
var NI$3 = [
	"America/Managua"
];
var SV$3 = [
	"America/El_Salvador"
];
var CL$3 = [
	"Pacific/Easter",
	"America/Santiago",
	"America/Punta_Arenas"
];
var BR$3 = [
	"America/Rio_Branco",
	"America/Eirunepe",
	"America/Cuiaba",
	"America/Campo_Grande",
	"America/Manaus",
	"America/Boa_Vista",
	"America/Porto_Velho",
	"America/Araguaina",
	"America/Sao_Paulo",
	"America/Fortaleza",
	"America/Belem",
	"America/Maceio",
	"America/Recife",
	"America/Santarem",
	"America/Bahia",
	"America/Noronha"
];
var CO$3 = [
	"America/Bogota"
];
var JM$3 = [
	"America/Jamaica"
];
var KY$3 = [
	"America/Cayman"
];
var PA$3 = [
	"America/Panama"
];
var PE$3 = [
	"America/Lima"
];
var BS$3 = [
	"America/Nassau"
];
var HT$3 = [
	"America/Port-au-Prince"
];
var CU$3 = [
	"America/Havana"
];
var TC$3 = [
	"America/Grand_Turk"
];
var PY$3 = [
	"America/Asuncion"
];
var BM$3 = [
	"Atlantic/Bermuda"
];
var GL$3 = [
	"America/Thule",
	"America/Godthab",
	"America/Scoresbysund",
	"America/Danmarkshavn"
];
var VE$3 = [
	"America/Caracas"
];
var AG$3 = [
	"America/Antigua"
];
var AI$3 = [
	"America/Anguilla"
];
var AW$3 = [
	"America/Aruba"
];
var BB$3 = [
	"America/Barbados"
];
var BL$3 = [
	"America/St_Barthelemy"
];
var BO$3 = [
	"America/La_Paz"
];
var BQ$3 = [
	"America/Kralendijk"
];
var CW$3 = [
	"America/Curacao"
];
var DM$3 = [
	"America/Dominica"
];
var DO$3 = [
	"America/Santo_Domingo"
];
var GD$3 = [
	"America/Grenada"
];
var GP$3 = [
	"America/Guadeloupe"
];
var GY$3 = [
	"America/Guyana"
];
var KN$3 = [
	"America/St_Kitts"
];
var LC$3 = [
	"America/St_Lucia"
];
var MF$3 = [
	"America/Marigot"
];
var MQ$3 = [
	"America/Martinique"
];
var MS$3 = [
	"America/Montserrat"
];
var PR$3 = [
	"America/Puerto_Rico"
];
var SX$3 = [
	"America/Lower_Princes"
];
var TT$3 = [
	"America/Port_of_Spain"
];
var VC$3 = [
	"America/St_Vincent"
];
var VG$3 = [
	"America/Tortola"
];
var VI$3 = [
	"America/St_Thomas"
];
var AQ$1 = [
	"Antarctica/Rothera",
	"Antarctica/Palmer",
	"Antarctica/Syowa",
	"Antarctica/Mawson",
	"Antarctica/Vostok",
	"Antarctica/Davis",
	"Antarctica/DumontDUrville",
	"Antarctica/Casey",
	"Antarctica/McMurdo"
];
var FK$3 = [
	"Atlantic/Stanley"
];
var GF$3 = [
	"America/Cayenne"
];
var SR$3 = [
	"America/Paramaribo"
];
var AR$3 = [
	"America/Buenos_Aires",
	"America/Argentina/La_Rioja",
	"America/Argentina/Rio_Gallegos",
	"America/Argentina/Salta",
	"America/Argentina/San_Juan",
	"America/Argentina/San_Luis",
	"America/Argentina/Tucuman",
	"America/Argentina/Ushuaia",
	"America/Catamarca",
	"America/Cordoba",
	"America/Jujuy",
	"America/Mendoza"
];
var UY$3 = [
	"America/Montevideo"
];
var PM$3 = [
	"America/Miquelon"
];
var GS$1 = [
	"Atlantic/South_Georgia"
];
var PT$3 = [
	"Atlantic/Azores",
	"Europe/Lisbon",
	"Atlantic/Madeira"
];
var CV$3 = [
	"Atlantic/Cape_Verde"
];
var ES$3 = [
	"Atlantic/Canary",
	"Europe/Madrid",
	"Africa/Ceuta"
];
var FO$3 = [
	"Atlantic/Faeroe"
];
var GB$3 = [
	"Europe/London"
];
var GG$3 = [
	"Europe/Guernsey"
];
var IE$3 = [
	"Europe/Dublin"
];
var IM$3 = [
	"Europe/Isle_of_Man"
];
var JE$3 = [
	"Europe/Jersey"
];
var BF$3 = [
	"Africa/Ouagadougou"
];
var CI$3 = [
	"Africa/Abidjan"
];
var GH$3 = [
	"Africa/Accra"
];
var GM$3 = [
	"Africa/Banjul"
];
var GN$3 = [
	"Africa/Conakry"
];
var GW$3 = [
	"Africa/Bissau"
];
var IS$3 = [
	"Atlantic/Reykjavik"
];
var LR$3 = [
	"Africa/Monrovia"
];
var ML$3 = [
	"Africa/Bamako"
];
var MR$3 = [
	"Africa/Nouakchott"
];
var SH$3 = [
	"Atlantic/St_Helena"
];
var SL$3 = [
	"Africa/Freetown"
];
var SN$3 = [
	"Africa/Dakar"
];
var TG$3 = [
	"Africa/Lome"
];
var ST$3 = [
	"Africa/Sao_Tome"
];
var EH$3 = [
	"Africa/El_Aaiun"
];
var MA$3 = [
	"Africa/Casablanca"
];
var AD$3 = [
	"Europe/Andorra"
];
var AT$3 = [
	"Europe/Vienna"
];
var CH$3 = [
	"Europe/Zurich"
];
var DE$3 = [
	"Europe/Berlin",
	"Europe/Busingen"
];
var GI$3 = [
	"Europe/Gibraltar"
];
var IT$3 = [
	"Europe/Rome"
];
var LI$3 = [
	"Europe/Vaduz"
];
var LU$3 = [
	"Europe/Luxembourg"
];
var MC$3 = [
	"Europe/Monaco"
];
var MT$3 = [
	"Europe/Malta"
];
var NL$3 = [
	"Europe/Amsterdam"
];
var NO$3 = [
	"Europe/Oslo"
];
var SE$3 = [
	"Europe/Stockholm"
];
var SJ$2 = [
	"Arctic/Longyearbyen"
];
var SM$3 = [
	"Europe/San_Marino"
];
var VA$3 = [
	"Europe/Vatican"
];
var AL$3 = [
	"Europe/Tirane"
];
var CZ$3 = [
	"Europe/Prague"
];
var HU$3 = [
	"Europe/Budapest"
];
var ME$2 = [
	"Europe/Podgorica"
];
var RS$3 = [
	"Europe/Belgrade"
];
var SI$3 = [
	"Europe/Ljubljana"
];
var SK$3 = [
	"Europe/Bratislava"
];
var BE$3 = [
	"Europe/Brussels"
];
var DK$3 = [
	"Europe/Copenhagen"
];
var FR$3 = [
	"Europe/Paris"
];
var BA$3 = [
	"Europe/Sarajevo"
];
var HR$3 = [
	"Europe/Zagreb"
];
var MK$3 = [
	"Europe/Skopje"
];
var PL$3 = [
	"Europe/Warsaw"
];
var AO$3 = [
	"Africa/Luanda"
];
var BJ$3 = [
	"Africa/Porto-Novo"
];
var CD$3 = [
	"Africa/Kinshasa",
	"Africa/Lubumbashi"
];
var CF$3 = [
	"Africa/Bangui"
];
var CG$3 = [
	"Africa/Brazzaville"
];
var CM$3 = [
	"Africa/Douala"
];
var DZ$3 = [
	"Africa/Algiers"
];
var GA$3 = [
	"Africa/Libreville"
];
var GQ$3 = [
	"Africa/Malabo"
];
var NE$3 = [
	"Africa/Niamey"
];
var NG$3 = [
	"Africa/Lagos"
];
var TD$3 = [
	"Africa/Ndjamena"
];
var TN$3 = [
	"Africa/Tunis"
];
var JO$3 = [
	"Asia/Amman"
];
var CY$3 = [
	"Asia/Nicosia",
	"Asia/Famagusta"
];
var GR$3 = [
	"Europe/Athens"
];
var RO$3 = [
	"Europe/Bucharest"
];
var LB$3 = [
	"Asia/Beirut"
];
var EG$3 = [
	"Africa/Cairo"
];
var MD$3 = [
	"Europe/Chisinau"
];
var SY$3 = [
	"Asia/Damascus"
];
var PS$3 = [
	"Asia/Hebron",
	"Asia/Gaza"
];
var BI$3 = [
	"Africa/Bujumbura"
];
var BW$3 = [
	"Africa/Gaborone"
];
var LS$3 = [
	"Africa/Maseru"
];
var MW$3 = [
	"Africa/Blantyre"
];
var MZ$3 = [
	"Africa/Maputo"
];
var RW$3 = [
	"Africa/Kigali"
];
var SZ$3 = [
	"Africa/Mbabane"
];
var ZA$3 = [
	"Africa/Johannesburg"
];
var ZM$3 = [
	"Africa/Lusaka"
];
var ZW$3 = [
	"Africa/Harare"
];
var AX$3 = [
	"Europe/Mariehamn"
];
var BG$3 = [
	"Europe/Sofia"
];
var EE$3 = [
	"Europe/Tallinn"
];
var FI$3 = [
	"Europe/Helsinki"
];
var LT$3 = [
	"Europe/Vilnius"
];
var LV$3 = [
	"Europe/Riga"
];
var UA$3 = [
	"Europe/Kiev",
	"Europe/Uzhgorod",
	"Europe/Zaporozhye",
	"Europe/Simferopol"
];
var IL$3 = [
	"Asia/Jerusalem"
];
var SS$3 = [
	"Africa/Juba"
];
var RU$3 = [
	"Europe/Kaliningrad",
	"Europe/Moscow",
	"Europe/Kirov",
	"Europe/Astrakhan",
	"Europe/Ulyanovsk",
	"Europe/Samara",
	"Europe/Saratov",
	"Europe/Volgograd",
	"Asia/Yekaterinburg",
	"Asia/Omsk",
	"Asia/Barnaul",
	"Asia/Krasnoyarsk",
	"Asia/Novokuznetsk",
	"Asia/Novosibirsk",
	"Asia/Tomsk",
	"Asia/Irkutsk",
	"Asia/Chita",
	"Asia/Yakutsk",
	"Asia/Khandyga",
	"Asia/Vladivostok",
	"Asia/Ust-Nera",
	"Asia/Srednekolymsk",
	"Asia/Magadan",
	"Asia/Sakhalin",
	"Asia/Kamchatka",
	"Asia/Anadyr"
];
var SD$3 = [
	"Africa/Khartoum"
];
var LY$3 = [
	"Africa/Tripoli"
];
var NA$3 = [
	"Africa/Windhoek"
];
var IQ$3 = [
	"Asia/Baghdad"
];
var TR$3 = [
	"Europe/Istanbul"
];
var BH$3 = [
	"Asia/Bahrain"
];
var KW$3 = [
	"Asia/Kuwait"
];
var QA$3 = [
	"Asia/Qatar"
];
var SA$3 = [
	"Asia/Riyadh"
];
var YE$3 = [
	"Asia/Aden"
];
var BY$3 = [
	"Europe/Minsk"
];
var DJ$3 = [
	"Africa/Djibouti"
];
var ER$3 = [
	"Africa/Asmera"
];
var ET$3 = [
	"Africa/Addis_Ababa"
];
var KE$3 = [
	"Africa/Nairobi"
];
var KM$3 = [
	"Indian/Comoro"
];
var MG$3 = [
	"Indian/Antananarivo"
];
var SO$3 = [
	"Africa/Mogadishu"
];
var TZ$3 = [
	"Africa/Dar_es_Salaam"
];
var UG$3 = [
	"Africa/Kampala"
];
var YT$3 = [
	"Indian/Mayotte"
];
var IR$3 = [
	"Asia/Tehran"
];
var AE$3 = [
	"Asia/Dubai"
];
var OM$3 = [
	"Asia/Muscat"
];
var AZ$3 = [
	"Asia/Baku"
];
var MU$3 = [
	"Indian/Mauritius"
];
var RE$3 = [
	"Indian/Reunion"
];
var SC$3 = [
	"Indian/Mahe"
];
var GE$3 = [
	"Asia/Tbilisi"
];
var AM$3 = [
	"Asia/Yerevan"
];
var AF$3 = [
	"Asia/Kabul"
];
var KZ$3 = [
	"Asia/Oral",
	"Asia/Aqtau",
	"Asia/Aqtobe",
	"Asia/Atyrau",
	"Asia/Qyzylorda",
	"Asia/Almaty",
	"Asia/Qostanay"
];
var MV$3 = [
	"Indian/Maldives"
];
var TF$1 = [
	"Indian/Kerguelen"
];
var TJ$3 = [
	"Asia/Dushanbe"
];
var TM$3 = [
	"Asia/Ashgabat"
];
var UZ$3 = [
	"Asia/Tashkent",
	"Asia/Samarkand"
];
var PK$3 = [
	"Asia/Karachi"
];
var IN$3 = [
	"Asia/Calcutta"
];
var LK$3 = [
	"Asia/Colombo"
];
var NP$3 = [
	"Asia/Katmandu"
];
var CN$3 = [
	"Asia/Urumqi",
	"Asia/Shanghai"
];
var IO$3 = [
	"Indian/Chagos"
];
var KG$3 = [
	"Asia/Bishkek"
];
var BD$3 = [
	"Asia/Dhaka"
];
var BT$3 = [
	"Asia/Thimphu"
];
var CC$3 = [
	"Indian/Cocos"
];
var MM$3 = [
	"Asia/Rangoon"
];
var CX$3 = [
	"Indian/Christmas"
];
var ID$3 = [
	"Asia/Jakarta",
	"Asia/Pontianak",
	"Asia/Makassar",
	"Asia/Jayapura"
];
var KH$3 = [
	"Asia/Phnom_Penh"
];
var LA$3 = [
	"Asia/Vientiane"
];
var TH$3 = [
	"Asia/Bangkok"
];
var VN$3 = [
	"Asia/Saigon"
];
var MN$3 = [
	"Asia/Hovd",
	"Asia/Ulaanbaatar",
	"Asia/Choibalsan"
];
var HK$3 = [
	"Asia/Hong_Kong"
];
var MO$3 = [
	"Asia/Macau"
];
var BN$3 = [
	"Asia/Brunei"
];
var MY$3 = [
	"Asia/Kuala_Lumpur",
	"Asia/Kuching"
];
var PH$3 = [
	"Asia/Manila"
];
var SG$3 = [
	"Asia/Singapore"
];
var AU$3 = [
	"Australia/Perth",
	"Australia/Eucla",
	"Australia/Adelaide",
	"Australia/Broken_Hill",
	"Australia/Darwin",
	"Australia/Brisbane",
	"Australia/Lindeman",
	"Australia/Sydney",
	"Australia/Melbourne",
	"Australia/Hobart",
	"Australia/Currie",
	"Antarctica/Macquarie",
	"Australia/Lord_Howe"
];
var TW$3 = [
	"Asia/Taipei"
];
var JP$3 = [
	"Asia/Tokyo"
];
var PW$3 = [
	"Pacific/Palau"
];
var TL$3 = [
	"Asia/Dili"
];
var KP$3 = [
	"Asia/Pyongyang"
];
var KR$3 = [
	"Asia/Seoul"
];
var FM$3 = [
	"Pacific/Truk",
	"Pacific/Ponape",
	"Pacific/Kosrae"
];
var GU$3 = [
	"Pacific/Guam"
];
var MP$3 = [
	"Pacific/Saipan"
];
var PG$3 = [
	"Pacific/Port_Moresby",
	"Pacific/Bougainville"
];
var NF$3 = [
	"Pacific/Norfolk"
];
var NC$3 = [
	"Pacific/Noumea"
];
var SB$3 = [
	"Pacific/Guadalcanal"
];
var VU$3 = [
	"Pacific/Efate"
];
var NZ$3 = [
	"Pacific/Auckland",
	"Pacific/Chatham"
];
var KI$3 = [
	"Pacific/Tarawa",
	"Pacific/Enderbury",
	"Pacific/Kiritimati"
];
var MH$3 = [
	"Pacific/Majuro",
	"Pacific/Kwajalein"
];
var NR$3 = [
	"Pacific/Nauru"
];
var TV$3 = [
	"Pacific/Funafuti"
];
var WF$3 = [
	"Pacific/Wallis"
];
var FJ$3 = [
	"Pacific/Fiji"
];
var TK$3 = [
	"Pacific/Fakaofo"
];
var TO$3 = [
	"Pacific/Tongatapu"
];
var WS$3 = [
	"Pacific/Apia"
];
var timezones = {
	ZZ: ZZ$1,
	AS: AS$3,
	NU: NU$3,
	UM: UM$2,
	US: US$3,
	CK: CK$3,
	PF: PF$3,
	MX: MX$3,
	PN: PN$2,
	CA: CA$3,
	BZ: BZ$3,
	CR: CR$3,
	EC: EC$3,
	GT: GT$3,
	HN: HN$3,
	NI: NI$3,
	SV: SV$3,
	CL: CL$3,
	BR: BR$3,
	CO: CO$3,
	JM: JM$3,
	KY: KY$3,
	PA: PA$3,
	PE: PE$3,
	BS: BS$3,
	HT: HT$3,
	CU: CU$3,
	TC: TC$3,
	PY: PY$3,
	BM: BM$3,
	GL: GL$3,
	VE: VE$3,
	AG: AG$3,
	AI: AI$3,
	AW: AW$3,
	BB: BB$3,
	BL: BL$3,
	BO: BO$3,
	BQ: BQ$3,
	CW: CW$3,
	DM: DM$3,
	DO: DO$3,
	GD: GD$3,
	GP: GP$3,
	GY: GY$3,
	KN: KN$3,
	LC: LC$3,
	MF: MF$3,
	MQ: MQ$3,
	MS: MS$3,
	PR: PR$3,
	SX: SX$3,
	TT: TT$3,
	VC: VC$3,
	VG: VG$3,
	VI: VI$3,
	AQ: AQ$1,
	FK: FK$3,
	GF: GF$3,
	SR: SR$3,
	AR: AR$3,
	UY: UY$3,
	PM: PM$3,
	GS: GS$1,
	PT: PT$3,
	CV: CV$3,
	ES: ES$3,
	FO: FO$3,
	GB: GB$3,
	GG: GG$3,
	IE: IE$3,
	IM: IM$3,
	JE: JE$3,
	BF: BF$3,
	CI: CI$3,
	GH: GH$3,
	GM: GM$3,
	GN: GN$3,
	GW: GW$3,
	IS: IS$3,
	LR: LR$3,
	ML: ML$3,
	MR: MR$3,
	SH: SH$3,
	SL: SL$3,
	SN: SN$3,
	TG: TG$3,
	ST: ST$3,
	EH: EH$3,
	MA: MA$3,
	AD: AD$3,
	AT: AT$3,
	CH: CH$3,
	DE: DE$3,
	GI: GI$3,
	IT: IT$3,
	LI: LI$3,
	LU: LU$3,
	MC: MC$3,
	MT: MT$3,
	NL: NL$3,
	NO: NO$3,
	SE: SE$3,
	SJ: SJ$2,
	SM: SM$3,
	VA: VA$3,
	AL: AL$3,
	CZ: CZ$3,
	HU: HU$3,
	ME: ME$2,
	RS: RS$3,
	SI: SI$3,
	SK: SK$3,
	BE: BE$3,
	DK: DK$3,
	FR: FR$3,
	BA: BA$3,
	HR: HR$3,
	MK: MK$3,
	PL: PL$3,
	AO: AO$3,
	BJ: BJ$3,
	CD: CD$3,
	CF: CF$3,
	CG: CG$3,
	CM: CM$3,
	DZ: DZ$3,
	GA: GA$3,
	GQ: GQ$3,
	NE: NE$3,
	NG: NG$3,
	TD: TD$3,
	TN: TN$3,
	JO: JO$3,
	CY: CY$3,
	GR: GR$3,
	RO: RO$3,
	LB: LB$3,
	EG: EG$3,
	MD: MD$3,
	SY: SY$3,
	PS: PS$3,
	BI: BI$3,
	BW: BW$3,
	LS: LS$3,
	MW: MW$3,
	MZ: MZ$3,
	RW: RW$3,
	SZ: SZ$3,
	ZA: ZA$3,
	ZM: ZM$3,
	ZW: ZW$3,
	AX: AX$3,
	BG: BG$3,
	EE: EE$3,
	FI: FI$3,
	LT: LT$3,
	LV: LV$3,
	UA: UA$3,
	IL: IL$3,
	SS: SS$3,
	RU: RU$3,
	SD: SD$3,
	LY: LY$3,
	NA: NA$3,
	IQ: IQ$3,
	TR: TR$3,
	BH: BH$3,
	KW: KW$3,
	QA: QA$3,
	SA: SA$3,
	YE: YE$3,
	BY: BY$3,
	DJ: DJ$3,
	ER: ER$3,
	ET: ET$3,
	KE: KE$3,
	KM: KM$3,
	MG: MG$3,
	SO: SO$3,
	TZ: TZ$3,
	UG: UG$3,
	YT: YT$3,
	IR: IR$3,
	AE: AE$3,
	OM: OM$3,
	AZ: AZ$3,
	MU: MU$3,
	RE: RE$3,
	SC: SC$3,
	GE: GE$3,
	AM: AM$3,
	AF: AF$3,
	KZ: KZ$3,
	MV: MV$3,
	TF: TF$1,
	TJ: TJ$3,
	TM: TM$3,
	UZ: UZ$3,
	PK: PK$3,
	IN: IN$3,
	LK: LK$3,
	NP: NP$3,
	CN: CN$3,
	IO: IO$3,
	KG: KG$3,
	BD: BD$3,
	BT: BT$3,
	CC: CC$3,
	MM: MM$3,
	CX: CX$3,
	ID: ID$3,
	KH: KH$3,
	LA: LA$3,
	TH: TH$3,
	VN: VN$3,
	MN: MN$3,
	HK: HK$3,
	MO: MO$3,
	BN: BN$3,
	MY: MY$3,
	PH: PH$3,
	SG: SG$3,
	AU: AU$3,
	TW: TW$3,
	JP: JP$3,
	PW: PW$3,
	TL: TL$3,
	KP: KP$3,
	KR: KR$3,
	FM: FM$3,
	GU: GU$3,
	MP: MP$3,
	PG: PG$3,
	NF: NF$3,
	NC: NC$3,
	SB: SB$3,
	VU: VU$3,
	NZ: NZ$3,
	KI: KI$3,
	MH: MH$3,
	NR: NR$3,
	TV: TV$3,
	WF: WF$3,
	FJ: FJ$3,
	TK: TK$3,
	TO: TO$3,
	WS: WS$3
};

var AD$2 = [
	"ca"
];
var AE$2 = [
	"ar"
];
var AF$2 = [
	"fa",
	"ps",
	"tk"
];
var AG$2 = [
	"en"
];
var AI$2 = [
	"en"
];
var AL$2 = [
	"sq"
];
var AM$2 = [
	"hy"
];
var AO$2 = [
	"pt"
];
var AR$2 = [
	"es"
];
var AS$2 = [
	"sm",
	"en"
];
var AT$2 = [
	"de",
	"hr",
	"sl",
	"hu"
];
var AU$2 = [
	"en"
];
var AW$2 = [
	"nl",
	"pap"
];
var AX$2 = [
	"sv"
];
var AZ$2 = [
	"az"
];
var BA$2 = [
	"bs",
	"hr",
	"sr"
];
var BB$2 = [
	"en"
];
var BD$2 = [
	"bn"
];
var BE$2 = [
	"nl",
	"fr",
	"de"
];
var BF$2 = [
	"fr"
];
var BG$2 = [
	"bg"
];
var BH$2 = [
	"ar"
];
var BI$2 = [
	"rn",
	"fr",
	"en"
];
var BJ$2 = [
	"fr"
];
var BL$2 = [
	"fr"
];
var BM$2 = [
	"en"
];
var BN$2 = [
	"ms"
];
var BO$2 = [
	"es",
	"qu",
	"ay"
];
var BQ$2 = [
	"nl"
];
var BR$2 = [
	"pt"
];
var BS$2 = [
	"en"
];
var BT$2 = [
	"dz"
];
var BW$2 = [
	"en",
	"tn"
];
var BY$2 = [
	"be",
	"ru"
];
var BZ$2 = [
	"en"
];
var CA$2 = [
	"en",
	"fr",
	"iu"
];
var CC$2 = [
	"en"
];
var CD$2 = [
	"sw",
	"lua",
	"fr",
	"ln",
	"kg"
];
var CF$2 = [
	"fr",
	"sg"
];
var CG$2 = [
	"fr"
];
var CH$2 = [
	"de",
	"gsw",
	"fr",
	"it",
	"rm"
];
var CI$2 = [
	"fr"
];
var CK$2 = [
	"en"
];
var CL$2 = [
	"es"
];
var CM$2 = [
	"fr",
	"en"
];
var CN$2 = [
	"zh",
	"ug",
	"za",
	"bo",
	"ko"
];
var CO$2 = [
	"es"
];
var CR$2 = [
	"es"
];
var CU$2 = [
	"es"
];
var CV$2 = [
	"pt"
];
var CW$2 = [
	"pap",
	"nl"
];
var CX$2 = [
	"en"
];
var CY$2 = [
	"el",
	"tr"
];
var CZ$2 = [
	"cs"
];
var DE$2 = [
	"de"
];
var DG$1 = [
	"en"
];
var DJ$2 = [
	"ar",
	"fr"
];
var DK$2 = [
	"da",
	"de",
	"kl"
];
var DM$2 = [
	"en"
];
var DO$2 = [
	"es"
];
var DZ$2 = [
	"ar",
	"fr"
];
var EA$1 = [
	"es"
];
var EC$2 = [
	"es",
	"qu"
];
var EE$2 = [
	"et"
];
var EG$2 = [
	"ar"
];
var EH$2 = [
	"ar"
];
var ER$2 = [
	"ti",
	"en",
	"ar"
];
var ES$2 = [
	"es",
	"ca",
	"gl",
	"eu",
	"ast"
];
var ET$2 = [
	"am"
];
var FI$2 = [
	"fi",
	"sv"
];
var FJ$2 = [
	"en",
	"hif",
	"fj"
];
var FK$2 = [
	"en"
];
var FM$2 = [
	"en"
];
var FO$2 = [
	"fo"
];
var FR$2 = [
	"fr"
];
var GA$2 = [
	"fr"
];
var GB$2 = [
	"en",
	"cy",
	"gd",
	"ga"
];
var GD$2 = [
	"en"
];
var GE$2 = [
	"ka",
	"ab",
	"os"
];
var GF$2 = [
	"fr"
];
var GG$2 = [
	"en"
];
var GH$2 = [
	"ak",
	"en",
	"ee",
	"gaa"
];
var GI$2 = [
	"en"
];
var GL$2 = [
	"kl"
];
var GM$2 = [
	"en"
];
var GN$2 = [
	"fr"
];
var GP$2 = [
	"fr"
];
var GQ$2 = [
	"es",
	"fr",
	"pt"
];
var GR$2 = [
	"el"
];
var GT$2 = [
	"es",
	"quc"
];
var GU$2 = [
	"en",
	"ch"
];
var GW$2 = [
	"pt"
];
var GY$2 = [
	"en"
];
var HK$2 = [
	"zh_Hant",
	"en"
];
var HN$2 = [
	"es"
];
var HR$2 = [
	"hr",
	"it"
];
var HT$2 = [
	"ht",
	"fr"
];
var HU$2 = [
	"hu"
];
var IC$1 = [
	"es"
];
var ID$2 = [
	"id"
];
var IE$2 = [
	"en",
	"ga"
];
var IL$2 = [
	"he",
	"ar"
];
var IM$2 = [
	"en",
	"gv"
];
var IN$2 = [
	"hi",
	"en",
	"bn",
	"te",
	"mr",
	"ta",
	"ur",
	"gu",
	"kn",
	"ml",
	"or",
	"pa",
	"as",
	"mai",
	"ne",
	"sat",
	"ks",
	"kok",
	"sd",
	"kha",
	"sa"
];
var IO$2 = [
	"en"
];
var IQ$2 = [
	"ar",
	"ckb"
];
var IR$2 = [
	"fa"
];
var IS$2 = [
	"is"
];
var IT$2 = [
	"it",
	"fr"
];
var JE$2 = [
	"en"
];
var JM$2 = [
	"en"
];
var JO$2 = [
	"ar"
];
var JP$2 = [
	"ja"
];
var KE$2 = [
	"sw",
	"en"
];
var KG$2 = [
	"ky",
	"ru"
];
var KH$2 = [
	"km"
];
var KI$2 = [
	"en",
	"gil"
];
var KM$2 = [
	"ar",
	"fr"
];
var KN$2 = [
	"en"
];
var KP$2 = [
	"ko"
];
var KR$2 = [
	"ko"
];
var KW$2 = [
	"ar"
];
var KY$2 = [
	"en"
];
var KZ$2 = [
	"ru",
	"kk"
];
var LA$2 = [
	"lo"
];
var LB$2 = [
	"ar"
];
var LC$2 = [
	"en"
];
var LI$2 = [
	"de",
	"gsw"
];
var LK$2 = [
	"si",
	"ta"
];
var LR$2 = [
	"en"
];
var LS$2 = [
	"st",
	"en"
];
var LT$2 = [
	"lt"
];
var LU$2 = [
	"fr",
	"lb",
	"de"
];
var LV$2 = [
	"lv"
];
var LY$2 = [
	"ar"
];
var MA$2 = [
	"ar",
	"fr",
	"tzm"
];
var MC$2 = [
	"fr"
];
var MD$2 = [
	"ro"
];
var MF$2 = [
	"fr"
];
var MG$2 = [
	"mg",
	"fr",
	"en"
];
var MH$2 = [
	"en",
	"mh"
];
var MK$2 = [
	"mk",
	"sq"
];
var ML$2 = [
	"fr"
];
var MM$2 = [
	"my"
];
var MN$2 = [
	"mn"
];
var MO$2 = [
	"zh_Hant",
	"pt"
];
var MP$2 = [
	"en"
];
var MQ$2 = [
	"fr"
];
var MR$2 = [
	"ar"
];
var MS$2 = [
	"en"
];
var MT$2 = [
	"mt",
	"en"
];
var MU$2 = [
	"en",
	"fr"
];
var MV$2 = [
	"dv"
];
var MW$2 = [
	"en",
	"ny"
];
var MX$2 = [
	"es"
];
var MY$2 = [
	"ms"
];
var MZ$2 = [
	"pt"
];
var NA$2 = [
	"en"
];
var NC$2 = [
	"fr"
];
var NE$2 = [
	"fr"
];
var NF$2 = [
	"en"
];
var NG$2 = [
	"en",
	"yo"
];
var NI$2 = [
	"es"
];
var NL$2 = [
	"nl",
	"fy"
];
var NO$2 = [
	"nn",
	"se"
];
var NP$2 = [
	"ne"
];
var NR$2 = [
	"en",
	"na"
];
var NU$2 = [
	"en",
	"niu"
];
var NZ$2 = [
	"en",
	"mi"
];
var OM$2 = [
	"ar"
];
var PA$2 = [
	"es"
];
var PE$2 = [
	"es",
	"qu"
];
var PF$2 = [
	"fr",
	"ty"
];
var PG$2 = [
	"tpi",
	"en",
	"ho"
];
var PH$2 = [
	"en",
	"fil",
	"ceb",
	"ilo",
	"hil",
	"war",
	"pag"
];
var PK$2 = [
	"ur",
	"en"
];
var PL$2 = [
	"pl",
	"de",
	"csb",
	"lt"
];
var PM$2 = [
	"fr"
];
var PN$1 = [
	"en"
];
var PR$2 = [
	"es",
	"en"
];
var PS$2 = [
	"ar"
];
var PT$2 = [
	"pt"
];
var PW$2 = [
	"pau",
	"en"
];
var PY$2 = [
	"gn",
	"es"
];
var QA$2 = [
	"ar"
];
var RE$2 = [
	"fr"
];
var RO$2 = [
	"ro"
];
var RS$2 = [
	"sr",
	"hu",
	"ro",
	"hr",
	"sk",
	"uk"
];
var RU$2 = [
	"ru",
	"tt",
	"ba",
	"ce",
	"av",
	"udm",
	"sah",
	"kbd",
	"myv",
	"mdf",
	"kum",
	"kv",
	"lez",
	"krc",
	"inh",
	"tyv",
	"ady",
	"koi"
];
var RW$2 = [
	"rw",
	"en",
	"fr"
];
var SA$2 = [
	"ar"
];
var SB$2 = [
	"en"
];
var SC$2 = [
	"fr",
	"en"
];
var SD$2 = [
	"ar",
	"en"
];
var SE$2 = [
	"sv",
	"fi"
];
var SG$2 = [
	"en",
	"zh",
	"ms",
	"ta"
];
var SH$2 = [
	"en"
];
var SI$2 = [
	"sl"
];
var SK$2 = [
	"sk"
];
var SL$2 = [
	"en"
];
var SM$2 = [
	"it"
];
var SN$2 = [
	"wo",
	"fr",
	"ff",
	"srr",
	"dyo"
];
var SO$2 = [
	"so",
	"ar"
];
var SR$2 = [
	"nl"
];
var SS$2 = [
	"en"
];
var ST$2 = [
	"pt"
];
var SV$2 = [
	"es"
];
var SX$2 = [
	"en",
	"nl"
];
var SY$2 = [
	"ar",
	"fr"
];
var SZ$2 = [
	"en",
	"ss"
];
var TC$2 = [
	"en"
];
var TD$2 = [
	"fr",
	"ar"
];
var TG$2 = [
	"fr"
];
var TH$2 = [
	"th"
];
var TJ$2 = [
	"tg"
];
var TK$2 = [
	"en",
	"tkl"
];
var TL$2 = [
	"pt",
	"tet"
];
var TM$2 = [
	"tk"
];
var TN$2 = [
	"ar",
	"fr"
];
var TO$2 = [
	"to",
	"en"
];
var TR$2 = [
	"tr"
];
var TT$2 = [
	"en"
];
var TV$2 = [
	"tvl",
	"en"
];
var TW$2 = [
	"zh_Hant"
];
var TZ$2 = [
	"sw",
	"en"
];
var UA$2 = [
	"uk",
	"ru"
];
var UG$2 = [
	"sw",
	"en"
];
var UM$1 = [
	"en"
];
var US$2 = [
	"en",
	"es",
	"haw"
];
var UY$2 = [
	"es"
];
var UZ$2 = [
	"uz"
];
var VA$2 = [
	"it"
];
var VC$2 = [
	"en"
];
var VE$2 = [
	"es"
];
var VG$2 = [
	"en"
];
var VI$2 = [
	"en"
];
var VN$2 = [
	"vi"
];
var VU$2 = [
	"bi",
	"en",
	"fr"
];
var WF$2 = [
	"fr"
];
var WS$2 = [
	"sm",
	"en"
];
var XK$2 = [
	"sq",
	"sr"
];
var YE$2 = [
	"ar"
];
var YT$2 = [
	"fr"
];
var ZA$2 = [
	"en",
	"zu",
	"xh",
	"af",
	"nso",
	"tn",
	"st",
	"ts",
	"ss",
	"ve",
	"nr"
];
var ZM$2 = [
	"en"
];
var ZW$2 = [
	"sn",
	"en",
	"nd"
];
var countryLanguages = {
	AD: AD$2,
	AE: AE$2,
	AF: AF$2,
	AG: AG$2,
	AI: AI$2,
	AL: AL$2,
	AM: AM$2,
	AO: AO$2,
	AR: AR$2,
	AS: AS$2,
	AT: AT$2,
	AU: AU$2,
	AW: AW$2,
	AX: AX$2,
	AZ: AZ$2,
	BA: BA$2,
	BB: BB$2,
	BD: BD$2,
	BE: BE$2,
	BF: BF$2,
	BG: BG$2,
	BH: BH$2,
	BI: BI$2,
	BJ: BJ$2,
	BL: BL$2,
	BM: BM$2,
	BN: BN$2,
	BO: BO$2,
	BQ: BQ$2,
	BR: BR$2,
	BS: BS$2,
	BT: BT$2,
	BW: BW$2,
	BY: BY$2,
	BZ: BZ$2,
	CA: CA$2,
	CC: CC$2,
	CD: CD$2,
	CF: CF$2,
	CG: CG$2,
	CH: CH$2,
	CI: CI$2,
	CK: CK$2,
	CL: CL$2,
	CM: CM$2,
	CN: CN$2,
	CO: CO$2,
	CR: CR$2,
	CU: CU$2,
	CV: CV$2,
	CW: CW$2,
	CX: CX$2,
	CY: CY$2,
	CZ: CZ$2,
	DE: DE$2,
	DG: DG$1,
	DJ: DJ$2,
	DK: DK$2,
	DM: DM$2,
	DO: DO$2,
	DZ: DZ$2,
	EA: EA$1,
	EC: EC$2,
	EE: EE$2,
	EG: EG$2,
	EH: EH$2,
	ER: ER$2,
	ES: ES$2,
	ET: ET$2,
	FI: FI$2,
	FJ: FJ$2,
	FK: FK$2,
	FM: FM$2,
	FO: FO$2,
	FR: FR$2,
	GA: GA$2,
	GB: GB$2,
	GD: GD$2,
	GE: GE$2,
	GF: GF$2,
	GG: GG$2,
	GH: GH$2,
	GI: GI$2,
	GL: GL$2,
	GM: GM$2,
	GN: GN$2,
	GP: GP$2,
	GQ: GQ$2,
	GR: GR$2,
	GT: GT$2,
	GU: GU$2,
	GW: GW$2,
	GY: GY$2,
	HK: HK$2,
	HN: HN$2,
	HR: HR$2,
	HT: HT$2,
	HU: HU$2,
	IC: IC$1,
	ID: ID$2,
	IE: IE$2,
	IL: IL$2,
	IM: IM$2,
	IN: IN$2,
	IO: IO$2,
	IQ: IQ$2,
	IR: IR$2,
	IS: IS$2,
	IT: IT$2,
	JE: JE$2,
	JM: JM$2,
	JO: JO$2,
	JP: JP$2,
	KE: KE$2,
	KG: KG$2,
	KH: KH$2,
	KI: KI$2,
	KM: KM$2,
	KN: KN$2,
	KP: KP$2,
	KR: KR$2,
	KW: KW$2,
	KY: KY$2,
	KZ: KZ$2,
	LA: LA$2,
	LB: LB$2,
	LC: LC$2,
	LI: LI$2,
	LK: LK$2,
	LR: LR$2,
	LS: LS$2,
	LT: LT$2,
	LU: LU$2,
	LV: LV$2,
	LY: LY$2,
	MA: MA$2,
	MC: MC$2,
	MD: MD$2,
	MF: MF$2,
	MG: MG$2,
	MH: MH$2,
	MK: MK$2,
	ML: ML$2,
	MM: MM$2,
	MN: MN$2,
	MO: MO$2,
	MP: MP$2,
	MQ: MQ$2,
	MR: MR$2,
	MS: MS$2,
	MT: MT$2,
	MU: MU$2,
	MV: MV$2,
	MW: MW$2,
	MX: MX$2,
	MY: MY$2,
	MZ: MZ$2,
	NA: NA$2,
	NC: NC$2,
	NE: NE$2,
	NF: NF$2,
	NG: NG$2,
	NI: NI$2,
	NL: NL$2,
	NO: NO$2,
	NP: NP$2,
	NR: NR$2,
	NU: NU$2,
	NZ: NZ$2,
	OM: OM$2,
	PA: PA$2,
	PE: PE$2,
	PF: PF$2,
	PG: PG$2,
	PH: PH$2,
	PK: PK$2,
	PL: PL$2,
	PM: PM$2,
	PN: PN$1,
	PR: PR$2,
	PS: PS$2,
	PT: PT$2,
	PW: PW$2,
	PY: PY$2,
	QA: QA$2,
	RE: RE$2,
	RO: RO$2,
	RS: RS$2,
	RU: RU$2,
	RW: RW$2,
	SA: SA$2,
	SB: SB$2,
	SC: SC$2,
	SD: SD$2,
	SE: SE$2,
	SG: SG$2,
	SH: SH$2,
	SI: SI$2,
	SK: SK$2,
	SL: SL$2,
	SM: SM$2,
	SN: SN$2,
	SO: SO$2,
	SR: SR$2,
	SS: SS$2,
	ST: ST$2,
	SV: SV$2,
	SX: SX$2,
	SY: SY$2,
	SZ: SZ$2,
	TC: TC$2,
	TD: TD$2,
	TG: TG$2,
	TH: TH$2,
	TJ: TJ$2,
	TK: TK$2,
	TL: TL$2,
	TM: TM$2,
	TN: TN$2,
	TO: TO$2,
	TR: TR$2,
	TT: TT$2,
	TV: TV$2,
	TW: TW$2,
	TZ: TZ$2,
	UA: UA$2,
	UG: UG$2,
	UM: UM$1,
	US: US$2,
	UY: UY$2,
	UZ: UZ$2,
	VA: VA$2,
	VC: VC$2,
	VE: VE$2,
	VG: VG$2,
	VI: VI$2,
	VN: VN$2,
	VU: VU$2,
	WF: WF$2,
	WS: WS$2,
	XK: XK$2,
	YE: YE$2,
	YT: YT$2,
	ZA: ZA$2,
	ZM: ZM$2,
	ZW: ZW$2
};

var AD$1 = "376";
var AE$1 = "971";
var AF$1 = "93";
var AG$1 = "1";
var AI$1 = "1";
var AL$1 = "355";
var AM$1 = "374";
var AO$1 = "244";
var AR$1 = "54";
var AS$1 = "1";
var AT$1 = "43";
var AU$1 = "61";
var AW$1 = "297";
var AX$1 = "358";
var AZ$1 = "994";
var BA$1 = "387";
var BB$1 = "1";
var BD$1 = "880";
var BE$1 = "32";
var BF$1 = "226";
var BG$1 = "359";
var BH$1 = "973";
var BI$1 = "257";
var BJ$1 = "229";
var BL$1 = "590";
var BM$1 = "1";
var BN$1 = "673";
var BO$1 = "591";
var BQ$1 = "599";
var BR$1 = "55";
var BS$1 = "1";
var BT$1 = "975";
var BW$1 = "267";
var BY$1 = "375";
var BZ$1 = "501";
var CA$1 = "1";
var CC$1 = "61";
var CD$1 = "243";
var CF$1 = "236";
var CG$1 = "242";
var CH$1 = "41";
var CI$1 = "225";
var CK$1 = "682";
var CL$1 = "56";
var CM$1 = "237";
var CN$1 = "86";
var CO$1 = "57";
var CR$1 = "506";
var CU$1 = "53";
var CV$1 = "238";
var CW$1 = "599";
var CX$1 = "61";
var CY$1 = "357";
var CZ$1 = "420";
var DE$1 = "49";
var DJ$1 = "253";
var DK$1 = "45";
var DM$1 = "1";
var DO$1 = "1";
var DZ$1 = "213";
var EC$1 = "593";
var EE$1 = "372";
var EG$1 = "20";
var EH$1 = "212";
var ER$1 = "291";
var ES$1 = "34";
var ET$1 = "251";
var FI$1 = "358";
var FJ$1 = "679";
var FK$1 = "500";
var FM$1 = "691";
var FO$1 = "298";
var FR$1 = "33";
var GA$1 = "241";
var GB$1 = "44";
var GD$1 = "1";
var GE$1 = "995";
var GF$1 = "594";
var GG$1 = "44";
var GH$1 = "233";
var GI$1 = "350";
var GL$1 = "299";
var GM$1 = "220";
var GN$1 = "224";
var GP$1 = "590";
var GQ$1 = "240";
var GR$1 = "30";
var GT$1 = "502";
var GU$1 = "1";
var GW$1 = "245";
var GY$1 = "592";
var HK$1 = "852";
var HN$1 = "504";
var HR$1 = "385";
var HT$1 = "509";
var HU$1 = "36";
var ID$1 = "62";
var IE$1 = "353";
var IL$1 = "972";
var IM$1 = "44";
var IN$1 = "91";
var IO$1 = "246";
var IQ$1 = "964";
var IR$1 = "98";
var IS$1 = "354";
var IT$1 = "39";
var JE$1 = "44";
var JM$1 = "1";
var JO$1 = "962";
var JP$1 = "81";
var KE$1 = "254";
var KG$1 = "996";
var KH$1 = "855";
var KI$1 = "686";
var KM$1 = "269";
var KN$1 = "1";
var KP$1 = "850";
var KR$1 = "82";
var KW$1 = "965";
var KY$1 = "1";
var KZ$1 = "7";
var LA$1 = "856";
var LB$1 = "961";
var LC$1 = "1";
var LI$1 = "423";
var LK$1 = "94";
var LR$1 = "231";
var LS$1 = "266";
var LT$1 = "370";
var LU$1 = "352";
var LV$1 = "371";
var LY$1 = "218";
var MA$1 = "212";
var MC$1 = "377";
var MD$1 = "373";
var ME$1 = "382";
var MF$1 = "590";
var MG$1 = "261";
var MH$1 = "692";
var MK$1 = "389";
var ML$1 = "223";
var MM$1 = "95";
var MN$1 = "976";
var MO$1 = "853";
var MP$1 = "1";
var MQ$1 = "596";
var MR$1 = "222";
var MS$1 = "1";
var MT$1 = "356";
var MU$1 = "230";
var MV$1 = "960";
var MW$1 = "265";
var MX$1 = "52";
var MY$1 = "60";
var MZ$1 = "258";
var NA$1 = "264";
var NC$1 = "687";
var NE$1 = "227";
var NF$1 = "672";
var NG$1 = "234";
var NI$1 = "505";
var NL$1 = "31";
var NO$1 = "47";
var NP$1 = "977";
var NR$1 = "674";
var NU$1 = "683";
var NZ$1 = "64";
var OM$1 = "968";
var PA$1 = "507";
var PE$1 = "51";
var PF$1 = "689";
var PG$1 = "675";
var PH$1 = "63";
var PK$1 = "92";
var PL$1 = "48";
var PM$1 = "508";
var PR$1 = "1";
var PS$1 = "970";
var PT$1 = "351";
var PW$1 = "680";
var PY$1 = "595";
var QA$1 = "974";
var RE$1 = "262";
var RO$1 = "40";
var RS$1 = "381";
var RU$1 = "7";
var RW$1 = "250";
var SA$1 = "966";
var SB$1 = "677";
var SC$1 = "248";
var SD$1 = "249";
var SE$1 = "46";
var SG$1 = "65";
var SH$1 = "290";
var SI$1 = "386";
var SJ$1 = "47";
var SK$1 = "421";
var SL$1 = "232";
var SM$1 = "378";
var SN$1 = "221";
var SO$1 = "252";
var SR$1 = "597";
var SS$1 = "211";
var ST$1 = "239";
var SV$1 = "503";
var SX$1 = "1";
var SY$1 = "963";
var SZ$1 = "268";
var TC$1 = "1";
var TD$1 = "235";
var TG$1 = "228";
var TH$1 = "66";
var TJ$1 = "992";
var TK$1 = "690";
var TL$1 = "670";
var TM$1 = "993";
var TN$1 = "216";
var TO$1 = "676";
var TR$1 = "90";
var TT$1 = "1";
var TV$1 = "688";
var TW$1 = "886";
var TZ$1 = "255";
var UA$1 = "380";
var UG$1 = "256";
var US$1 = "1";
var UY$1 = "598";
var UZ$1 = "998";
var VA$1 = "39";
var VC$1 = "1";
var VE$1 = "58";
var VG$1 = "1";
var VI$1 = "1";
var VN$1 = "84";
var VU$1 = "678";
var WF$1 = "681";
var WS$1 = "685";
var XK$1 = "383";
var YE$1 = "967";
var YT$1 = "262";
var ZA$1 = "27";
var ZM$1 = "260";
var ZW$1 = "263";
var callingCodes = {
	AD: AD$1,
	AE: AE$1,
	AF: AF$1,
	AG: AG$1,
	AI: AI$1,
	AL: AL$1,
	AM: AM$1,
	AO: AO$1,
	AR: AR$1,
	AS: AS$1,
	AT: AT$1,
	AU: AU$1,
	AW: AW$1,
	AX: AX$1,
	AZ: AZ$1,
	BA: BA$1,
	BB: BB$1,
	BD: BD$1,
	BE: BE$1,
	BF: BF$1,
	BG: BG$1,
	BH: BH$1,
	BI: BI$1,
	BJ: BJ$1,
	BL: BL$1,
	BM: BM$1,
	BN: BN$1,
	BO: BO$1,
	BQ: BQ$1,
	BR: BR$1,
	BS: BS$1,
	BT: BT$1,
	BW: BW$1,
	BY: BY$1,
	BZ: BZ$1,
	CA: CA$1,
	CC: CC$1,
	CD: CD$1,
	CF: CF$1,
	CG: CG$1,
	CH: CH$1,
	CI: CI$1,
	CK: CK$1,
	CL: CL$1,
	CM: CM$1,
	CN: CN$1,
	CO: CO$1,
	CR: CR$1,
	CU: CU$1,
	CV: CV$1,
	CW: CW$1,
	CX: CX$1,
	CY: CY$1,
	CZ: CZ$1,
	DE: DE$1,
	DJ: DJ$1,
	DK: DK$1,
	DM: DM$1,
	DO: DO$1,
	DZ: DZ$1,
	EC: EC$1,
	EE: EE$1,
	EG: EG$1,
	EH: EH$1,
	ER: ER$1,
	ES: ES$1,
	ET: ET$1,
	FI: FI$1,
	FJ: FJ$1,
	FK: FK$1,
	FM: FM$1,
	FO: FO$1,
	FR: FR$1,
	GA: GA$1,
	GB: GB$1,
	GD: GD$1,
	GE: GE$1,
	GF: GF$1,
	GG: GG$1,
	GH: GH$1,
	GI: GI$1,
	GL: GL$1,
	GM: GM$1,
	GN: GN$1,
	GP: GP$1,
	GQ: GQ$1,
	GR: GR$1,
	GT: GT$1,
	GU: GU$1,
	GW: GW$1,
	GY: GY$1,
	HK: HK$1,
	HN: HN$1,
	HR: HR$1,
	HT: HT$1,
	HU: HU$1,
	ID: ID$1,
	IE: IE$1,
	IL: IL$1,
	IM: IM$1,
	IN: IN$1,
	IO: IO$1,
	IQ: IQ$1,
	IR: IR$1,
	IS: IS$1,
	IT: IT$1,
	JE: JE$1,
	JM: JM$1,
	JO: JO$1,
	JP: JP$1,
	KE: KE$1,
	KG: KG$1,
	KH: KH$1,
	KI: KI$1,
	KM: KM$1,
	KN: KN$1,
	KP: KP$1,
	KR: KR$1,
	KW: KW$1,
	KY: KY$1,
	KZ: KZ$1,
	LA: LA$1,
	LB: LB$1,
	LC: LC$1,
	LI: LI$1,
	LK: LK$1,
	LR: LR$1,
	LS: LS$1,
	LT: LT$1,
	LU: LU$1,
	LV: LV$1,
	LY: LY$1,
	MA: MA$1,
	MC: MC$1,
	MD: MD$1,
	ME: ME$1,
	MF: MF$1,
	MG: MG$1,
	MH: MH$1,
	MK: MK$1,
	ML: ML$1,
	MM: MM$1,
	MN: MN$1,
	MO: MO$1,
	MP: MP$1,
	MQ: MQ$1,
	MR: MR$1,
	MS: MS$1,
	MT: MT$1,
	MU: MU$1,
	MV: MV$1,
	MW: MW$1,
	MX: MX$1,
	MY: MY$1,
	MZ: MZ$1,
	NA: NA$1,
	NC: NC$1,
	NE: NE$1,
	NF: NF$1,
	NG: NG$1,
	NI: NI$1,
	NL: NL$1,
	NO: NO$1,
	NP: NP$1,
	NR: NR$1,
	NU: NU$1,
	NZ: NZ$1,
	OM: OM$1,
	PA: PA$1,
	PE: PE$1,
	PF: PF$1,
	PG: PG$1,
	PH: PH$1,
	PK: PK$1,
	PL: PL$1,
	PM: PM$1,
	PR: PR$1,
	PS: PS$1,
	PT: PT$1,
	PW: PW$1,
	PY: PY$1,
	QA: QA$1,
	RE: RE$1,
	RO: RO$1,
	RS: RS$1,
	RU: RU$1,
	RW: RW$1,
	SA: SA$1,
	SB: SB$1,
	SC: SC$1,
	SD: SD$1,
	SE: SE$1,
	SG: SG$1,
	SH: SH$1,
	SI: SI$1,
	SJ: SJ$1,
	SK: SK$1,
	SL: SL$1,
	SM: SM$1,
	SN: SN$1,
	SO: SO$1,
	SR: SR$1,
	SS: SS$1,
	ST: ST$1,
	SV: SV$1,
	SX: SX$1,
	SY: SY$1,
	SZ: SZ$1,
	TC: TC$1,
	TD: TD$1,
	TG: TG$1,
	TH: TH$1,
	TJ: TJ$1,
	TK: TK$1,
	TL: TL$1,
	TM: TM$1,
	TN: TN$1,
	TO: TO$1,
	TR: TR$1,
	TT: TT$1,
	TV: TV$1,
	TW: TW$1,
	TZ: TZ$1,
	UA: UA$1,
	UG: UG$1,
	US: US$1,
	UY: UY$1,
	UZ: UZ$1,
	VA: VA$1,
	VC: VC$1,
	VE: VE$1,
	VG: VG$1,
	VI: VI$1,
	VN: VN$1,
	VU: VU$1,
	WF: WF$1,
	WS: WS$1,
	XK: XK$1,
	YE: YE$1,
	YT: YT$1,
	ZA: ZA$1,
	ZM: ZM$1,
	ZW: ZW$1
};

var SH = "SHP";
var AD = "EUR";
var AT = "EUR";
var AX = "EUR";
var BE = "EUR";
var BL = "EUR";
var CY = "EUR";
var DE = "EUR";
var EA = "EUR";
var EE = "EUR";
var ES = "EUR";
var EU = "EUR";
var FI = "EUR";
var FR = "EUR";
var GF = "EUR";
var GP = "EUR";
var GR = "EUR";
var IC = "EUR";
var IE = "EUR";
var IT = "EUR";
var LT = "EUR";
var LU = "EUR";
var LV = "EUR";
var MC = "EUR";
var ME = "EUR";
var MF = "EUR";
var MQ = "EUR";
var MT = "EUR";
var NL = "EUR";
var PM = "EUR";
var PT = "EUR";
var RE = "EUR";
var SI = "EUR";
var SK = "EUR";
var SM = "EUR";
var TF = "EUR";
var VA = "EUR";
var XK = "EUR";
var YT = "EUR";
var AE = "AED";
var AF = "AFN";
var AG = "XCD";
var AI = "XCD";
var DM = "XCD";
var GD = "XCD";
var KN = "XCD";
var LC = "XCD";
var MS = "XCD";
var VC = "XCD";
var AL = "ALL";
var AM = "AMD";
var AO = "AOA";
var AQ = "XXX";
var CP = "XXX";
var AR = "ARS";
var AS = "USD";
var BQ = "USD";
var DG = "USD";
var EC = "USD";
var FM = "USD";
var GU = "USD";
var IO = "USD";
var MH = "USD";
var MP = "USD";
var PR = "USD";
var PW = "USD";
var SV = "USD";
var TC = "USD";
var TL = "USD";
var UM = "USD";
var US = "USD";
var VG = "USD";
var VI = "USD";
var ZW = "USD";
var AU = "AUD";
var CC = "AUD";
var CX = "AUD";
var HM = "AUD";
var KI = "AUD";
var NF = "AUD";
var NR = "AUD";
var TV = "AUD";
var AW = "AWG";
var AZ = "AZN";
var BA = "BAM";
var BB = "BBD";
var BD = "BDT";
var BF = "XOF";
var BJ = "XOF";
var CI = "XOF";
var GW = "XOF";
var ML = "XOF";
var NE = "XOF";
var SN = "XOF";
var TG = "XOF";
var BG = "BGN";
var BH = "BHD";
var BI = "BIF";
var BM = "BMD";
var BN = "BND";
var BO = "BOB";
var BR = "BRL";
var BS = "BSD";
var BT = "BTN";
var BU = "BUK";
var BV = "NOK";
var NO = "NOK";
var SJ = "NOK";
var BW = "BWP";
var BY = "BYN";
var BZ = "BZD";
var CA = "CAD";
var CD = "CDF";
var CF = "XAF";
var CG = "XAF";
var CM = "XAF";
var GA = "XAF";
var GQ = "XAF";
var TD = "XAF";
var CH = "CHF";
var LI = "CHF";
var CK = "NZD";
var NU = "NZD";
var NZ = "NZD";
var PN = "NZD";
var TK = "NZD";
var CL = "CLP";
var CN = "CNY";
var CO = "COP";
var CR = "CRC";
var CS = "CSD";
var CU = "CUP";
var CV = "CVE";
var CW = "ANG";
var SX = "ANG";
var CZ = "CZK";
var DD = "DDM";
var DJ = "DJF";
var DK = "DKK";
var FO = "DKK";
var GL = "DKK";
var DO = "DOP";
var DZ = "DZD";
var EG = "EGP";
var EH = "MAD";
var MA = "MAD";
var ER = "ERN";
var ET = "ETB";
var FJ = "FJD";
var FK = "FKP";
var GB = "GBP";
var GG = "GBP";
var GS = "GBP";
var IM = "GBP";
var JE = "GBP";
var GE = "GEL";
var GH = "GHS";
var GI = "GIP";
var GM = "GMD";
var GN = "GNF";
var GT = "GTQ";
var GY = "GYD";
var HK = "HKD";
var HN = "HNL";
var HR = "HRK";
var HT = "HTG";
var HU = "HUF";
var ID = "IDR";
var IL = "ILS";
var PS = "ILS";
var IN = "INR";
var IQ = "IQD";
var IR = "IRR";
var IS = "ISK";
var JM = "JMD";
var JO = "JOD";
var JP = "JPY";
var KE = "KES";
var KG = "KGS";
var KH = "KHR";
var KM = "KMF";
var KP = "KPW";
var KR = "KRW";
var KW = "KWD";
var KY = "KYD";
var KZ = "KZT";
var LA = "LAK";
var LB = "LBP";
var LK = "LKR";
var LR = "LRD";
var LS = "ZAR";
var ZA = "ZAR";
var LY = "LYD";
var MD = "MDL";
var MG = "MGA";
var MK = "MKD";
var MM = "MMK";
var MN = "MNT";
var MO = "MOP";
var MR = "MRU";
var MU = "MUR";
var MV = "MVR";
var MW = "MWK";
var MX = "MXN";
var MY = "MYR";
var MZ = "MZN";
var NA = "NAD";
var NC = "XPF";
var PF = "XPF";
var WF = "XPF";
var NG = "NGN";
var NI = "NIO";
var NP = "NPR";
var OM = "OMR";
var PA = "PAB";
var PE = "PEN";
var PG = "PGK";
var PH = "PHP";
var PK = "PKR";
var PL = "PLN";
var PY = "PYG";
var QA = "QAR";
var RO = "RON";
var RS = "RSD";
var RU = "RUB";
var RW = "RWF";
var SA = "SAR";
var SB = "SBD";
var SC = "SCR";
var SD = "SDG";
var SE = "SEK";
var SG = "SGD";
var SL = "SLL";
var SO = "SOS";
var SR = "SRD";
var SS = "SSP";
var ST = "STN";
var SU = "SUR";
var SY = "SYP";
var SZ = "SZL";
var TH = "THB";
var TJ = "TJS";
var TM = "TMT";
var TN = "TND";
var TO = "TOP";
var TP = "TPE";
var TR = "TRY";
var TT = "TTD";
var TW = "TWD";
var TZ = "TZS";
var UA = "UAH";
var UG = "UGX";
var UY = "UYU";
var UZ = "UZS";
var VE = "VES";
var VN = "VND";
var VU = "VUV";
var WS = "WST";
var YE = "YER";
var YD = "YDD";
var YU = "YUM";
var ZM = "ZMW";
var ZR = "ZRN";
var ZZ = "XAG";
var currencyCodes = {
	SH: SH,
	AD: AD,
	AT: AT,
	AX: AX,
	BE: BE,
	BL: BL,
	CY: CY,
	DE: DE,
	EA: EA,
	EE: EE,
	ES: ES,
	EU: EU,
	FI: FI,
	FR: FR,
	GF: GF,
	GP: GP,
	GR: GR,
	IC: IC,
	IE: IE,
	IT: IT,
	LT: LT,
	LU: LU,
	LV: LV,
	MC: MC,
	ME: ME,
	MF: MF,
	MQ: MQ,
	MT: MT,
	NL: NL,
	PM: PM,
	PT: PT,
	RE: RE,
	SI: SI,
	SK: SK,
	SM: SM,
	TF: TF,
	VA: VA,
	XK: XK,
	YT: YT,
	AE: AE,
	AF: AF,
	AG: AG,
	AI: AI,
	DM: DM,
	GD: GD,
	KN: KN,
	LC: LC,
	MS: MS,
	VC: VC,
	AL: AL,
	AM: AM,
	AO: AO,
	AQ: AQ,
	CP: CP,
	AR: AR,
	AS: AS,
	BQ: BQ,
	DG: DG,
	EC: EC,
	FM: FM,
	GU: GU,
	IO: IO,
	MH: MH,
	MP: MP,
	PR: PR,
	PW: PW,
	SV: SV,
	TC: TC,
	TL: TL,
	UM: UM,
	US: US,
	VG: VG,
	VI: VI,
	ZW: ZW,
	AU: AU,
	CC: CC,
	CX: CX,
	HM: HM,
	KI: KI,
	NF: NF,
	NR: NR,
	TV: TV,
	AW: AW,
	AZ: AZ,
	BA: BA,
	BB: BB,
	BD: BD,
	BF: BF,
	BJ: BJ,
	CI: CI,
	GW: GW,
	ML: ML,
	NE: NE,
	SN: SN,
	TG: TG,
	BG: BG,
	BH: BH,
	BI: BI,
	BM: BM,
	BN: BN,
	BO: BO,
	BR: BR,
	BS: BS,
	BT: BT,
	BU: BU,
	BV: BV,
	NO: NO,
	SJ: SJ,
	BW: BW,
	BY: BY,
	BZ: BZ,
	CA: CA,
	CD: CD,
	CF: CF,
	CG: CG,
	CM: CM,
	GA: GA,
	GQ: GQ,
	TD: TD,
	CH: CH,
	LI: LI,
	CK: CK,
	NU: NU,
	NZ: NZ,
	PN: PN,
	TK: TK,
	CL: CL,
	CN: CN,
	CO: CO,
	CR: CR,
	CS: CS,
	CU: CU,
	CV: CV,
	CW: CW,
	SX: SX,
	CZ: CZ,
	DD: DD,
	DJ: DJ,
	DK: DK,
	FO: FO,
	GL: GL,
	DO: DO,
	DZ: DZ,
	EG: EG,
	EH: EH,
	MA: MA,
	ER: ER,
	ET: ET,
	FJ: FJ,
	FK: FK,
	GB: GB,
	GG: GG,
	GS: GS,
	IM: IM,
	JE: JE,
	GE: GE,
	GH: GH,
	GI: GI,
	GM: GM,
	GN: GN,
	GT: GT,
	GY: GY,
	HK: HK,
	HN: HN,
	HR: HR,
	HT: HT,
	HU: HU,
	ID: ID,
	IL: IL,
	PS: PS,
	IN: IN,
	IQ: IQ,
	IR: IR,
	IS: IS,
	JM: JM,
	JO: JO,
	JP: JP,
	KE: KE,
	KG: KG,
	KH: KH,
	KM: KM,
	KP: KP,
	KR: KR,
	KW: KW,
	KY: KY,
	KZ: KZ,
	LA: LA,
	LB: LB,
	LK: LK,
	LR: LR,
	LS: LS,
	ZA: ZA,
	LY: LY,
	MD: MD,
	MG: MG,
	MK: MK,
	MM: MM,
	MN: MN,
	MO: MO,
	MR: MR,
	MU: MU,
	MV: MV,
	MW: MW,
	MX: MX,
	MY: MY,
	MZ: MZ,
	NA: NA,
	NC: NC,
	PF: PF,
	WF: WF,
	NG: NG,
	NI: NI,
	NP: NP,
	OM: OM,
	PA: PA,
	PE: PE,
	PG: PG,
	PH: PH,
	PK: PK,
	PL: PL,
	PY: PY,
	QA: QA,
	RO: RO,
	RS: RS,
	RU: RU,
	RW: RW,
	SA: SA,
	SB: SB,
	SC: SC,
	SD: SD,
	SE: SE,
	SG: SG,
	SL: SL,
	SO: SO,
	SR: SR,
	SS: SS,
	ST: ST,
	SU: SU,
	SY: SY,
	SZ: SZ,
	TH: TH,
	TJ: TJ,
	TM: TM,
	TN: TN,
	TO: TO,
	TP: TP,
	TR: TR,
	TT: TT,
	TW: TW,
	TZ: TZ,
	UA: UA,
	UG: UG,
	UY: UY,
	UZ: UZ,
	VE: VE,
	VN: VN,
	VU: VU,
	WS: WS,
	YE: YE,
	YD: YD,
	YU: YU,
	ZM: ZM,
	ZR: ZR,
	ZZ: ZZ
};

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _browserLocaleLikes = /*#__PURE__*/new _WeakMap__default["default"]();

var _localStorageIdentifier = /*#__PURE__*/new _WeakMap__default["default"]();

var _reLocale = /*#__PURE__*/new _WeakMap__default["default"]();

var _prev = /*#__PURE__*/new _WeakMap__default["default"]();

var Regionist = /*#__PURE__*/function () {
  function Regionist() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck__default["default"](this, Regionist);

    _classPrivateFieldInitSpec(this, _browserLocaleLikes, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _localStorageIdentifier, {
      writable: true,
      value: '_regionist'
    });

    _classPrivateFieldInitSpec(this, _reLocale, {
      writable: true,
      value: /[a-z]{2,3}((-|_)[a-zA-Z]{2})?/
    });

    _classPrivateFieldInitSpec(this, _prev, {
      writable: true,
      value: null
    });

    this.timezone = params.timezone || null;
    this.country = params.country || null;
    this.nativeLanguage = params.nativeLanguage || null;
    this.preferredLanguage = params.preferredLanguage || null;
    this.locale = params.locale || null;
    this.callingCode = params.callingCode || null;
    this.currencyCode = params.currencyCode || null;
  }

  _createClass__default["default"](Regionist, [{
    key: "guess",
    value: function guess() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        remember: false
      };

      _classPrivateFieldSet__default["default"](this, _browserLocaleLikes, this.generateLocaleLikesFromNavigator());

      this.timezone = this.guessTimezone();
      this.country = this.guessCountry();
      this.nativeLanguage = this.findNativeLanguage();
      this.preferredLanguage = this.findPreferredLanguage();
      this.locale = this.constructLocale();
      this.callingCode = this.findCallingCode();
      this.currencyCode = this.findCurrencyCode();

      if (opts.remember) {
        var _context;

        _classPrivateFieldSet__default["default"](this, _prev, new Regionist(store__default["default"].get(_classPrivateFieldGet__default["default"](this, _localStorageIdentifier))));

        store__default["default"].set(_classPrivateFieldGet__default["default"](this, _localStorageIdentifier), _reduceInstanceProperty__default["default"](_context = _Object$keys__default["default"](this)).call(_context, function (m, k) {
          return m[k] = _this[k];
        }, {}));
      }

      return this;
    }
  }, {
    key: "isCountryChanged",
    value: function isCountryChanged() {
      return _classPrivateFieldGet__default["default"](this, _prev).country != this.country && typeof this.country == 'string';
    }
  }, {
    key: "isTimezoneChanged",
    value: function isTimezoneChanged() {
      return _classPrivateFieldGet__default["default"](this, _prev).timezone != this.timezone && typeof this.timezone == 'string';
    }
  }, {
    key: "findCurrencyCode",
    value: function findCurrencyCode() {
      if (!this.country) return null;
      if (!currencyCodes.hasOwnProperty(this.country)) return null;
      return currencyCodes[this.country];
    }
  }, {
    key: "findCallingCode",
    value: function findCallingCode() {
      if (!this.country) return null;
      if (!callingCodes.hasOwnProperty(this.country)) return null;
      return callingCodes[this.country];
    }
  }, {
    key: "constructLocale",
    value: function constructLocale() {
      return this.nativeLanguage + '_' + this.country;
    }
  }, {
    key: "findPreferredLanguage",
    value: function findPreferredLanguage() {
      var _context2;

      var languagesWithinhNavigator = _mapInstanceProperty__default["default"](_context2 = _classPrivateFieldGet__default["default"](this, _browserLocaleLikes)).call(_context2, function (l) {
        return _sliceInstanceProperty__default["default"](l).call(l, 0, 2);
      });

      if (languagesWithinhNavigator.length === 0) return null;
      return languagesWithinhNavigator[0];
    }
  }, {
    key: "findNativeLanguage",
    value: function findNativeLanguage() {
      var _context3;

      var languagesWithinhNavigator = _mapInstanceProperty__default["default"](_context3 = _classPrivateFieldGet__default["default"](this, _browserLocaleLikes)).call(_context3, function (l) {
        return _sliceInstanceProperty__default["default"](l).call(l, 0, 2);
      });

      if (languagesWithinhNavigator.length === 0) return null;
      if (!this.country) languagesWithinhNavigator[0];
      var languagesWithinCountry = countryLanguages[this.country]; // the most suitable candidate for the native language is
      // the language from navigator found in languagesWithinCountry

      var possibleNativeLanguages = _filterInstanceProperty__default["default"](languagesWithinhNavigator).call(languagesWithinhNavigator, function (l) {
        return _indexOfInstanceProperty__default["default"](languagesWithinCountry).call(languagesWithinCountry, l) !== -1;
      });

      if (possibleNativeLanguages && possibleNativeLanguages.length > 0) {
        return possibleNativeLanguages[0];
      } // just return primary official language


      return languagesWithinCountry[0];
    }
  }, {
    key: "guessCountry",
    value: function guessCountry() {
      var _context6, _context7;

      // guess based on timezone first
      var countriesWithinSameTimezone = [];

      if (this.timezone) {
        var _context4;

        var tz = this.timezone.toLowerCase();
        countriesWithinSameTimezone = _filterInstanceProperty__default["default"](_context4 = _Object$keys__default["default"](timezones)).call(_context4, function (country) {
          var _context5;

          var m = _filterInstanceProperty__default["default"](_context5 = timezones[country]).call(_context5, function (_tz) {
            return _tz.toLowerCase() == tz;
          });

          return m && m.length > 0;
        }); // if there is only one just return it, we trust timezone

        if (countriesWithinSameTimezone.length === 1) {
          return countriesWithinSameTimezone[0];
        }
      } // guess based on navigator


      var countriesWithinNavigator = _mapInstanceProperty__default["default"](_context6 = _filterInstanceProperty__default["default"](_context7 = _classPrivateFieldGet__default["default"](this, _browserLocaleLikes)).call(_context7, function (l) {
        return _indexOfInstanceProperty__default["default"](l).call(l, '_') !== -1;
      })).call(_context6, function (l) {
        return l.split('_')[1];
      });

      if (countriesWithinSameTimezone.length === 0 && countriesWithinNavigator.length > 0) {
        return countriesWithinNavigator[0];
      }

      if (countriesWithinSameTimezone.length > 0 && countriesWithinNavigator.length === 0) {
        // just throw first country
        return countriesWithinSameTimezone[0];
      }

      if (countriesWithinSameTimezone.length === 0 && countriesWithinNavigator.length === 0) {
        // impossible to guess
        return null;
      }

      var countryMatches = _filterInstanceProperty__default["default"](countriesWithinSameTimezone).call(countriesWithinSameTimezone, function (country) {
        return _indexOfInstanceProperty__default["default"](countriesWithinNavigator).call(countriesWithinNavigator, country) !== -1;
      });

      if (countryMatches && countryMatches.length > 0) {
        return countryMatches[0];
      }

      return countriesWithinSameTimezone[0];
    }
  }, {
    key: "guessTimezone",
    value: function guessTimezone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (error) {
        // Intl not supported, try jstz
        return jstz__default["default"].determine().name();
      }
    }
  }, {
    key: "generateLocaleLikesFromNavigator",
    value: function generateLocaleLikesFromNavigator() {
      var result = [];
      if (!('navigator' in window)) return result;
      var n = window.navigator;
      if ('languages' in n && n.languages && n.languages.length > 0) result = n.languages;else if (n.language) result = [n.language];else if (n.userLanguage) result = [n.userLanguage];else return result;
      return this.formatLocaleLike(result);
    }
  }, {
    key: "formatLocaleLike",
    value: function formatLocaleLike(value) {
      var _context8,
          _this2 = this;

      value = Array.isArray(value) ? value : [value];
      return _mapInstanceProperty__default["default"](_context8 = _filterInstanceProperty__default["default"](value).call(value, function (v) {
        return typeof v == 'string' && _classPrivateFieldGet__default["default"](_this2, _reLocale).test(v);
      })).call(_context8, function (v) {
        var arr = v.split(/(_|-)/);

        if (arr.length === 1) {
          return arr[0].toLowerCase();
        }

        if (arr.length === 3) {
          return arr[0].toLowerCase() + '_' + arr[2].toUpperCase();
        }

        return arr[0].toLowerCase();
      });
    } // picks the best language/locale from a given list

  }, {
    key: "pick",
    value: function pick() {
      var _this3 = this;

      var localeLikes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      localeLikes = this.formatLocaleLike(localeLikes); // match by order: locale + country + language
      // locale match

      var matches1 = _filterInstanceProperty__default["default"](localeLikes).call(localeLikes, function (l) {
        return _this3.locale == l;
      });

      if (matches1 && matches1.length > 0) return matches1[0]; // country match

      var matches2 = _filterInstanceProperty__default["default"](localeLikes).call(localeLikes, function (l) {
        var arr = l.split('_');
        var country = arr.length === 2 ? arr[1] : null;
        if (country && country == _this3.country) return true;
        return false;
      });

      if (matches2 && matches2.length > 0) return matches2[0]; // language

      var matches3 = _filterInstanceProperty__default["default"](localeLikes).call(localeLikes, function (l) {
        var arr = l.split('_');
        var lang = arr[0];
        var langMatch = lang == _this3.nativeLanguage || lang == _this3.preferredLanguage;
        if (langMatch) return true;
        return false;
      });

      if (matches3 && matches3.length > 0) return matches3[0];
      return localeLikes[0];
    }
  }, {
    key: "pickFromUrl",
    value: function pickFromUrl() {
      var fallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      try {
        var _context9;

        var firstPath = _filterInstanceProperty__default["default"](_context9 = window.location.pathname.split('/')).call(_context9, function (v) {
          return v;
        })[0];

        if (firstPath && _classPrivateFieldGet__default["default"](this, _reLocale).test(firstPath)) {
          return this.formatLocaleLike(firstPath)[0];
        }
      } catch (e) {}

      return this.formatLocaleLike(fallback)[0];
    }
  }]);

  return Regionist;
}();

var regionist = new Regionist();

exports.callingCodes = callingCodes;
exports.countryLanguages = countryLanguages;
exports.currencyCodes = currencyCodes;
exports.regionist = regionist;
exports.timezones = timezones;
//# sourceMappingURL=index.js.map
