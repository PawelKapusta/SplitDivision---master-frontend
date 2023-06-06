export interface Currency {
    code: string;
    name: string;
}
export const fiatCurrencyNames: Currency[] = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AWG", name: "Aruban Florin" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudan Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswanan Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "BZD", name: "Belize Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "CVE", name: "Cape Verdean Escudo" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DJF", name: "Djiboutian Franc" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ERN", name: "Eritrean Nakfa" },
    { code: "ETB", name: "Ethiopian Birr" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "FKP", name: "Falkland Islands Pound" },
    { code: "FOK", name: "Faroese Króna" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GGP", name: "Guernsey Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "GIP", name: "Gibraltar Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GNF", name: "Guinean Franc" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "GYD", name: "Guyanaese Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HNL", name: "Honduran Lempira" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HTG", name: "Haitian Gourde" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "IMP", name: "Manx pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JEP", name: "Jersey Pound" },
    { code: "JMD", name: "Jamaican Dollar" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KGS", name: "Kyrgystani Som" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "KID", name: "Kiribati Dollar" },
    { code: "KMF", name: "Comorian Franc" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "KYD", name: "Cayman Islands Dollar" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LAK", name: "Laotian Kip" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "LRD", name: "Liberian Dollar" },
    { code: "LSL", name: "Lesotho Loti" },
    { code: "LYD", name: "Libyan Dinar" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "MDL", name: "Moldovan Leu" },
    { code: "MGA", name: "Malagasy Ariary" },
    { code: "MKD", name: "Macedonian Denar" },
    { code: "MMK", name: "Myanma Kyat" },
    { code: "MNT", name: "Mongolian Tugrik" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "MRU", name: "Mauritanian Ouguiya" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
    { code: "MWK", name: "Malawian Kwacha" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "MZN", name: "Mozambican Metical" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "NIO", name: "Nicaraguan Córdoba" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "PGK", name: "Papua New Guinean Kina" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Złoty" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "RWF", name: "Rwandan Franc" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SBD", name: "Solomon Islands Dollar" },
    { code: "SCR", name: "Seychellois Rupee" },
    { code: "SDG", name: "Sudanese Pound" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SHP", name: "Saint Helena Pound" },
    { code: "SLE", name: "Sierra Leonean Leone" },
    { code: "SLL", name: "Sierra Leonean Leone" },
    { code: "SOS", name: "Somali Shilling" },
    { code: "SRD", name: "Surinamese Dollar" },
    { code: "SSP", name: "South Sudanese Pound" },
    { code: "STN", name: "São Tomé and Príncipe Dobra" },
    { code: "SYP", name: "Syrian Pound" },
    { code: "SZL", name: "Swazi Lilangeni" },
    { code: "THB", name: "Thai Baht" },
    { code: "TJS", name: "Tajikistani Somoni" },
    { code: "TMT", name: "Turkmenistani Manat" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "TOP", name: "Tongan Pa'anga" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TTD", name: "Trinidad and Tobago Dollar" },
    { code: "TVD", name: "Tuvaluan Dollar" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "UZS", name: "Uzbekistan Som" },
    { code: "VES", name: "Venezuelan Bolívar Soberano" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "VUV", name: "Vanuatu Vatu" },
    { code: "WST", name: "Samoan Tala" },
    { code: "XAF", name: "Central African CFA Franc" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "XDR", name: "Special Drawing Rights" },
    { code: "XOF", name: "West African CFA franc" },
    { code: "XPF", name: "CFP Franc" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "ZAR", name: "South African Rand" },
    { code: "ZMW", name: "Zambian Kwacha" },
    { code: "ZWL", name: "Zimbabwean Dollar" },
];

export const cryptoCurrencyNames: Currency[] = [
    { code: "btc", name: "Bitcoin" },
    { code: "eth", name: "Ethereum" },
    { code: "usdt", name: "Tether" },
    { code: "bnb", name: "BNB" },
    { code: "usdc", name: "USD Coin" },
    { code: "xrp", name: "XRP" },
    { code: "steth", name: "Lido Staked Ether" },
    { code: "ada", name: "Cardano" },
    { code: "doge", name: "Dogecoin" },
    { code: "sol", name: "Solana" },
    { code: "matic", name: "Polygon" },
    { code: "trx", name: "TRON" },
    { code: "ltc", name: "Litecoin" },
    { code: "dot", name: "Polkadot" },
    { code: "busd", name: "Binance USD" },
    { code: "avax", name: "Avalanche" },
    { code: "shib", name: "Shiba Inu" },
    { code: "dai", name: "Dai" },
    { code: "wbtc", name: "Wrapped Bitcoin" },
    { code: "uni", name: "Uniswap" },
    { code: "leo", name: "LEO Token" },
    { code: "link", name: "Chainlink" },
    { code: "atom", name: "Cosmos Hub" },
    { code: "okb", name: "OKB" },
    { code: "xmr", name: "Monero" },
    { code: "etc", name: "Ethereum Classic" },
    { code: "ton", name: "Toncoin" },
    { code: "xlm", name: "Stellar" },
    { code: "bch", name: "Bitcoin Cash" },
    { code: "icp", name: "Internet Computer" },
    { code: "fil", name: "Filecoin" },
    { code: "tusd", name: "TrueUSD" },
    { code: "ldo", name: "Lido DAO" },
    { code: "apt", name: "Aptos" },
    { code: "qnt", name: "Quant" },
    { code: "cro", name: "Cronos" },
    { code: "hbar", name: "Hedera" },
    { code: "arb", name: "Arbitrum" },
    { code: "near", name: "NEAR Protocol" },
    { code: "vet", name: "VeChain" },
    { code: "ape", name: "ApeCoin" },
    { code: "grt", name: "The Graph" },
    { code: "algo", name: "Algorand" },
    { code: "sand", name: "The Sandbox" },
    { code: "eos", name: "EOS" },
    { code: "usdp", name: "Pax Dollar" },
    { code: "frax", name: "Frax" },
    { code: "rndr", name: "Render" },
    { code: "egld", name: "MultiversX" },
    { code: "op", name: "Optimism" },
    { code: "rpl", name: "Rocket Pool" },
    { code: "aave", name: "Aave" },
    { code: "mana", name: "Decentraland" },
    { code: "ftm", name: "Fantom" },
    { code: "xtz", name: "Tezos" },
    { code: "stx", name: "Stacks" },
    { code: "theta", name: "Theta Network" },
    { code: "reth", name: "Rocket Pool ETH" },
    { code: "axs", name: "Axie Infinity" },
    { code: "imx", name: "ImmutableX" },
    { code: "flow", name: "Flow" },
    { code: "snx", name: "Synthetix Network" },
    { code: "usdd", name: "USDD" },
    { code: "neo", name: "NEO" },
    { code: "bit", name: "BitDAO" },
    { code: "kcs", name: "KuCoin" },
    { code: "gala", name: "GALA" },
    { code: "wbt", name: "WhiteBIT Token" },
    { code: "crv", name: "Curve DAO" },
    { code: "xrd", name: "Radix" },
    { code: "bgb", name: "Bitget Token" },
    { code: "bsv", name: "Bitcoin SV" },
    { code: "lunc", name: "Terra Luna Classic" },
    { code: "inj", name: "Injective" },
    { code: "mkr", name: "Maker" },
    { code: "gt", name: "Gate" },
    { code: "klay", name: "Klaytn" },
    { code: "miota", name: "IOTA" },
    { code: "gusd", name: "Gemini Dollar" },
    { code: "btt", name: "BitTorrent" },
    { code: "cfx", name: "Conflux" },
    { code: "kava", name: "Kava" },
    { code: "chz", name: "Chiliz" },
    { code: "pepe", name: "Pepe" },
    { code: "cspr", name: "Casper Network" },
    { code: "tkx", name: "Tokenize Xchange" },
    { code: "paxg", name: "PAX Gold" },
    { code: "sui", name: "Sui" },
    { code: "mina", name: "Mina Protocol" },
    { code: "ceth", name: "cETH" },
    { code: "gmx", name: "GMX" },
    { code: "dash", name: "Dash" },
    { code: "xdc", name: "XDC Network" },
    { code: "xec", name: "eCash" },
    { code: "ht", name: "Huobi" },
    { code: "xaut", name: "Tether Gold" },
    { code: "fxs", name: "Frax Share" },
    { code: "twt", name: "Trust Wallet" },
    { code: "frxeth", name: "Frax Ether" },
    { code: "woo", name: "WOO Network" },
];

export type TCrypto = {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi: null;
    symbol: string;
    total_supply: number;
    total_volume: number;
};

export const FIAT = "FIAT";
export const CRYPTO = "CRYPTO";
