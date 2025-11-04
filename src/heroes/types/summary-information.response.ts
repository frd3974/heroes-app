import type {Hero} from "@/heroes/types/hero.interface.ts";

export default interface SummaryInformationResponse {
   totalHeroes: number;
   strongestHero: Hero;
   smartestHero: Hero;
   heroCount?: number;
   villainCount?: number;
}