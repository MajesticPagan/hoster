"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
	{
		label: "Praia",
		icon: TbBeach,
		description: "Esta propriedade é próxima de praia!",
	},
	{
		label: "Moinhos",
		icon: GiWindmill,
		description: "Esta propriedade tem moinhos!",
	},
	{
		label: "Moderno",
		icon: MdOutlineVilla,
		description: "Esta propriedade é moderna!",
	},
	{
		label: "Interior",
		icon: TbMountain,
		description: "Esta propriedade está no interior!",
	},
	{
		label: "Piscinas",
		icon: TbPool,
		description: "Esta propriedade tem piscina!",
	},
	{
		label: "Ilhas",
		icon: GiIsland,
		description: "Esta propriedade fica numa ilha!",
	},
	{
		label: "Lago",
		icon: GiBoatFishing,
		description: "Esta propriedade fica perto de um lago!",
	},
	{
		label: "Esquiar",
		icon: FaSkiing,
		description: "Esta propriedade tem atividades de esquiar!",
	},
	{
		label: "Castelos",
		icon: GiCastle,
		description: "Esta propriedade fica dentro de um castelo!",
	},
	{
		label: "Acampar",
		icon: GiForestCamp,
		description: "Esta propriedade tem acampamento!",
	},
	{
		label: "Ártico",
		icon: BsSnow,
		description: "Esta propriedade fica no ártico!",
	},
	{
		label: "Gruta",
		icon: GiCaveEntrance,
		description: "Esta propriedade fica numa gruta!",
	},
	{
		label: "Deserto",
		icon: GiCactus,
		description: "Esta propriedade fica num deserto!",
	},
	{
		label: "Celeiros",
		icon: GiBarn,
		description: "Esta propriedade fica num celeiro!",
	},
	{
		label: "Luxo",
		icon: IoDiamond,
		description: "Esta propriedade é de luxo!",
	},
];
