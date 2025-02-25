interface Country {
  code: string;
  name: string;
}

interface Continent {
  name: string;
  countries: Country[];
}

export const worldCountries: Continent[] = [
  {
    name: "Europa",
    countries: [
      { code: "DE", name: "Deutschland" },
      { code: "AT", name: "Österreich" },
      { code: "CH", name: "Schweiz" },
      { code: "FR", name: "Frankreich" },
      { code: "IT", name: "Italien" },
      { code: "ES", name: "Spanien" },
      { code: "PT", name: "Portugal" },
      { code: "GB", name: "Großbritannien" },
      { code: "IE", name: "Irland" },
      { code: "BE", name: "Belgien" },
      { code: "NL", name: "Niederlande" },
      { code: "LU", name: "Luxemburg" },
      { code: "DK", name: "Dänemark" },
      { code: "SE", name: "Schweden" },
      { code: "NO", name: "Norwegen" },
      { code: "FI", name: "Finnland" },
      { code: "EE", name: "Estland" },
      { code: "LV", name: "Lettland" },
      { code: "LT", name: "Litauen" },
      { code: "PL", name: "Polen" },
      { code: "CZ", name: "Tschechien" },
      { code: "SK", name: "Slowakei" },
      { code: "HU", name: "Ungarn" },
      { code: "RO", name: "Rumänien" },
      { code: "BG", name: "Bulgarien" },
      { code: "HR", name: "Kroatien" },
      { code: "SI", name: "Slowenien" },
      { code: "GR", name: "Griechenland" },
      { code: "TR", name: "Türkei" }
    ]
  },
  {
    name: "Asien",
    countries: [
      { code: "CN", name: "China" },
      { code: "JP", name: "Japan" },
      { code: "KR", name: "Südkorea" },
      { code: "TH", name: "Thailand" },
      { code: "VN", name: "Vietnam" },
      { code: "ID", name: "Indonesien" },
      { code: "MY", name: "Malaysia" },
      { code: "SG", name: "Singapur" },
      { code: "PH", name: "Philippinen" },
      { code: "IN", name: "Indien" }
    ]
  },
  {
    name: "Amerika",
    countries: [
      { code: "US", name: "USA" },
      { code: "CA", name: "Kanada" },
      { code: "MX", name: "Mexiko" },
      { code: "BR", name: "Brasilien" },
      { code: "AR", name: "Argentinien" },
      { code: "CL", name: "Chile" },
      { code: "CO", name: "Kolumbien" },
      { code: "PE", name: "Peru" }
    ]
  }
]; 