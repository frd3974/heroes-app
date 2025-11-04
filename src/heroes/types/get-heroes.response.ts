import type {Hero} from "@/heroes/types/hero.interface.ts";

export interface HeroesResponse {
   total?: number;
   pages?: number;
   heroes?: Hero[];
}

