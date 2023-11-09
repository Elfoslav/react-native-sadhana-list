interface SadhanaData {
  [key: string]: string | number | boolean | Date | null | undefined;
  date: Date;
  mangala: boolean;
  guruPuja: boolean;
  gauraArati: boolean;
  japaRounds: number | null;
  reading: number | null;
  note?: string;
}

export default SadhanaData;