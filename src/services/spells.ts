import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "./api";
import { toastFail } from "./toast";

export interface ISpell {
  index: string;
  name: string;
  url: string;
}
interface ISchool {
  index: string;
  name: string;
  url: string;
}

type IClass = ISpell;
type ISubClass = ISpell;
type IDamageType = ISpell;
export const Componentsenum: { [key: string]: any } = {
  V: "verbal",
  S: "somatic",
  M: "material"
};
export interface ISpellInfo {
  casting_time?: string;
  classes?: IClass[];
  components?: string[];
  concentration?: boolean;
  desc?: string[];
  duration?: string;
  damage?: {
    damage_at_character_level?: { [key: number]: string };
    damage_type?: IDamageType;
  };
  area_of_effect?: {
    size?: number;
    type?: string;
  };
  attack_type?: string;
  higher_level?: string[];
  index?: string;
  level?: 2;
  material?: string;
  name?: string;
  range?: string;
  ritual?: boolean;
  school?: ISchool;
  subclasses?: ISubClass[];
  url?: string;
  _id?: string;
}

export interface IFetchSpellsResponse {
  count: number;
  results: ISpell[];
}

/**
 * Axios Get Call to fetch repos based on search query
 *
 * @returns AxiosResponse<IFetchSpellsResponse>
 */
const fetchSpells = () => () => {
  return axios.get<IFetchSpellsResponse>(api.spells.fetch);
};

/**
 * Axios Get Call to get Spell by Index
 * @param {string} id
 * @returns AxiosResponse<ISpell>
 */
const getSpellByIndex = (id: string) => () => {
  return axios.get<ISpellInfo>(api.spells.fetchById.replace("{id}", id));
};

/**
 * Use Query to Fetch All Spells
 * @export useGetAllSpells
 * @returns UseQueryResult
 */
export const useGetAllSpells = () => {
  return useQuery(api.spells.fetch, fetchSpells(), {
    select: (response) => response.data,
    onError: (
      error: AxiosError<{
        message: string;
      }>
    ) => {
      toastFail(error?.response?.data?.message || "Something Went Wrong");
    }
  });
};

/**
 * Use Query to Fetch Spell By Index
 * @param {string} id
 * @export useGetSpellByIndex
 * @returns UseQueryResult
 */
export const useGetSpellByIndex = (id: string) => {
  return useQuery([api.spells.fetch, id], getSpellByIndex(id), {
    enabled: !!id,
    select: ({ data }) => data,
    onError: (
      error: AxiosError<{
        message: string;
      }>
    ) => {
      toastFail(error?.response?.data?.message || "Something Went Wrong");
    }
  });
};
